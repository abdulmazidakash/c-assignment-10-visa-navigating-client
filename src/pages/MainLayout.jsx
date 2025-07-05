import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
const MainLayout = () => {
  return (
    <div>
      <div className="">
        <NavBar />
        <Outlet />
        <Footer/>
      </div>
    </div>
  );
};

export default MainLayout;