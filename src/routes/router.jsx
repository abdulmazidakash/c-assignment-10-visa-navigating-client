import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import PageNotFound from "../components/utils/PageNotFound.jsx";
import MyProfile from "../pages/MyProfile.jsx";
import PrivateProvider from "../providers/PrivateProvider.jsx";
import AddVisa from "../pages/AddVisa.jsx";
import MyAddedVisas from "../pages/MyAddedVisas.jsx";
import MyVisaApplications from "../pages/MyVisaApplications.jsx";
import AllVisas from "../pages/AllVisas.jsx";
import VisaDetails from "../pages/VisaDetails.jsx";
import Login from "../components/Auth/login/Login.jsx";
import Register from "../components/Auth/register/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/",element: <Home />},
      { path: "/allvisas", element: <AllVisas />},
      
      { path: "/visa-details/:id",element: <PrivateProvider><VisaDetails/></PrivateProvider>,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://assignment-10-visa-server.vercel.app/visas/id/${params.id}`
          );
          return response.json();
        },
      },

      // authentication page 
      { path: "/login", element: <Login/>},
      { path: "/register", element: <Register/>},
      { path: "/profilePage", element: (<PrivateProvider><MyProfile /></PrivateProvider>)},
      { path: "addVisa", element: (<PrivateProvider><AddVisa /></PrivateProvider>)},
      { path: "myAddedVisa", element: (<PrivateProvider><MyAddedVisas /></PrivateProvider>)},
      
      { path: "updateVisa/:id", element: <VisaDetails/>,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://assignment-10-visa-server.vercel.app/visas/id/${params.id}`
          );
          return response.json();
        },
      },
      { path: "/myVisaApplication", element: (<PrivateProvider><MyVisaApplications /></PrivateProvider>)},
      { path: "*", element: <PageNotFound />},
    ],
  },
]);

export default router;