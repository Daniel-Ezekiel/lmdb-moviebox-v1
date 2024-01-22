import { PersonProps } from "../../@types";
import MainLayout from "../layout/MainLayout";
import { getPopularPeople } from "../../api/allFetches";
import { useInfiniteQuery } from "@tanstack/react-query";
import PersonCard from "../components/global/PersonCard";
import SkeletonCard from "../components/global/SkeletonCard";
import { Fragment } from "react";
import { CircleLoader } from "react-spinners";

const People = () => {
  const {
    isLoading,
    isError,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`popular-people`],
    queryFn: getPopularPeople,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      } else {
        return undefined;
      }
    },
  });

  console.log(!isLoading && data);

  const people = data?.pages.map((page, i) => (
    <Fragment key={i}>
      {page.results.map((person: PersonProps) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </Fragment>
  ));

  return (
    <MainLayout showHeader={true} activePage='movies' showFooter={true}>
      <section className='max-w-[124rem] mx-auto p-3 pt-6 md:pt-[5rem]'>
        <h1 className='flex gap-2 font-semibold text-4xl'>
          People{" "}
          <span className='w-fit font-normal text-sm text-rose'>popular</span>
        </h1>
      </section>

      <section className='max-w-[124rem] mx-auto p-3 grid gap-4 xsm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5'>
        {isError && (
          <div className='col-span-full max-w-[124rem] mx-auto p-3'>
            Error! Could not fetch popular people
          </div>
        )}

        {isLoading &&
          Array(20)
            .fill("")
            .map((_, i) => <SkeletonCard key={i} />)}

        {!isLoading && people}

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className='col-span-full w-[12rem] mt-6 p-3 flex justify-center items-center place-self-center bg-rose rounded-xl shadow-xl font-medium uppercase text-base text-white active:scale-90 transition-transform ease-in-out duration-300'
          >
            {isFetchingNextPage ? (
              <CircleLoader size={20} color='white' />
            ) : (
              "Load more"
            )}
          </button>
        )}
      </section>
    </MainLayout>
  );
};

export default People;
