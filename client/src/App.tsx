import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import MainPage from './pages/MainPage.tsx';
import Dashboard from './pages/Dashboard';
import MemberList from './pages/MemberList';
import TrainerList from "./pages/TrainerList";
import PlansClasses from "./pages/PlansClasses.tsx";



const isAuthenticated = !!localStorage.getItem("token");


const routers = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: (
     
        <MainPage />
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