import { useState } from "react";
import MainLayout from "../layout/MainLayout";

const Search = () => {
  const [category, setCategory] = useState("movies");

  return (
    <MainLayout showHeader={true} activePage='search' showFooter={true}>
      <section className='max-w-[124rem] mx-auto grid grid-cols-[1fr,_auto] gap-3 p-3 md:py-6'>
        <div className='flex items-center'>
          <h1 className='font-bold text-3xl xl:text-5xl'>Search Results</h1>
        </div>

        <div className='justify-self-end align-self-center'>
          <select
            name='category'
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='h-full  rounded-lg p-2 border-[0.1rem] shadow-lg text-base xsm:w-[15rem]'
          >
            <option value='movie'>Movies</option>
            <option value='tv'>TV Shows</option>
            <option value='person'>People</option>
            {/* <option value=""></option> */}
          </select>
        </div>

        <div className='col-span-full'>Real search results on page load...</div>
      </section>
    </MainLayout>
  );
};

export default Search;
