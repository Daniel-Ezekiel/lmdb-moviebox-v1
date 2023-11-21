import { MovieProps } from "../../@types";
import MainLayout from "../layout/MainLayout";
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getTrending,
  getUpcoming,
} from "../../api/allFetches";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/global/MovieCard";
import SkeletonCard from "../components/global/SkeletonCard";

const Movies = () => {
  const { category } = useParams();
  // console.log(category);
  const fnName =
    category === "now-playing"
      ? getNowPlaying
      : category === "popular"
      ? getPopular
      : category === "top-rated"
      ? getTopRated
      : category === "trending"
      ? getTrending
      : getUpcoming;

  const { isLoading, isError, data } = useQuery({
    queryKey: [`movies`],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryFn: () => fnName("movie") ?? fnName,
  });

  const movies: React.ReactNode[] = data?.results.map((movie: MovieProps) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  return (
    <MainLayout showHeader={true} activePage='movies' showFooter={true}>
      <section className='max-w-[124rem] mx-auto p-3 grid grid-cols-2 justify-between items-center gap-4'>
        <h1 className='flex gap-2 font-semibold text-4xl'>
          Movies{" "}
          <span className='text-sm text-rose'>
            {category?.split("-").join(" ")}
          </span>
        </h1>
      </section>

      <section className='max-w-[124rem] mx-auto p-3 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5'>
        {isError && (
          <div className='col-span-full max-w-[124rem] mx-auto p-3'>
            Error! Could not fetch movies
          </div>
        )}

        {isLoading &&
          Array(20)
            .fill("")
            .map((_, i) => <SkeletonCard key={i} />)}

        {!isLoading && movies}
      </section>
    </MainLayout>
  );
};

export default Movies;
