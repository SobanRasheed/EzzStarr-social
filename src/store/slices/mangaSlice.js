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
      `${import.meta.env.VITE_API_URL}/api/manga/top10`
    );
    const json = await res.json();
    const mangaArray = json.data || [];

    const formattedManga = mangaArray.map((item) => {
      // Handle platform manga
      if (item.isPlatform) {
        return {
          id: item.id,
          imageUrl: item.coverUrl,
          description: item.attributes?.description?.en || item.description || "No description available.",
          title: item.attributes?.title?.en || item.title,
          author: item.relationships?.find(rel => rel.type === "author")?.attributes?.name || "Platform Creator",
          genre: (item.attributes?.tags || [])
            .filter(tag => tag.attributes?.group === "genre")
            .map(tag => tag.attributes?.name?.en)
            .join(", ") || "",
          isPlatform: true,
        };
      }
      // Handle MangaDex manga
      const author = item.relationships?.find(
        (rel) => rel.type === "author"
      )?.attributes?.name;
      const genres = item.attributes?.tags
        ?.filter((tag) => tag.attributes.group === "genre")
        .map((tag) => tag.attributes.name.en)
        .join(", ");
      const title =
        item.attributes?.title?.en ||
        (item.attributes?.title && Object.values(item.attributes.title)[0]) ||
        "Untitled";
      return {
        id: item.id,
        imageUrl: item.coverUrl,
        description: item.attributes?.description?.en || "No description available.",
        title,
        author: author || "Unknown",
        genre: genres || "N/A",
        isPlatform: false,
      };
    });
    return formattedManga;
  }
);

/* =========================
   📖 FETCH CHAPTERS (supports both sources)
========================= */
export const fetchChapters = createAsyncThunk(
  "manga/fetchChapters",
  async ({ mangaId, isPlatform }, thunkAPI) => {
    const state = thunkAPI.getState();
    const cacheKey = `${mangaId}-${isPlatform}`;
    if (state.manga.chapters[cacheKey]) {
      return { cacheKey, data: state.manga.chapters[cacheKey] };
    }

    let url;
    if (isPlatform) {
      url = `${import.meta.env.VITE_API_URL}/api/manga/${mangaId}/episodes`;
    } else {
      url = `${import.meta.env.VITE_API_URL}/api/manga/external/${mangaId}/chapters?limit=500`;
    }

    const res = await fetch(url);
    const json = await res.json();
    const chaptersArray = json.data || [];
    return { cacheKey, data: chaptersArray };
  }
);

/* =========================
   🧠 SLICE
========================= */
const mangaSlice = createSlice({
  name: "manga",
  initialState: {
    mangas: [],
    chapters: {},    // key: `${mangaId}-${isPlatform}`
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
      // 📖 chapters
      .addCase(fetchChapters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.isLoading = false;
        const { cacheKey, data } = action.payload;
        state.chapters[cacheKey] = data;
      })
      .addCase(fetchChapters.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to fetch chapters";
      });
  },
});

export default mangaSlice.reducer;