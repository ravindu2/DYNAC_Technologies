import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage.tsx";
import Dashboard from "./pages/Dashboard";
import MemberList from "./pages/MemberList";
import TrainerList from "./pages/TrainerList";
import PlansClasses from "./pages/PlansClasses.tsx";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return isAuthenticated ? children : <Navigate to="/" />;
};

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "member",
        element: <MemberList />,
      },
      {
        path: "trainer",
        element: <TrainerList />,
      },
      {
        path: "PlansClasses",
        element: <PlansClasses />,
      },
    ],
  },
]);

export default routers;
