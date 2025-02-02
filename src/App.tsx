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
import PropertyList from "./Components/PropertyList/PropertyList";
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails.tsx";
import AdminChangePassword from "./Components/ChangePassword/ChangePassword";
import AddProperty from "./Pages/AddProperty/AddProperty";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import CreateUser from "./Components/Users/CreateUser.tsx";
import AdminPrivacyPolicy from "./Components/AccountSettings/AdminPrivacyPolicy.tsx";
import AdminTermsAndConditions from "./Components/AccountSettings/AdminTermsAndConditions.tsx";
import AdminRefundPolicy from "./Components/AccountSettings/AdminRefundPolicy.tsx";
import AdminAboutSettings from "./Components/AccountSettings/AdminAboutSettings.tsx";
import "flatpickr/dist/themes/material_green.css";
import InvoiceList from "./Components/Invoice/InvoiceList.tsx";
import FurnishingInvoiceDetails from "./Components/Invoice/FurnishingInvoiceDetails.tsx";
import Invoice from "./Components/Invoice/Invoice.tsx";
import FurnishingInvoiceEdit from "./Components/Invoice/FurnishingInvoiceEdit.tsx";
import FurnishingPdfViewr from "./Components/Invoice/FurnishingPdfViewr.tsx";
import MontlyRevenuePdfViewr from "./Components/Invoice/MontlyRevenuePdfViewr.tsx";
import MaintenanceInvoiceDetails from "./Components/Invoice/MaintenanceForm/MaintenanceInvoiceDetails.tsx";
import MaintenancePdfViewer from "./Components/Invoice/MaintenanceForm/MaintenancePdfViewer.tsx";
import MaintenanceFormEdit from "./Components/Invoice/MaintenanceForm/MaintenanceFormEdit.tsx";
import Faq from "./Components/faq/Faq.tsx";
import SupportQuerry from "./Components/SupportQuerry/SupportQuerry.tsx";
import Profile from "./Components/Profile/Profile.tsx";
import SupportChat from "./Components/SupportChat/SupportChat.tsx";
import DETLicenseForm from "./Components/DETLicenseForm/DETLicenseForm.tsx";
import DETLicenseList from "./Components/DETLicenseForm/DETLicenseList.tsx";
import DETLicenseDetail from "./Components/DETLicenseForm/DETLicenseDetail.tsx";
import BookingList from "./Components/BookingList/BookingList.tsx";

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
          path: "properties",
          element: (
            <ProtectedRoute roles={["Admin"]}>
              <PropertyList />
            </ProtectedRoute>
          ),
        },
        {
          path: "booking-list/:property",
          element: (
            <ProtectedRoute roles={["Admin"]}>
              <BookingList />
            </ProtectedRoute>
          ),
        },
        {
          path: "property-details/:id",
          element: (
            <ProtectedRoute roles={["Admin"]}>
              <PropertyDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "change-password",
          element: (
            <ProtectedRoute roles={["Admin"]}>
              <AdminChangePassword />
            </ProtectedRoute>
          ),
        },
        {
          path: "invoice/create",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <Invoice />
            </ProtectedRoute>
          ),
        },
        {
          path: "invoice/furnishing-details/:id",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <FurnishingInvoiceDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "invoice/furnishing-details/:id/edit",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <FurnishingInvoiceEdit />
            </ProtectedRoute>
          ),
        },

        {
          path: "invoice/maintenance-details/:id",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <MaintenanceInvoiceDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "invoice/maintenance-details/:id/edit",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <MaintenanceFormEdit />
            </ProtectedRoute>
          ),
        },
        {
          path: "invoices",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <InvoiceList />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "setting/privacy-policy",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <AdminPrivacyPolicy />
            </ProtectedRoute>
          ),
        },
        {
          path: "setting/terms-and-conditions",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <AdminTermsAndConditions />
            </ProtectedRoute>
          ),
        },
        {
          path: "setting/refund-policy",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <AdminRefundPolicy />
            </ProtectedRoute>
          ),
        },
        {
          path: "setting/about-us",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <AdminAboutSettings />
            </ProtectedRoute>
          ),
        },
        {
          path: "setting/faq",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <Faq />
            </ProtectedRoute>
          ),
        },
        {
          path: "support",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <SupportQuerry />
            </ProtectedRoute>
          ),
        },
        {
          path: "create-license",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <DETLicenseForm />
            </ProtectedRoute>
          ),
        },
        {
          path: "edit-license/:id",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <DETLicenseForm />
            </ProtectedRoute>
          ),
        },
        {
          path: "view-license/:id",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <DETLicenseDetail />
            </ProtectedRoute>
          ),
        },
        {
          path: "license-list",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <DETLicenseList />
            </ProtectedRoute>
          ),
        },
        {
          path: "support/chat",
          element: (
            <ProtectedRoute roles={["Admin", "Owner"]}>
              <SupportChat />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "invoice/furnishing-pdf-view/:id",
      element: (
        <ProtectedRoute roles={["Admin", "Owner"]}>
          <FurnishingPdfViewr />
        </ProtectedRoute>
      ),
    },
    {
      path: "invoice/maintenance-pdf-view/:id",
      element: (
        <ProtectedRoute roles={["Admin", "Owner"]}>
          <MaintenancePdfViewer />
        </ProtectedRoute>
      ),
    },
    {
      path: "invoice/monthly-revenue-pdf-view/:id",
      element: (
        <ProtectedRoute roles={["Admin", "Owner"]}>
          <MontlyRevenuePdfViewr />
        </ProtectedRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
