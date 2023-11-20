import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='mt-6 pt-8 bg-rose text-gray-100'>
      <div className='w-p[124rem] mx-auto pt-3 grid justify-center gap-4 md:grid-cols-2 md:items-center'>
        <Link
          to='/'
          className='pb-4 flex justify-center items-center gap-1 font-semibold text-2xl'
        >
          <img src='/logo.png' alt='logo' className='w-8 h-8 md:w-10 md:h-10' />
          LMDb
        </Link>

        <ul className='p-none pb-4 flex gap-2 justify-center font-semibold text-base'>
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

        <p className='p-2 bg-[rgb(151,15,49)] col-span-full text-sm text-center'>
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
      </div>
    </footer>
  );
};

export default Footer;
