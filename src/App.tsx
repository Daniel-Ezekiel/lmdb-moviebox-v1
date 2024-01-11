import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import People from "./pages/People";
import TVShow from "./pages/TVShow";
import Person from "./pages/Person";
import CastAndCrew from "./pages/CastAndCrew";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { AuthContext } from "../context/AuthContext";
import { ModalToggleContext } from "../context/AuthModalContext";
import { useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebase";

const queryClient: QueryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/search/:keywordWithQuery",
    element: <Search />,
  },
  {
    path: "/movies/:category",
    element: <Movies />,
  },
  {
    path: "/tv-shows/:category",
    element: <TVShows />,
  },
  {
    path: "/people",
    element: <People />,
  },
  {
    path: "/movie/:id",
    element: <Movie />,
  },
  {
    path: "/movie/:id/cast-and-crew",
    element: <CastAndCrew type='movie' />,
  },
  {
    path: "/tv/:id",
    element: <TVShow />,
  },
  {
    path: "/tv/:id/cast-and-crew",
    element: <CastAndCrew type='tv' />,
  },
  {
    path: "/person/:id",
    element: <Person />,
  },
]);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [isSaved, setIsSa] = useState<boolean>(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      setCurrentUser(user);
      // ...
      console.log(currentUser);
    }
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser }}>
      <ModalToggleContext.Provider value={{ showModal, setShowModal }}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ModalToggleContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

