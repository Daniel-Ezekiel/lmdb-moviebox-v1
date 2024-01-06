import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { Google } from "@mui/icons-material";
import { useContext } from "react";
import { LoggedInContext } from "../../context/LoginContext";

const SignIn = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setIsLoggedIn }: { setIsLoggedIn?: any } =
    useContext(LoggedInContext);
  // const { isLoggedIn }: { isLoggedIn?: boolean } = useContext(LoggedInContext);

  return (
    <MainLayout activePage='sign-in' showFooter={false} showHeader={true}>
      <section className='max-w-[40rem] p-3 my-auto mx-auto'>
        <h1 className='my-3 font-bold text-4xl text-rose text-center uppercase'>
          Sign In
        </h1>
        <p className='mb-4 px-3 text-base text-center'>
          Sign in to keep track of your favourite Movies, TV Shows and
          Celeberities
        </p>
        <form action=''>
          <div className='mb-3 grid gap-1 text-base'>
            <label htmlFor='email' className='font-semibold text-rose'>
              Email
              <span className='text-[2rem]'>*</span>
            </label>
            <input
              id='email'
              name='email'
              type='text'
              placeholder='Enter your email address'
              className='p-3 border border-gray-300'
              required
            />
          </div>

          <div className='mb-3 grid gap-1 text-base'>
            <label htmlFor='password' className='font-semibold text-rose'>
              Password
              <span className='text-[2rem]'>*</span>
            </label>
            <input
              id='password'
              name='password'
              type='text'
              placeholder='Enter your password'
              className='p-3 border border-gray-300'
              required
            />
          </div>

          <button
            className='w-full mt-2 p-3 bg-rose font-semibold text-base text-white uppercase active:scale-90 transition-transform ease-in-out duration-300'
            type='button'
            onClick={() => setIsLoggedIn(true)}
          >
            Sign in
          </button>
        </form>

        <div className='flex justify-between mt-2 text-[1.2rem]'>
          <p>
            Don&apos;t have an account?{" "}
            <Link to='/sign-up' className='text-rose underline'>
              Sign up,
            </Link>
          </p>
          <button className='text-rose underline'>Forgot Password?</button>
        </div>

        <button className='mt-6 flex justify-center gap-2 w-full border border-gray-400 p-3 text-center text-base active:scale-90 transition-transform ease-in-out duration-300'>
          <Google fontSize='large' />
          Continue with Google
        </button>
      </section>
    </MainLayout>
  );
};

export default SignIn;
