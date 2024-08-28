import {
  LoginPage,
  SignupPage,
  MoviesPage,
  MovieViewPage,
  FavoritesPage,
} from "../pages";

export const routes = [
  {
    path: "/movies",
    element: <MoviesPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignupPage />,
  },
  {
    path: "/movie/:id",
    element: <MovieViewPage />,
  },
  {
    path: "/favorites",
    element: <FavoritesPage />,
  },
  {
    path: "/favorites/:id",
    element: <MovieViewPage />,
  },
];
