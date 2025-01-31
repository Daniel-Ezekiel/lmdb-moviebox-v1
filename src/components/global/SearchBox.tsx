import { Search } from "@mui/icons-material";
import { useState } from "react";

const SearchBox = ({
  activePage,
  isShown,
}: {
  activePage: string;
  isShown: boolean;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");

  return (
    <form
      action={`/search/${searchCategory}`}
      method='GET'
      className={`${!isShown && "hidden"} ${
        activePage !== "home" && "bg-rose"
      } w-[95%] absolute left-1/2 -bottom-[5rem]  rounded-lg -translate-x-1/2 z-[3] md:block md:static md:mb-[0] md:col-start-2 md:row-start-1 md:col-span-1 md:translate-x-[0] xl:ml-8`}
    >
      <div className='relative min-w-full'>
        <select
          id='category'
          className='absolute top-1/2 left-2 -translate-y-1/2 rounded-3xl p-1 bg-[transparent] border-[0.1rem] border-gray-200 text-white text-base'
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.currentTarget.value)}
        >
          <option value='multi' className='text-[#000]'>
            All
          </option>
          <option value='movie' className='text-[#000]'>
            Movies
          </option>
          <option value='tv' className='text-[#000]'>
            TV Shows
          </option>
          <option value='person' className='text-[#000]'>
            People
          </option>
        </select>
        <input
          name='q'
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search for ${
            searchCategory === "all"
              ? "a movie, tv show, or person"
              : searchCategory.split("-").join(" ")
          }...`}
          required
          className={`min-w-full p-2 pl-[12rem] rounded-[3rem] bg-[transparent] border-[0.1rem] border-gray-200 placeholder:text-gray-200 text-white text-base`}
        />
        <button className='absolute top-1/2 right-2 -translate-y-1/2'>
          <Search fontSize='large' />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
