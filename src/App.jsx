import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Signin from "./Pages/Auth/Signin";
import ResetPassword from "./Pages/Auth/ResetPassword";
import NewPassword from "./Pages/Auth/NewPassword";
import SendResetLink from "./Pages/Auth/SendResetLink";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Components/Dashboard/Dashboard";
import Users from "./Components/Users/Users";
import Sellers from "./Components/Sellers/Sellers";
import PropertyList from "./Components/PropertyList/PropertyList";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import AccountSetting from "./Components/AccountSetting/AccountSetting.jsx";
import AddProperty from "./Pages/AddProperty/AddProperty.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: () => redirect("/admin/dashboard"),
    },
    {
      path: "/admin/sign-in",
      element: <Signin />,
    },
    {
      path: "/admin/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/admin/reset-password/send-link",
      element: <SendResetLink />,
    },
    {
      path: "/admin/new-password",
      element: <NewPassword />,
    },
    {
      path: "/admin",
      element: <Dashboard />,
      children: [
        {
          index: true,
          loader: () => redirect("/admin/dashboard"),
        },
        {
          path: "dashboard",
          element: <DashboardHome />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "sellers",
          element: <Sellers />,
        },
        {
          path: "properties",
          element: <PropertyList />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          path: "account-setting",
          element: <AccountSetting />,
        },
      ],
    },
    {
      path: "/add-property",
      element: <AddProperty />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
