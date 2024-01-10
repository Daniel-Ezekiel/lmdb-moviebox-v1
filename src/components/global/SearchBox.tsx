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
  // console.log(searchQuery, activePage);

  function searchDatabase(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(event.currentTarget.query.value);
    window.location.href = `/search/keyword?q=${searchQuery
      .trim()
      .split(" ")
      .join("-")}`;
  }

  return (
    <form
      onSubmit={searchDatabase}
      method='GET'
      className={`${!isShown && "hidden"} ${
        activePage !== "home" && "bg-rose"
      } w-[95%] absolute left-1/2 -bottom-[5rem]  rounded-lg -translate-x-1/2 z-[3] md:block md:static md:mb-[0] md:col-start-2 md:row-start-1 md:col-span-1 md:translate-x-[0] xl:ml-8`}
    >
      <div className='relative min-w-full'>
        <input
          name='query'
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search for a movie, tv show, or person'
          required
          className={`min-w-full p-2 rounded-lg bg-[transparent] border-[0.1rem] border-gray-200 placeholder:text-gray-200 text-white text-base`}
        />
        <button
          // type='button'
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
