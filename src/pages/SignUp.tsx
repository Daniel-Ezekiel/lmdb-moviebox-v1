import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { Google } from "@mui/icons-material";
import { useContext, useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setIsLoggedIn }: { setIsLoggedIn?: any } = useContext(AuthContext);

  const signUpWithEmailAndPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      // setTimeout(() => {
      //   setIsLoading(true);
      // }, 1500);
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);

      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout activePage='sign-in' showFooter={false} showHeader={true}>
      <section className='max-w-[40rem] p-3 my-auto mx-auto'>
        <h1 className='my-3 font-bold text-4xl text-rose text-center uppercase'>
          Sign Up
        </h1>
        <p className='mb-4 px-3 text-base text-center'>
          Create an account to keep track of your favourite Movies, TV Shows and
          Celebrities
        </p>
        <form
          onSubmit={signUpWithEmailAndPassword}
          className='grid grid-cols-2 gap-4'
        >
          {/* <div className='grid gap-1 text-base'>
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
          </div> */}

          <div className='col-span-full grid gap-1 text-base'>
            <label htmlFor='email' className='font-semibold text-rose'>
              Email
              <span className='text-[2rem]'>*</span>
            </label>
            <input
              id='email'
              name='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
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
              type='password'
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder='Enter your password'
              className='p-3 border border-gray-300'
              required
            />
          </div>

          <button
            className={`col-span-full w-full mt-2 p-3 flex justify-center items-center bg-rose font-semibold text-base text-white uppercase active:scale-90 transition-transform ease-in-out duration-300`}
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color='white' /> : "Sign up"}
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
