import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { Google } from "@mui/icons-material";

const SignUp = () => {
  return (
    <MainLayout activePage='sign-in' showFooter={false} showHeader={true}>
      <section className='max-w-[48rem] p-3 my-auto mx-auto'>
        <h1 className='my-3 font-bold text-4xl text-rose text-center uppercase'>
          Sign Up
        </h1>
        <p className='mb-4 px-3 text-base text-center'>
          Create an account to keep track of your favourite Movies, TV Shows and
          Celebrities
        </p>
        <form action='' className='grid grid-cols-2 gap-4'>
          <div className='grid gap-1 text-base'>
            <label htmlFor='first-name' className='font-semibold text-rose'>
              First Name
              <span className='text-[2rem]'>*</span>
            </label>
            <input
              id='first-name'
              name='first-name'
              type='text'
              placeholder='Enter your first name'
              className='p-3 border border-gray-300'
              required
            />
          </div>

          <div className='grid gap-1 text-base'>
            <label htmlFor='last-name' className='font-semibold text-rose'>
              Last Name
              <span className='text-[2rem]'>*</span>
            </label>
            <input
              id='last-name'
              name='last-name'
              type='text'
              placeholder='Enter your last name'
              className='p-3 border border-gray-300'
              required
            />
          </div>

          <div className='col-span-full grid gap-1 text-base'>
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

          <div className='col-span-full grid gap-1 text-base'>
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
            className='col-span-full w-full mt-2 p-3 bg-rose font-semibold text-base text-white uppercase active:scale-90 transition-transform ease-in-out duration-300'
            type='button'
          >
            Sign in
          </button>
        </form>

        <div className='flex justify-between mt-2 text-[1.2rem]'>
          <p>
            Already have an account?{" "}
            <Link to='/sign-in' className='text-rose underline'>
              Sign in.
            </Link>
          </p>
        </div>

        <button className='mt-6 flex justify-center gap-2 w-full border border-gray-400 p-3 text-center text-base active:scale-90 transition-transform ease-in-out duration-300'>
          <Google fontSize='large' />
          Continue with Google
        </button>
      </section>
    </MainLayout>
  );
};

export default SignUp;
