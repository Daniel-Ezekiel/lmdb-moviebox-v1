import { Fragment } from "react";
import MainLayout from "../layout/MainLayout";
import { useParams, useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchByURL } from "../../api/allFetches";
import { MovieProps, PersonProps, TVProps } from "../../@types";
import MovieTvCard from "../components/global/MovieTvCard";
import PersonCard from "../components/global/PersonCard";
import { ClipLoader } from "react-spinners";

const Search = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  // const [category, setCategory] = useState(category);

  const {
    isLoading,
    isError,
    data,
    isFetched,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [`${searchParams.getAll("q")[0]}-${category}-search`],
    queryFn: ({ pageParam }) =>
      searchByURL(
        category === "all" ? "multi" : (category as string),
        searchParams.getAll("q")[0],
        {
          pageParam,
        }
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      } else {
        return undefined;
      }
    },
  });

  return (
    <MainLayout showHeader={true} activePage='search' showFooter={true}>
      <section className='max-w-[124rem] mx-auto grid xsm:grid-cols-[1fr,_auto] gap-3 p-3 md:py-6'>
        <div className='mt-2 flex items-center'>
          <h1 className='font-bold text-3xl xl:text-5xl'>
            Search Results for{" "}
            <span className='text-rose'>
              {searchParams.getAll("q")[0].split("-").join(" ")}
            </span>{" "}
            <span className='text-sm  font-normal align-text-top'>
              in{" "}
              {category === "movie"
                ? "movies"
                : category === "tv"
                ? "TV Shows"
                : category === "person"
                ? "People"
                : "All"}
            </span>
          </h1>
        </div>

        {/* <div className='min-w-full grid justify-self-end align-self-center md:gap-1'>
          <span className='font-medium text-sm'>Filter by</span>
          <select
            name='category'
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='h-full rounded-lg p-1 px-2 border-[0.1rem] shadow-lg text-base sm:w-[15rem] md:py-2'
          >
            <option value='movie'>Movies</option>
            <option value='tv'>TV Shows</option>
            <option value='person'>People</option>
          </select>
        </div> */}

        <div className='col-span-full mt-4 grid gap-4 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {!isLoading &&
          !isError &&
          isFetched &&
          data?.pages[0].results.length ? (
            data?.pages.map((page, i) => (
              <Fragment key={i}>
                {category === "all" &&
                  page.results.map((item: MovieProps | TVProps | PersonProps) =>
                    item.media_type === "movie" ? (
                      <MovieTvCard
                        key={item.id}
                        type='movie'
                        movieOrTv={item as MovieProps}
                      />
                    ) : item.media_type === "tv" ? (
                      <MovieTvCard
                        key={item.id}
                        type='tv'
                        movieOrTv={item as TVProps}
                      />
                    ) : (
                      <PersonCard key={item.id} person={item as PersonProps} />
                    )
                  )}
                {category !== "all" &&
                  page.results.map((item: MovieProps | TVProps | PersonProps) =>
                    category === "movie" ? (
                      <MovieTvCard
                        key={item.id}
                        type='movie'
                        movieOrTv={item as MovieProps}
                      />
                    ) : category === "tv" ? (
                      <MovieTvCard
                        key={item.id}
                        type='tv'
                        movieOrTv={item as TVProps}
                      />
                    ) : (
                      <PersonCard key={item.id} person={item as PersonProps} />
                    )
                  )}
              </Fragment>
            ))
          ) : (
            <p className=' col-span-full place-self-center text-base'>
              No{" "}
              <span className='capitalize'>
                {category === "tv"
                  ? "TV Show"
                  : category === "all"
                  ? "Results"
                  : category}
              </span>{" "}
              with that name or title.
            </p>
          )}

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
        </div>
      </section>
    </MainLayout>
  );
};

export default Search;
