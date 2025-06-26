import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./store/store"; 
import { initializeAuth } from "./store/authSlice";
import MainLayout from "./Layouts/MainlayOut";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Dashboard from "./pages/Dashboard";
import Anime from "./pages/Anime";
import Favorites from "./pages/Favorites";
import MoviesDetails from "./pages/MovieDetails";
import AnimeDetails from "./pages/AnimeDetails";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Auth Wrapper Component to initialize Firebase auth
const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { isInitialized, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Show loading spinner while initializing auth
  if (!isInitialized || isLoading) {
    return <LoadingSpinner />;
  }

  return children;
};

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      // Public routes
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // Protected routes
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/movies",
        element: (
          <ProtectedRoute>
            <Movies />
          </ProtectedRoute>
        ),
      },
      {
        path: "/movies/:id",
        element: (
          <ProtectedRoute>
            <MoviesDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/anime",
        element: (
          <ProtectedRoute>
            <Anime />
          </ProtectedRoute>
        ),
      },
      {
        path: "/animes/:id",
        element: (
          <ProtectedRoute>
            <AnimeDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// Router Component that needs to be inside Provider
const AppRouter = () => {
  return (
    <AuthWrapper>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <RouterProvider router={route} />
      </div>
    </AuthWrapper>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;