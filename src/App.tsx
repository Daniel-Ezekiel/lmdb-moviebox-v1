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

const queryClient: QueryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/tv/:id",
    element: <TVShow />,
  },
  {
    path: "/person/:id",
    element: <Person />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

