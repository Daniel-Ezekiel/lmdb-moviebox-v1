import { MovieProps } from "../../@types";
import MainLayout from "../layout/MainLayout";
import { getByURL } from "../../api/allFetches";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/global/MovieCard";
import SkeletonCard from "../components/global/SkeletonCard";

const Movies = () => {
  const { category } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: [`movies-${category}`],
    queryFn: () => getByURL("movie", category?.split("-").join("_")),
  });

  const movies: React.ReactNode[] = data?.results.map((movie: MovieProps) => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  return (
    <MainLayout showHeader={true} activePage='movies' showFooter={true}>
      <section className='max-w-[124rem] mx-auto p-3 grid grid-cols-2 justify-between items-center gap-4 md:pt-[5rem]'>
        <h1 className='flex gap-2 font-semibold text-4xl'>
          Movies{" "}
          <span className='font-normal text-sm text-rose'>
            {category?.split("-").join(" ")}
          </span>
        </h1>
      </section>

      <section className='max-w-[124rem] mx-auto p-3 grid xsm:grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5'>
        {isError && (
          <div className='col-span-full max-w-[124rem] mx-auto p-3'>
            Error! Could not fetch {category?.split("-").join(" ")} movies
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
