import { useContext } from "react";
import { LoggedInContext } from "../../../context/LoginContext";
import {
  FavoriteBorderRounded,
  Logout,
  //   ViewListRounded,
} from "@mui/icons-material";

const AuthDropdown = () => {
  const isLoggedIn: boolean = useContext(LoggedInContext);

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      {isLoggedIn && (
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
              <Logout fontSize='large' />
              Signout
            </li>
          </ul>
        </div>
      )}
    </LoggedInContext.Provider>
  );
};

export default AuthDropdown;
