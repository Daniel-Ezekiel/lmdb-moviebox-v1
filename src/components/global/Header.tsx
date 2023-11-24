import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MenuOpenRounded, MenuRounded } from "@mui/icons-material";

const Header = ({ activePage }: { activePage: string }) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const movieCategoryRef = useRef<HTMLUListElement>(null);
  const tvCategoryRef = useRef<HTMLUListElement>(null);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

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

  return (
    <header
      className={`${
        activePage === "home" ? "z-[2] bg-transparent" : "bg-rose text-white"
      } h-fit shadow-lg`}
    >
      <nav className='max-w-[124rem] mx-auto flex justify-between items-center p-3'>
        <Link to='/' className='flex items-center gap-1 font-semibold text-2xl'>
          <img src='/logo.png' alt='logo' className='w-8 h-8 md:w-10 md:h-10' />
          LMDb
        </Link>

        <ul
          className='flex flex-col gap-4 font-semibold fixed pt-[10rem] px-[5rem] top-[0] -right-[100vw] w-[60vw] h-[100vh] bg-[rgba(0,0,0,0.09)] backdrop-blur-[4rem] transition-all ease-in-out duration-300 shadow-xl shadow-blue-100 md:shadow-none md:static md:grid md:grid-cols-3 md:bg-[rgba(0,0,0,0)] md:backdrop-blur-[0] md:h-fit md:w-fit md:p-4 md:gap-8 lg:text-lg '
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
            <span className='text-gray-700'>01.</span> Movies
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
            onMouseLeave={() => tvCategoryRef.current?.classList.add("hidden")}
          >
            <span className='text-gray-700'>02.</span> TV Shows
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
              <span className='text-gray-700'>03.</span> People
            </Link>
          </li>
        </ul>

        <button
          type='button'
          onClick={openOrCloseMenu}
          ref={hamburgerRef}
          className='md:hidden'
        >
          {!activeMenu ? (
            <MenuRounded sx={{ fontSize: "3rem" }} />
          ) : (
            <MenuOpenRounded sx={{ fontSize: "3rem" }} />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
