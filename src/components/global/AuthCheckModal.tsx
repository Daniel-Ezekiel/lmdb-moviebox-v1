import { Link } from "react-router-dom";

const AuthCheckModal = () => {
  return (
    <>
      <div className='w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-40 transition-all ease-in-out duration-300'></div>
      <div className='max-w-[40rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl text-base z-50 transition-all ease-in-out duration-300'>
        <h2 className='mb-3 pb-2 uppercase font-semibold text-xl text-center text-rose border-b lg:text-2xl'>
          Notice
        </h2>
        <p className='text-center text-xl lg:max-w-[60rem]'>
          Please sign in to add this content to your favourites.
        </p>
        <div className='mt-4 flex justify-center items-center gap-3 lg:max-w-[60rem]'>
          <button className='w-[10rem] px-3 py-2 rounded-lg bg-gray-300 text-black shadow-lg active:scale-90 transition-transform ease-in-out duration-3'>
            Close
          </button>

          <button className='w-[10rem] px-3 py-2 rounded-lg bg-rose text-white uppercase shadow-lg active:scale-90 transition-transform ease-in-out duration-3'>
            Sign in
          </button>
          <Link to='/sign-up'></Link>

          {/* <Link to='/sign-in'>Sign in</Link> */}
        </div>
      </div>
    </>
  );
};

export default AuthCheckModal;
