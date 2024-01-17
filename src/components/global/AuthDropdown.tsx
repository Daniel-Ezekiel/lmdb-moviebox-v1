import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import {
  FavoriteBorderRounded,
  Logout,
  //   ViewListRounded,
} from "@mui/icons-material";
import { auth, db } from "../../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface UserInfoProps {
  firstName: string;
  lastName: string;
}

const AuthDropdown = ({
  authShown,
  setAuthShown,
}: {
  authShown: boolean;
  setAuthShown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null);

  const { isLoggedIn }: { isLoggedIn?: boolean } = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setIsLoggedIn }: { setIsLoggedIn?: any } = useContext(AuthContext);
  // const { currentUser }: { currentUser?: User } = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setCurrentUser }: { setCurrentUser?: any } = useContext(AuthContext);

  const signOutFromApp = async () => {
    try {
      await signOut(auth);

      setAuthShown(false);
      setIsLoggedIn(false);
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userInfoRef = doc(db, "users", user.uid);
      const userInfoSnap = await getDoc(userInfoRef);

      try {
        if (userInfoSnap.exists()) {
          const res = userInfoSnap.data();

          setUserInfo((prevInfo) => {
            return {
              ...prevInfo,
              firstName: res.firstName,
              lastName: res.lastName,
            };
          });
        } else {
          // favSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <>
      {isLoggedIn && authShown && (
        <div className='absolute top-[115%] right-[0] bg-white border border-white overflow-hidden shadow-lg font-medium text-rose text-base rounded-lg z-[1]'>
          <ul className='w-fit flex flex-col justify-start items-start text-start'>
            <li className='w-full px-2 py-2 font-semibold border-b border-rose transition-all ease-in-out duration-300'>
              Hi, {userInfo?.firstName}
            </li>
            <li className='w-full px-2 py-2 hover:bg-rose hover:text-white transition-all ease-in-out duration-300'>
              <Link to='/favourites' className='flex items-center gap-1'>
                <FavoriteBorderRounded fontSize='large' />
                Favourites
              </Link>
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
