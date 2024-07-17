import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyPaths from "./MyPaths";
import Layout from "./layouts/layout";
import Accueil from "./pages/Accueil";

const router = createBrowserRouter([
  {
    path: MyPaths.ACCUEIL,
    element: (
      <Layout>
        <Accueil />
      </Layout>
    ),
  },
]);

function MyRouter() {
  return <RouterProvider router={router} />;
}

export default MyRouter;
