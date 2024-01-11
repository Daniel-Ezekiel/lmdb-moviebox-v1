import { useContext } from "react";
import { SavedContext } from "../../../context/SaveContext";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { ModalToggleContext } from "../../../context/AuthModalContext";
import { AuthContext } from "../../../context/AuthContext";

interface FavButtonProps {
  id: number;
  type: string;
  poster_path: string;
  name?: string;
}

const FavButton = ({ id, poster_path, name }: FavButtonProps) => {
  const { isLoggedIn }: { isLoggedIn?: boolean } = useContext(AuthContext);
  const isSaved = useContext(SavedContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setShowModal }: { setShowModal?: any } =
    useContext(ModalToggleContext);
  function toggleModal() {
    if (!isLoggedIn) setShowModal(true);
  }

  console.log(id, poster_path, name, isSaved);
  return (
    <SavedContext.Provider value={isSaved}>
      <button onClick={toggleModal}>
        {isSaved ? (
          <FavoriteOutlined fontSize='large' sx={{ color: "#be123c" }} />
        ) : (
          <FavoriteBorderOutlined fontSize='large' sx={{ color: "#be123c" }} />
        )}
      </button>
    </SavedContext.Provider>
  );
};

export default FavButton;
