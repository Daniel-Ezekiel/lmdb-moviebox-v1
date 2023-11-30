import { Search } from "@mui/icons-material";
import { useState } from "react";

const SearchBox = ({ activePage }: { activePage: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery, activePage);

  return (
    <form
      action=''
      className='mb-2 row-start-2 col-span-full md:col-start-2 md:row-start-1 md:col-span-1 md:mb-[0] xl:ml-8'
    >
      <div className='relative min-w-full'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search for a movie, tv show, or person'
          className={`min-w-full p-2 rounded-lg bg-[transparent] border-[0.1rem] border-gray-200 placeholder:text-gray-200 text-white text-base`}
        />
        <button
          type='button'
          className='absolute top-1/2 right-2 -translate-y-1/2'
        >
          {" "}
          <Search fontSize='large' />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
