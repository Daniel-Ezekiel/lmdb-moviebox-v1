import { MovieProps, TVProps } from "../../@types";
import MainLayout from "../layout/MainLayout";
import { getByURL } from "../../api/allFetches";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import SkeletonCard from "../components/global/SkeletonCard";
import MovieTvCard from "../components/global/MovieTvCard";
import { Fragment } from "react";
import { ClipLoader } from "react-spinners";

const Movies = () => {
  const { category } = useParams();

  const {
    isLoading,
    isError,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`tv-${category}`],
    queryFn: ({ pageParam }) =>
      getByURL("tv", category?.split("-").join("_"), { pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      } else {
        return undefined;
      }
    },
  });

  const tvShows = data?.pages.map((page, i) => (
    <Fragment key={i}>
      {page.results.map((movieOrTv: MovieProps | TVProps) => (
        <MovieTvCard key={movieOrTv.id} type='tv' movieOrTv={movieOrTv} />
      ))}
    </Fragment>
  ));

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
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className='col-span-full w-[12rem] mt-6 p-3 flex justify-center items-center place-self-center bg-rose rounded-xl shadow-xl font-medium uppercase text-base text-white active:scale-90 transition-transform ease-in-out duration-300'
          >
            {isFetchingNextPage ? (
              <ClipLoader size={20} color='white' />
            ) : (
              "Load more"
            )}
          </button>
        )}
      </section>
    </MainLayout>
  );
};

export default Movies;
