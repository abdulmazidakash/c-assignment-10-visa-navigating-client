import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/MainLayout";
import MainLayout from "../pages/MainLayout";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Profile from "../components/Auth/Profile";
import PageNotFound from "../components/utils/PageNotFound";
import MyProfile from "../pages/MyProfile";
import PrivateProvider from "../providers/PrivateProvider";
import AddVisa from "../pages/AddVisa";
import MyAddedVisas from "../pages/MyAddedVisas.jsx";
import MyVisaApplications from "../pages/MyVisaApplications.jsx";
import AllVisas from "../pages/AllVisas.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allvisas",
        element: <AllVisas />,
      },
      {
        path: "/visa-details/:country",
        element: <div>Visa details</div>,
      },
      {
        path: "/authPage",
        element: <LoginPage />,
      },
      {
        path: "/profilePage",
        element: (
          <PrivateProvider>
            <MyProfile />
          </PrivateProvider>
        ),
      },
      {
        path: "/addVisa",
        element: (
          <PrivateProvider>
            <AddVisa />
          </PrivateProvider>
        ),
      },
      {
        path: "/myAddedVisa",
        element: (
          <PrivateProvider>
            <MyAddedVisas />
          </PrivateProvider>
        ),
      },
      {
        path: "/myVisaApplication",
        element: (
          <PrivateProvider>
            <MyVisaApplications />
          </PrivateProvider>
        ),
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
