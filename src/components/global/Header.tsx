import { Link } from "react-router-dom";

const Header = ({ activePage }: { activePage: string }) => {
  console.log(activePage);
  return (
    <header className={`${activePage === "home" && "z-[1] bg-transparent"}`}>
      <nav className='max-w-[124rem] mx-auto flex justify-between items-center p-3'>
        <Link to='/' className='flex items-center gap-1 font-semibold text-2xl'>
          <img src='/logo.png' alt='logo' className='w-8 h-8 md:w-10 md:h-10' />
          LMDb
        </Link>

        <ul className='hidden gap-2'>
          <li>Movies</li>
          <li>TV Shows</li>
          <li>People</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
