import { useQuery } from "@tanstack/react-query";
import { MovieProps, TVProps } from "../../../@types";
import { getRecommendations } from "../../../api/allFetches";
import MovieCard from "../global/MovieCard";
import TVCard from "../global/TVCard";

const Recommendations = ({ type, id }: { type: string; id: number }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [`recommendations-${type}-${id}`],
    queryFn: () => getRecommendations(type, id),
  });
  return (
    <div>
      <h2 className='pt-4 font-semibold text-xl text-rose'>
        Recommendations based on this {type === "movie" ? "Movie" : "TV Show"}
      </h2>

      <div className='mt-3 flex gap-3 overflow-x-auto'>
        {!isLoading &&
          !isError &&
          data?.results.map((movieOrTV: MovieProps | TVProps) => {
            if (type === "movie") {
              return <MovieCard movie={movieOrTV as MovieProps} />;
            } else {
              return <TVCard tv={movieOrTV as TVProps} />;
            }
          })}
      </div>
    </div>
  );
};

export default Recommendations;
