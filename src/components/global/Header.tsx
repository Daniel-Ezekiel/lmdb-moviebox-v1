import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MenuOpenRounded, MenuRounded } from "@mui/icons-material";

const Header = ({ activePage }: { activePage: string }) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  // let mobileClassNames: string;

  const openOrCloseMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    if (!activeMenu) {
      menuRef.current?.classList.remove("right-[-100vw]");
      menuRef.current?.classList.add("right-[0]");
    } else {
      menuRef.current?.classList.add("right-[-100vw]");
      menuRef.current?.classList.remove("right-[0]");
    }

    setActiveMenu((prevMenuState: boolean) => !prevMenuState);
  };

  return (
    <header className={`${activePage === "home" && "z-[2] bg-transparent"}`}>
      <nav className='max-w-[124rem] mx-auto flex justify-between items-center p-3'>
        <Link to='/' className='flex items-center gap-1 font-semibold text-2xl'>
          <img src='/logo.png' alt='logo' className='w-8 h-8 md:w-10 md:h-10' />
          LMDb
        </Link>

        <ul
          className='flex flex-col gap-8 font-semibold fixed pt-[10rem] px-[5rem] top-[0] w-[60vw] h-[100vh] bg-[rgba(0,0,0,0.09)] backdrop-blur-[4rem] transition-all ease-in-out duration-300 md:static md:grid md:grid-cols-3 md:bg-[rgba(0,0,0,0)] md:backdrop-blur-[0] md:h-fit md:w-fit md:p-4 lg:text-lg '
          ref={menuRef}
        >
          <li className='w-fit hover:underline'>
            <Link to='/movies' className='w-fit'>
              <span className='text-gray-700'>01.</span> Movies
            </Link>
          </li>
          <li className='w-fit hover:underline'>
            <Link to='/tv-shows' className='w-fit'>
              <span className='text-gray-700'>02.</span> TV Shows
            </Link>
          </li>
          <li className='w-fit hover:underline'>
            <Link to='/people' className='w-fit'>
              <span className='text-gray-700'>03.</span> People
            </Link>
          </li>
        </ul>

        <button
          type='button'
          onClick={openOrCloseMenu}
          className='fixed right-[3rem] z-[2] md:hidden'
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
