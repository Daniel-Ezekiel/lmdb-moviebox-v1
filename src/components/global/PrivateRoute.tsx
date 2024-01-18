import { ReactNode, useEffect } from "react";
import { auth } from "../../../config/firebase";
import { Auth } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const authState = (auth as Auth).currentUser;

  useEffect(() => {
    if (
      authState &&
      (location.pathname === "/sign-in" || location.pathname === "/sign-up")
    ) {
      navigate("/");
    } else if (authState === null && location.pathname === "/favourites") {
      navigate("/");
    }
  }, [authState]);

  return children;
};

export default PrivateRoute;
