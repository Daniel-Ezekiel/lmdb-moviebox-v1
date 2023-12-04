import { MovieProps, TVProps } from "../../@types";
import MainLayout from "../layout/MainLayout";
import { getByURL } from "../../api/allFetches";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SkeletonCard from "../components/global/SkeletonCard";
import MovieTvCard from "../components/global/MovieTvCard";

const Movies = () => {
  const { category } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: [`tv-${category}`],
    queryFn: () => getByURL("tv", category?.split("-").join("_")),
  });

  const tvShows: React.ReactNode[] = data?.results.map(
    (movieOrTv: MovieProps | TVProps) => (
      <MovieTvCard key={movieOrTv.id} type='tv' movieOrTv={movieOrTv} />
    )
  );

  return (
    <MainLayout showHeader={true} activePage='movies' showFooter={true}>
      <section className='max-w-[124rem] mx-auto p-3 pt-6 md:pt-[5rem]'>
        <h1 className='flex gap-2 font-semibold text-4xl'>
          TV Shows{" "}
          <span className='w-fit font-normal text-sm text-rose'>
            {category?.split("-").join(" ")}
          </span>
        </h1>
      </section>

      <section className='max-w-[124rem] mx-auto p-3 grid justify-center gap-4 xsm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5'>
        {isError && (
          <div className='col-span-full max-w-[124rem] mx-auto p-3'>
            Error! Could not fetch {category?.split("-").join(" ")} movies
          </div>
        )}

        {isLoading &&
          Array(20)
            .fill("")
            .map((_, i) => <SkeletonCard key={i} />)}

        {!isLoading && tvShows}
      </section>
    </MainLayout>
  );
};

export default Movies;
