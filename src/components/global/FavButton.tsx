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
import { MovieProps, TVProps } from "../../../@types";

interface FavButtonProps {
  id: number;
  type: string;
  poster_path: string;
  name?: string;
  date?: string | null;
  rating?: number | null;
  known_for?: MovieProps[] | TVProps[] | null;
}

interface FavProps {
  id: number;
  type: string;
}

const FavButton = ({
  id,
  type,
  poster_path,
  name,
  date,
  rating,
  known_for,
}: FavButtonProps) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<[]>([]);
  const { currentUser }: { currentUser?: User } = useContext(AuthContext);

  const { isLoggedIn }: { isLoggedIn?: boolean } = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setShowModal }: { setShowModal?: any } =
    useContext(ModalToggleContext);

  const addToFavourites = async () => {
    if (!isLoggedIn) setShowModal(true);

    const favRef = doc(db, "users", (currentUser as User).uid);
    try {
      setIsLoading(true);
      if (isLoggedIn && !isSaved && currentUser?.uid) {
        type === "person"
          ? await updateDoc(favRef, {
              favourites: arrayUnion({
                id,
                type,
                profile_path: poster_path,
                original_name: name,
                date,
                known_for,
              }),
            })
          : type === "movie"
          ? await updateDoc(favRef, {
              favourites: arrayUnion({
                id,
                type,
                poster_path: poster_path,
                name: name,
                release_date: date,
                vote_average: rating,
              }),
            })
          : await updateDoc(favRef, {
              favourites: arrayUnion({
                id,
                type,
                poster_path: poster_path,
                name: name,
                first_air_date: date,
                vote_average: rating,
              }),
            });

        setIsSaved(!isSaved);
      } else if (
        isLoggedIn &&
        isSaved &&
        favourites.filter((fav) => (fav as FavProps).id == id).length
      ) {
        type === "person"
          ? await updateDoc(favRef, {
              favourites: arrayRemove({
                id,
                type,
                profile_path: poster_path,
                original_name: name,
                date,
                known_for,
              }),
            })
          : type === "movie"
          ? await updateDoc(favRef, {
              favourites: arrayRemove({
                id,
                type,
                poster_path: poster_path,
                name: name,
                release_date: date,
                vote_average: rating,
              }),
            })
          : await updateDoc(favRef, {
              favourites: arrayRemove({
                id,
                type,
                poster_path: poster_path,
                name: name,
                first_air_date: date,
                vote_average: rating,
              }),
            });

        setIsSaved(!isSaved);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getFavData = async () => {
      if (isLoggedIn && currentUser !== null) {
        const favRef = doc(db, "users", currentUser!.uid);
        const favSnap = await getDoc(favRef);

        try {
          if (favSnap.exists()) {
            const res = favSnap.data();
            setFavourites(res?.favourites);

            if (
              res?.favourites.filter((fav: { id: number }) => fav.id == id)
                .length
            )
              setIsSaved(true);
          } else {
            // favSnap.data() will be undefined in this case
            console.log("No such document!");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getFavData();
  }, [currentUser, isSaved, id]);
  return (
    <SavedContext.Provider value={isSaved}>
      <button
        onClick={addToFavourites}
        className='w-4 h-4 flex justify-center items-center'
        title='Add to favourites'
      >
        {isLoading ? (
          <ClipLoader
            color='#be123c'
            cssOverride={{ width: "15px", height: "15px" }}
          />
        ) : isSaved && currentUser && !isLoading ? (
          <FavoriteOutlined fontSize='large' sx={{ color: "#be123c" }} />
        ) : (
          <FavoriteBorderOutlined fontSize='large' sx={{ color: "#be123c" }} />
        )}
      </button>
    </SavedContext.Provider>
  );
};

export default FavButton;
