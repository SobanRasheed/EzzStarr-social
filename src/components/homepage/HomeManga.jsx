import MangaCard from "../reuseable comps/MangaCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManga } from "../../store/slices/mangaSlice";

const HomeManga = ({title}) => {
  const dispatch = useDispatch();

  const { mangas, isLoading, error } = useSelector(
    (state) => state.manga
  );
  useEffect(() => {
    dispatch(fetchManga());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2 mt-8 px-4 md:px-20 lg:px-3 pt-10 dark-bg-2 mx-16">
      <h1 className="text-white text-center text-5xl mb-8">{title}</h1>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 w-full">
        {isLoading ? (
          Array(9)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-700 rounded-lg h-[300px]"
              />
            ))
        ) : error ? (
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
          mangas.map((manga) => (
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
    </div>
  );
};

export default HomeManga;