import { useContext } from "react";
import { LoggedInContext } from "../../../context/LoginContext";
import {
  FavoriteBorderRounded,
  Logout,
  //   ViewListRounded,
} from "@mui/icons-material";

const AuthDropdown = ({
  authShown,
  setAuthShown,
}: {
  authShown: boolean;
  setAuthShown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isLoggedIn }: { isLoggedIn?: boolean } = useContext(LoggedInContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setIsLoggedIn }: { setIsLoggedIn?: any } =
    useContext(LoggedInContext);

  return (
    <>
      {isLoggedIn && authShown && (
        <div className='absolute top-[115%] right-[0] bg-white border border-white overflow-hidden shadow-lg font-medium text-rose text-base rounded-lg'>
          <ul className='w-[12.5rem] flex flex-col justify-start items-start text-start'>
            <li className='w-full px-2 py-2 font-semibold uppercase border-b border-rose transition-all ease-in-out duration-300'>
              Hi, Daniel
            </li>
            <li className='w-full px-2 py-2 flex items-center gap-1 hover:bg-rose hover:text-white transition-all ease-in-out duration-300'>
              <FavoriteBorderRounded fontSize='large' />
              Favourites
            </li>
            {/* <li className='w-full px-2 py-2 flex items-center gap-1 hover:bg-rose hover:text-white transition-all ease-in-out duration-300'>
              <ViewListRounded fontSize='large' />
              My Lists
            </li> */}
            <li className='w-full px-2 py-2 flex items-center gap-1 font-semibold uppercase hover:bg-rose hover:text-white transition-all ease-in-out duration-300'>
              <button
                onClick={() => {
                  setAuthShown(false);
                  setIsLoggedIn(false);
                }}
              >
                <Logout fontSize='large' />
                Signout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default AuthDropdown;
