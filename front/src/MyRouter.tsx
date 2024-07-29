import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyPaths from "./MyPaths";
import Layout from "./layouts/layout";
import Accueil from "./pages/Accueil";
import Planning from "./pages/Planning";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: MyPaths.ACCUEIL,
    element: (
      <Layout>
        <Accueil />
      </Layout>
    ),
  },
  {
    path: MyPaths.PLANNING,
    element: (
      <Layout>
        <Planning />
      </Layout>
    ),
  },
  {
    path: MyPaths.LOGIN,
    element: <Login />,
  },
]);

function MyRouter() {
  return <RouterProvider router={router} />;
}

export default MyRouter;
