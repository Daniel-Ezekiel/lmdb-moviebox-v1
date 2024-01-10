import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { Google } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from "react-spinners";

const SignIn = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setIsLoggedIn }: { setIsLoggedIn?: any } = useContext(AuthContext);
  // const { isLoggedIn }: { isLoggedIn?: boolean } = useContext(AuthContext);

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);

      navigate(-1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <form onSubmit={signIn}>
          <div className='mb-3 grid gap-1 text-base'>
            <label htmlFor='email' className='font-semibold text-rose'>
              Email
              <span className='text-[2rem]'>*</span>
            </label>
            <input
              id='email'
              name='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
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
              type='password'
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder='Enter your password'
              className='p-3 border border-gray-300'
              required
            />
          </div>

          <button className='w-full mt-2 p-3 flex justify-center items-center bg-rose font-semibold text-base text-white uppercase active:scale-90 transition-transform ease-in-out duration-300'>
            {isLoading ? <ClipLoader color='white' /> : "Sign in"}
          </button>
        </form>

        <div className='flex justify-between mt-2 text-[1.2rem] font-semibold'>
          <p>
            Don&apos;t have an account?{" "}
            <Link to='/sign-up' className='text-rose underline'>
              Sign up.
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
