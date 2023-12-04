import { useQuery } from "@tanstack/react-query";
import { MovieProps, TVProps } from "../../../@types";
import { getSimilarRecommendations } from "../../../api/allFetches";
import MovieTvCard from "../global/MovieTvCard";
import SkeletonCard from "../global/SkeletonCard";

const Recommendations = ({ type, id }: { type: string; id: number }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [`recommendations-${type}-${id}`],
    queryFn: () => getSimilarRecommendations(type, id),
  });
  return (
    <div>
      <h2 className='pt-4 font-semibold text-xl text-rose'>
        Recommendations based on this {type === "movie" ? "Movie" : "TV Show"}
      </h2>

      <div className='mt-3 flex gap-3 overflow-x-auto'>
        {!data?.results.length && (
          <p className='w-full text-xl text-center'>
            No recommendations to show
          </p>
        )}
        {!isError &&
          isLoading &&
          Array(20)
            .fill("")
            .map((_, i) => <SkeletonCard key={i} />)}
        {!isLoading &&
          !isError &&
          data?.results.map((movieOrTV: MovieProps | TVProps) => {
            if (type === "movie") {
              return (
                <MovieTvCard
                  key={movieOrTV.id}
                  type='movie'
                  movieOrTv={movieOrTV as MovieProps}
                />
              );
            } else {
              return (
                <MovieTvCard
                  key={movieOrTV.id}
                  type='tv'
                  movieOrTv={movieOrTV as TVProps}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default Recommendations;
