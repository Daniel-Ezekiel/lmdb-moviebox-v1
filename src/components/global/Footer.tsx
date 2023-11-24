import { useRef } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const movieCategoryRef = useRef<HTMLUListElement>(null);
  const tvCategoryRef = useRef<HTMLUListElement>(null);

  return (
    <footer className={`pt-8 text-rose`}>
      <div className='max-w-[124rem] mx-auto py-4 pt-3 grid grid-cols-1 justify-center gap-4 md:grid-cols-2 md:items-center'>
        <Link
          to='/'
          className='pb-4 flex justify-center items-center gap-1 font-semibold text-2xl text-rose md:pl-3 md:justify-start'
        >
          <img src='/logo.png' alt='logo' className='w-8 h-8 md:w-10 md:h-10' />
          LMDb
        </Link>

        <ul className='p-none pb-4 flex gap-8 justify-center font-semibold text-base md:pr-3 md:justify-end'>
          <li
            className='w-fit relative text-base text-rose'
            onMouseEnter={() =>
              movieCategoryRef.current?.classList.remove("hidden")
            }
            onMouseLeave={() =>
              movieCategoryRef.current?.classList.add("hidden")
            }
          >
            Movies
            <ul
              className='hidden px-2 text-blue-100 shadow-lg md:absolute md:min-w-[13rem] md:bottom-4 md:py-2 md:px-4 md:rounded-lg md:bg-white md:text-blue-100'
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
            className='w-fit relative text-base text-rose'
            onMouseEnter={() =>
              tvCategoryRef.current?.classList.remove("hidden")
            }
            onMouseLeave={() => tvCategoryRef.current?.classList.add("hidden")}
          >
            TV Shows
            <ul
              className='hidden text-blue-100 shadow-lg md:absolute md:min-w-[13rem] md:bottom-4 md:py-2 md:px-4 md:rounded-lg md:bg-white md:text-blue-100'
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
              People
            </Link>
          </li>
        </ul>
      </div>

      <p
        className={`py-2 bg-rose col-span-full text-sm text-center text-gray-100`}
      >
        Built by{" "}
        <a
          href='https://danielezekiel.vercel.app'
          target='_blank'
          rel='noreferrer'
          className='italic underline'
        >
          Daniel B. Ezekiel
        </a>
      </p>
    </footer>
  );
};

export default Footer;
