import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import PageTemplate from "../templates/PageTemplate";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageTemplate />,
    children: routes,
    errorElement: <NotFoundPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
