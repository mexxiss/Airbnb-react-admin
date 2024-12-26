import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Signin from "./Pages/Auth/Signin";
import ResetPassword from "./Pages/Auth/ResetPassword";
import SendResetLink from "./Pages/Auth/SendResetLink";
import NewPassword from "./Pages/Auth/NewPassword";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import DashboardHome from "./Components/Dashboard/Dashboard";
import Users from "./Components/Users/Users";
import UserDetails from "./Components/Users/UserDetails.tsx";
import Sellers from "./Components/Sellers/Sellers";
import PropertyList from "./Components/PropertyList/PropertyList";
import AdminChangePassword from "./Components/ChangePassword/ChangePassword";
import AdminAccountSetting from "./Components/AccountSetting/AccountSetting";
import AddProperty from "./Pages/AddProperty/AddProperty";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import CreateUser from "./Components/Users/CreateUser.tsx";

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
      element: (
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          loader: () => redirect("/admin/dashboard"),
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <DashboardHome />
            </ProtectedRoute>
          ),
        },
        {
          path: "users",
          element: (
            <ProtectedRoute roles={["Admin"]}>
              <Users />
            </ProtectedRoute>
          ),
        },
        {
          path: "user/:id",
          element: (
            <ProtectedRoute roles={["Admin"]}>
              <UserDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "user/new-user",
          element: (
            <ProtectedRoute roles={["Admin"]}>
              <CreateUser />
            </ProtectedRoute>
          ),
        },
        {
          path: "user/:id/add-property",
          element: (
            <ProtectedRoute roles={["Admin"]}>
              <AddProperty />
            </ProtectedRoute>
          ),
        },
        {
          path: "sellers",
          element: (
            <ProtectedRoute roles={["Admin"]}>
              <Sellers />,
            </ProtectedRoute>
          ),
        },
        {
          path: "properties",
          element: (
            <ProtectedRoute roles={["Admin"]}>
              <PropertyList />,
            </ProtectedRoute>
          ),
        },
        {
          path: "change-password",
          element: (
            <ProtectedRoute roles={["Admin"]}>
              <AdminChangePassword />,
            </ProtectedRoute>
          ),
        },
        {
          path: "account-setting",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <AdminAccountSetting />,
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
