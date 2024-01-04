import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../../../context/LoginContext";
import {
  AccountCircle,
  MenuOpenRounded,
  MenuRounded,
  Search,
} from "@mui/icons-material";
import SearchBox from "./SearchBox";
import AuthDropdown from "./AuthDropdown";

const Header = ({ activePage }: { activePage: string }) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLButtonElement>(null);
  const movieCategoryRef = useRef<HTMLUListElement>(null);
  const tvCategoryRef = useRef<HTMLUListElement>(null);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [authShown, setAuthShown] = useState<boolean>(false);
  const isLoggedIn = useContext(LoggedInContext);

  // console.log(isLoggedIn);

  // let mobileClassNames: string;

  const openOrCloseMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    if (!activeMenu) {
      menuRef.current?.classList.remove("-right-[100vw]");
      menuRef.current?.classList.add("right-[0]");
      hamburgerRef.current?.classList.add("fixed", "right-3", "z-[2]");
    } else {
      menuRef.current?.classList.add("-right-[100vw]");
      menuRef.current?.classList.remove("right-[0]");
      hamburgerRef.current?.classList.remove("fixed", "right-3", "z-[2]");
    }

    setActiveMenu((prevMenuState: boolean) => !prevMenuState);
  };

  const toggleSearchBar = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsShown(!isShown);
  };

  const toggleAuthDropDown = () => {
    setAuthShown(!authShown);
    console.log("clicked");
  };

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <header
        className={`${
          activePage === "home" ? "z-[2] bg-transparent" : "bg-rose text-white"
        } h-fit shadow-lg`}
      >
        <nav className='relative max-w-[124rem] mx-auto p-3 py-1 grid grid-cols-2 justify-between items-center gap-4 md:p-2 md:grid-cols-[12rem,1fr,_auto] md:gap-10 lg:grid-cols-[12rem,1fr,_auto,_auto] lg:gap-[4rem] xl:gap-[4rem]'>
          <Link
            to='/'
            className='w-fit flex items-center gap-1 font-semibold text-2xl'
          >
            <img
              src='/logo.png'
              alt='logo'
              className='w-8 h-8 md:w-10 md:h-10'
            />
            LMDb
          </Link>

          <SearchBox activePage={activePage} isShown={isShown} />

          <ul
            className='flex flex-col gap-4 font-semibold fixed pt-[10rem] px-[5rem] top-[0] -right-[100vw] w-[68vw] h-[100vh] bg-[rgba(0,0,0,0.09)] backdrop-blur-[4rem] transition-all ease-in-out duration-300 shadow-xl z-10 lg:justify-self-end shadow-blue-100 lg:shadow-none lg:static lg:flex-row lg:justify-end lg:items-center lg:bg-[rgba(0,0,0,0)] lg:backdrop-blur-[0] lg:h-fit lg:w-fit lg:p-4 lg:px-[0] lg:py-2 lg:gap-4 lg:text-lg xl:ml-8'
            ref={menuRef}
          >
            <li
              className='w-fit relative text-base text-white'
              onMouseEnter={() =>
                movieCategoryRef.current?.classList.remove("hidden")
              }
              onMouseLeave={() =>
                movieCategoryRef.current?.classList.add("hidden")
              }
            >
              <span className='text-gray-300'>01.</span> Movies
              <ul
                className='hidden pl-5 text-gray-200 md:absolute md:min-w-[13rem] -md:bottom-3 md:py-2 md:px-4 md:rounded-lg md:bg-white md:text-blue-100'
                ref={movieCategoryRef}
              >
                <li className='hover:text-rose'>
                  <Link to='/movies/now-playing' className='w-fit text-base'>
                    Now Playing
                  </Link>
                </li>

                <li className='hover:text-rose'>
                  <Link to='/movies/trending' className='w-fit text-base'>
                    Trending
                  </Link>
                </li>

                <li className='hover:text-rose'>
                  <Link to='/movies/popular' className='w-fit text-base'>
                    Popular
                  </Link>
                </li>

                <li className='hover:text-rose'>
                  <Link to='/movies/top-rated' className='w-fit text-base'>
                    Top Rated
                  </Link>
                </li>

                <li className='hover:text-rose'>
                  <Link to='/movies/upcoming' className='w-fit text-base'>
                    Upcoming
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className='w-fit relative text-base text-white'
              onMouseEnter={() =>
                tvCategoryRef.current?.classList.remove("hidden")
              }
              onMouseLeave={() =>
                tvCategoryRef.current?.classList.add("hidden")
              }
            >
              <span className='text-gray-300'>02.</span> TV Shows
              <ul
                className='hidden pl-5 text-gray-200 md:absolute md:min-w-[13rem] -md:bottom-3 md:py-2 md:px-4 md:rounded-lg md:bg-white md:text-blue-100'
                ref={tvCategoryRef}
              >
                <li className='hover:text-rose'>
                  <Link to='/tv-shows/airing-today' className='w-fit text-base'>
                    Airing Today
                  </Link>
                </li>

                <li className='hover:text-rose'>
                  <Link to='/tv-shows/on-the-air' className='w-fit text-base'>
                    On the Air
                  </Link>
                </li>

                <li className='hover:text-rose'>
                  <Link to='/tv-shows/trending' className='w-fit text-base'>
                    Trending
                  </Link>
                </li>

                <li className='hover:text-rose'>
                  <Link to='/tv-shows/popular' className='w-fit text-base'>
                    Popular
                  </Link>
                </li>

                <li className='hover:text-rose'>
                  <Link to='/tv-shows/top-rated' className='w-fit text-base'>
                    Top Rated
                  </Link>
                </li>
              </ul>
            </li>
            <li className='w-fit'>
              <Link to='/people' className='w-fit text-base'>
                <span className='text-gray-300'>03.</span> People
              </Link>
            </li>
          </ul>

          <div className='flex gap-3 justify-self-end self-center'>
            <button
              type='button'
              onClick={toggleSearchBar}
              ref={searchRef}
              className='justify-self-end md:hidden lg:hidden'
            >
              <Search fontSize='large' />
            </button>

            <div className=''>
              {!isLoggedIn ? (
                <Link
                  to='/sign-in'
                  className={`${
                    activePage === "home"
                      ? "bg-rose text-white"
                      : "bg-white text-rose"
                  } p-2 px-4 rounded-xl text-sm uppercase font-semibold hover:scale-110 transition-transform ease-in-out duration-500`}
                >
                  Sign In
                </Link>
              ) : (
                <div className='relative block'>
                  <button onClick={toggleAuthDropDown}>
                    <AccountCircle sx={{ fontSize: "3rem" }} />
                  </button>
                  {authShown && <AuthDropdown />}
                </div>
              )}
            </div>

            <button
              type='button'
              onClick={openOrCloseMenu}
              ref={hamburgerRef}
              className='z-50 justify-self-end lg:hidden'
            >
              {!activeMenu ? (
                <MenuRounded sx={{ fontSize: "3rem" }} />
              ) : (
                <MenuOpenRounded sx={{ fontSize: "3rem" }} />
              )}
            </button>
          </div>
        </nav>
      </header>
    </LoggedInContext.Provider>
  );
};

export default Header;
