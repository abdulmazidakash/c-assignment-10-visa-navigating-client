import React from "react";
import NavBar from "../components/Home/NavBar";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div>
      <div className="">
        <NavBar />

        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;