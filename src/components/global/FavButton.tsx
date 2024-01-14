import { useContext, useEffect, useState } from "react";
import { SavedContext } from "../../../context/SaveContext";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { ModalToggleContext } from "../../../context/AuthModalContext";
import { AuthContext } from "../../../context/AuthContext";
import { User } from "firebase/auth";
import { db } from "../../../config/firebase";
import { ClipLoader } from "react-spinners";

interface FavButtonProps {
  id: number;
  type: string;
  poster_path: string;
  name?: string;
}

const FavButton = ({ id, poster_path, name }: FavButtonProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<[]>([]);
  const { currentUser }: { currentUser?: User } = useContext(AuthContext);
  // console.log(currentUser);

  const { isLoggedIn }: { isLoggedIn?: boolean } = useContext(AuthContext);
  // const isSaved = useContext(SavedContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setShowModal }: { setShowModal?: any } =
    useContext(ModalToggleContext);

  const addToFavourites = async () => {
    if (!isLoggedIn) setShowModal(true);
    if (isLoggedIn) setIsSaved(!isSaved);

    const favRef = doc(db, "users", (currentUser as User).uid);
    try {
      if (isLoggedIn && !isSaved && currentUser?.uid) {
        setIsLoading(true);

        await updateDoc(favRef, {
          favourites: arrayUnion(id),
        });
      } else if (isLoggedIn && isSaved && favourites.includes(id as never)) {
        console.log(favourites.includes(id as never));
        await updateDoc(favRef, {
          favourites: arrayRemove(id),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getFavData = async () => {
      const favRef = doc(db, "users", currentUser!.uid);
      const favSnap = await getDoc(favRef);

      try {
        if (favSnap.exists()) {
          const res = favSnap.data();
          setFavourites(res?.favourites);

          if (res?.favourites.includes(id)) setIsSaved(true);
        } else {
          // favSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFavData();
  }, [currentUser, isSaved]);
  // console.log(id, poster_path, name, isSaved);
  return (
    <SavedContext.Provider value={isSaved}>
      <div className='hidden'>{`${id + poster_path + name}`}</div>
      <button
        onClick={addToFavourites}
        className='w-4 h-4 flex justify-center items-center'
      >
        {isLoading ? (
          <ClipLoader
            color='#be123c'
            cssOverride={{ width: "15px", height: "15px" }}
          />
        ) : isSaved && !isLoading ? (
          <FavoriteOutlined fontSize='large' sx={{ color: "#be123c" }} />
        ) : (
          <FavoriteBorderOutlined fontSize='large' sx={{ color: "#be123c" }} />
        )}
      </button>
    </SavedContext.Provider>
  );
};

export default FavButton;
