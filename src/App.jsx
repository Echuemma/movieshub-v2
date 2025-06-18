import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store"; 
import MainLayout from "./Layouts/MainlayOut";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Dashboard from "./pages/Dashboard";
import Anime from "./pages/Anime";
import Favorites from "./pages/Favorites";
import MoviesDetails from "./pages/MovieDetails";
import AnimeDetails from "./pages/AnimeDetails";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

const App = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <h1>404 Not Found</h1>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
         {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/movies/:id",
          element: <MoviesDetails />,
        },
        {
          path: "/anime",
          element: <Anime />,
        },
        {
          path: "/animes/:id",
          element: <AnimeDetails />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
        {
          path: "/register",
          element: <Registration />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <RouterProvider router={route} />
      </div>
    </Provider>
  );
};

export default App;