import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import UserIcon from "../common/UserIcon";
import { FaSun, FaMoon } from "react-icons/fa";
import { FaPassport } from "react-icons/fa6";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const items = [
    <li
      key="home"
      className={` font-medium ${
        theme === "dark" ? "text-white" : "text-white"
      }`}>
      <Link to="/">Home</Link>
    </li>,
    <li
      key="allvisas"
      className={` font-medium ${
        theme === "dark" ? "text-white" : "text-white"
      }`}>
      <Link to="/allvisas">All Visas</Link>
    </li>,

    <li
      key="addVisa"
      className={` font-medium ${
        theme === "dark" ? "text-white" : "text-white"
      }`}>
      <Link to="/addVisa">Add Visa</Link>
    </li>,
    <li
      key="myAddedVisa"
      className={` font-medium ${
        theme === "dark" ? "text-white" : "text-white"
      }`}>
      <Link to="/myAddedVisa">My Added Visa</Link>
    </li>,
    <li
      key="myVisaApplication"
      className={` font-medium ${
        theme === "dark" ? "text-white" : "text-white"
      }`}>
      <Link to="/myVisaApplication">My Visa Application</Link>
    </li>,
    user && (
      <li
        key="profilePage"
        className={` font-medium ${
          theme === "dark" ? "text-white" : "text-white"
        }`}>
        <Link to="/profilePage">Profile</Link>
      </li>
    ),
  ];

  return (
    <div>
      <div className="navbar bg-bgPrimary shadow p-3">
        {/* small device navbar  */}
        <div className="block md:hidden">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-bgPrimary rounded-box z-[999] mt-3 w-52 p-2 shadow">
              {items}
            </ul>
          </div>
        </div>

        {/* large device navbar  */}
        <div className="navbar-start text-white md:block hidden">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2   text-white">
           <FaPassport className="text-2xl" />
           GlobalVisaHub
          </Link>
        </div>
        {/* navbar center menu div  */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{items}</ul>
        </div>
        {/* navbar end div  */}
        <div className="navbar-end">
          <button onClick={toggleTheme} className="btn btn-ghost rounded-full text-white">
            {theme === "dark" ? <FaSun className="text-white" /> : <FaMoon className="text-white" />}
          </button>
          {user ? (
            <button onClick={signOutUser} className="btn btn-ghost text-white">
              <UserIcon user={user} />
            </button>
          ) : (
            <Link to="/login" className="btn text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;