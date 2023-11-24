import { Link } from "react-router-dom";

const Footer = () => {
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

        <ul className='p-none pb-4 flex gap-2 justify-center font-semibold text-base md:pr-3 md:justify-end'>
          <li className='hover:underline'>
            <Link to='/'>Home</Link>
          </li>
          <li className='hover:underline'>
            <Link to='/'>Movies</Link>
          </li>
          <li className='hover:underline'>
            <Link to='/'>TV Shows</Link>
          </li>
          <li className='hover:underline'>
            <Link to='/'>People</Link>
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
