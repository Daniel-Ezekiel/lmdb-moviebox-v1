import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchByURL } from "../../api/allFetches";
import { MovieProps, PersonProps, TVProps } from "../../@types";
import MovieTvCard from "../components/global/MovieTvCard";
import PersonCard from "../components/global/PersonCard";

const Search = () => {
  // const { keywordWithQuery } = useParams();
  const [searchParams] = useSearchParams();

  const [category, setCategory] = useState("movie");

  const { isLoading, isError, data } = useQuery({
    queryKey: [`${searchParams.getAll("q")[0]}-${category}-search`],
    queryFn: () => searchByURL(category, searchParams.getAll("q")[0]),
  });

  return (
    <MainLayout showHeader={true} activePage='search' showFooter={true}>
      <section className='max-w-[124rem] mx-auto grid xsm:grid-cols-[1fr,_auto] gap-3 p-3 md:py-6'>
        <div className='mt-2 flex items-center'>
          <h1 className='font-bold text-3xl xl:text-5xl'>
            Search Results{" "}
            <span className='text-sm  font-normal text-rose align-text-top'>
              {category === "movie"
                ? "movies"
                : category === "tv"
                ? "TV Shows"
                : "People"}
            </span>
          </h1>
        </div>

        <div className='min-w-full grid gap-1 justify-self-end align-self-center'>
          <span className='font-medium text-base'>Filter by</span>
          <select
            name='category'
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='h-full  rounded-lg p-2 border-[0.1rem] shadow-lg text-base sm:w-[15rem]'
          >
            <option value='movie'>Movies</option>
            <option value='tv'>TV Shows</option>
            <option value='person'>People</option>
            {/* <option value=""></option> */}
          </select>
        </div>

        <div className='col-span-full mt-4 grid gap-4 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {!isLoading && !isError && !data.results.length && (
            <p className=' col-span-full place-self-center text-base'>
              No results for this category
            </p>
          )}

          {!isLoading &&
            !isError &&
            data.results.length &&
            data.results.map((item: MovieProps | TVProps | PersonProps) =>
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
        </div>
      </section>
    </MainLayout>
  );
};

export default Search;
