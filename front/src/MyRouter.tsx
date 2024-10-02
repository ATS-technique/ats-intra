import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyPaths from "./MyPaths";
import Layout from "./layouts/layout";
import Accueil from "./pages/Accueil";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import PlanningAtelier from "./pages/PlanningAtelier";
import PlanningPose from "./pages/PlanningPose";

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
    path: MyPaths.PLANNING_ATELIER,
    element: (
      <PrivateRoute>
        <Layout>
          <PlanningAtelier />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: MyPaths.PLANNING_POSE,
    element: (
      <PrivateRoute>
        <Layout>
          <PlanningPose />
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
]);

function MyRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default MyRouter;
