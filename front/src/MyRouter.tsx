import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyPaths from "./MyPaths";
import Layout from "./layouts/layout";
import Accueil from "./pages/Accueil";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Clients from "./pages/Clients";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import PlanningAtelier from "./pages/Planning";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import ManageWebsite from "./pages/ManageWebsite";
import Products from "./pages/Products";

const router = createBrowserRouter([
  {
    path: MyPaths.REDIRECT,
    element: <Login />,
  },
  {
    path: MyPaths.DEFAULT,
    element: <Login />,
  },
  {
    path: MyPaths.ACCUEIL,
    element: (
      <PrivateRoute>
        <Layout>
          <Accueil />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: MyPaths.PLANNING,
    element: (
      <PrivateRoute>
        <Layout>
          <PlanningAtelier />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: MyPaths.LOGIN,
    element: <Login />,
  },
  {
    path: MyPaths.ADMIN,
    element: (
      <PrivateRoute>
        <Layout>
          <Admin />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: MyPaths.CLIENT,
    element: (
      <PrivateRoute>
        <Layout>
          <Clients />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: MyPaths.ORDERS,
    element: (
      <PrivateRoute>
        <Layout>
          <Orders />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: MyPaths.ORDER,
    element: (
      <PrivateRoute>
        <Layout>
          <Order />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: MyPaths.MANAGE_WEBSITE,
    element: (
      <PrivateRoute>
        <Layout>
          <ManageWebsite />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: MyPaths.PRODUCTS,
    element: (
      <PrivateRoute>
        <Layout>
          <Products />
        </Layout>
      </PrivateRoute>
    ),
  },
]);

function MyRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default MyRouter;
