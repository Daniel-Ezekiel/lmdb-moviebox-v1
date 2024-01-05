import { useContext } from "react";
import { SavedContext } from "../../../context/SaveContext";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";

interface FavButtonProps {
  id: number;
  type: string;
  poster_path: string;
  name?: string;
}

const FavButton = ({ id, poster_path, name }: FavButtonProps) => {
  const isSaved = useContext(SavedContext);

  console.log(id, poster_path, name, isSaved);
  return (
    <SavedContext.Provider value={isSaved}>
      <button>
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
