import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* =========================
   📚 FETCH MANGA LIST
========================= */

export const fetchManga = createAsyncThunk(
  "manga/fetchManga",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    if (state.manga.isLoaded) {
      return state.manga.mangas;
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/manga?limit=12`
    );

    const data = await res.json();

    const formattedManga = data.data.map((item) => {
      const author = item.relationships.find(
        (rel) => rel.type === "author"
      )?.attributes?.name;

      const genres = item.attributes.tags
        .filter((tag) => tag.attributes.group === "genre")
        .map((tag) => tag.attributes.name.en)
        .join(", ");

      const title =
        item.attributes.title.en ||
        Object.values(item.attributes.title)[0];

      return {
        id: item.id,
        imageUrl: item.coverUrl,
        description:
          item.attributes.description.en ||
          "No description available.",
        title,
        author: author || "Unknown",
        genre: genres || "N/A",
      };
    });

    return formattedManga;
  }
);

/* =========================
   📖 FETCH CHAPTERS
========================= */

export const fetchAggregate = createAsyncThunk(
  "manga/fetchAggregate",
  async (mangaId, thunkAPI) => {
    const state = thunkAPI.getState();

    if (state.manga.aggregate[mangaId]) {
      return { mangaId, data: state.manga.aggregate[mangaId] };
    }

    const res = await fetch(
      `https://api.mangadex.org/manga/${mangaId}/aggregate`
    );

    const data = await res.json();

    return { mangaId, data };
  }
);

/* =========================
   🧠 SLICE
========================= */

const mangaSlice = createSlice({
  name: "manga",
  initialState: {
    mangas: [],
    aggregate: {}, // 🔥 chapters per manga
    isLoading: false,
    error: null,
    isLoaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📚 manga list
      .addCase(fetchManga.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchManga.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mangas = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchManga.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch manga";
      })

      // 📖 aggregate
      .addCase(fetchAggregate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAggregate.fulfilled, (state, action) => {
        state.isLoading = false;

        const { mangaId, data } = action.payload;
        state.aggregate[mangaId] = data;
      })
      .addCase(fetchAggregate.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch chapters";
      });
  },
});

export default mangaSlice.reducer;