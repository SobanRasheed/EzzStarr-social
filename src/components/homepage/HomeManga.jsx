import MangaCard from "../reuseable comps/MangaCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManga } from "../../store/slices/mangaSlice";
import { mockMangas } from "../../config/mockHomeData";

const HomeManga = ({title}) => {
  const dispatch = useDispatch();

  const { mangas, isLoading, error } = useSelector(
    (state) => state.manga
  );
  useEffect(() => {
    dispatch(fetchManga());
  }, [dispatch]);

  // Dev fallback: show mock cards when the API is unavailable.
  const displayMangas = error && mangas.length === 0 ? mockMangas : mangas;
  const showError = error && displayMangas.length === 0;

  return (
    <section
      className="flex flex-col items-center pt-10"
      style={{ padding: "40px 96px 0", isolation: "isolate" }}
    >
      <h1 className="text-white text-center text-5xl mb-8">{title}</h1>

      <div
        className="w-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(420px, 544px))",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          Array(9)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-700 rounded-sm"
                style={{ height: "340px", maxWidth: "544px", width: "100%" }}
              />
            ))
        ) : showError ? (
          <div className="col-span-full text-center py-4">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchManga())}
              className="px-4 py-2 bg-[#51FFF4] text-black rounded hover:bg-[#AD7AFF] transition-colors"
            >
              Retry Loading
            </button>
          </div>
        ) : (
          displayMangas.map((manga) => (
            <MangaCard
              key={manga.id}
              {...manga}
              stars={4}
              comments={120}
              views={"23k"}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default HomeManga;