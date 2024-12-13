import { createBrowserRouter } from "react-router-dom";
import UrlFormComponent from "../components/UrlFormComponent";
import Login from "../components/Login";
import Register from "../components/Register";
import UserActivity from "../components/UserActivity";

const route = createBrowserRouter([
  {
    path: "/",
    element: <UrlFormComponent />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/activity",
    element: <UserActivity />,
  },
]);

export default route;
