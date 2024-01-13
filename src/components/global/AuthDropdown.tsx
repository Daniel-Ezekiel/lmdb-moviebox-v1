import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import {
  FavoriteBorderRounded,
  Logout,
  //   ViewListRounded,
} from "@mui/icons-material";
import { auth } from "../../../config/firebase";
import { signOut, User } from "firebase/auth";

const AuthDropdown = ({
  authShown,
  setAuthShown,
}: {
  authShown: boolean;
  setAuthShown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const { isLoggedIn }: { isLoggedIn?: boolean } = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setIsLoggedIn }: { setIsLoggedIn?: any } = useContext(AuthContext);
  const { currentUser }: { currentUser?: User } = useContext(AuthContext);

  const signOutFromApp = async () => {
    try {
      signOut(auth);

      setAuthShown(false);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoggedIn && authShown && (
        <div className='absolute top-[115%] right-[0] bg-white border border-white overflow-hidden shadow-lg font-medium text-rose text-base rounded-lg z-[1]'>
          <ul className='w-fit flex flex-col justify-start items-start text-start'>
            <li className='w-full px-2 py-2 font-semibold border-b border-rose transition-all ease-in-out duration-300'>
              Hi, {currentUser?.displayName || currentUser?.email}
            </li>
            <li className='w-full px-2 py-2 flex items-center gap-1 hover:bg-rose hover:text-white transition-all ease-in-out duration-300'>
              <FavoriteBorderRounded fontSize='large' />
              Favourites
            </li>
            {/* <li className='w-full px-2 py-2 flex items-center gap-1 hover:bg-rose hover:text-white transition-all ease-in-out duration-300'>
              <ViewListRounded fontSize='large' />
              My Lists
            </li> */}
            <li className='w-full px-2 py-2 flex items-centerfont-semibold uppercase hover:bg-rose hover:text-white transition-all ease-in-out duration-300'>
              <button onClick={signOutFromApp}>
                <Logout fontSize='large' className='mr-1' />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default AuthDropdown;
