import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import UserIcon from "../common/UserIcon";
import { FaSun, FaMoon } from "react-icons/fa";

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
      <div className="navbar bg-gradient-to-t from-cyan-600 to-purple-700 shadow p-3">
        <div className="block md:hidden ">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[999] mt-3 w-52 p-2 shadow">
              {items}
            </ul>
          </div>
        </div>
        <div className="navbar-start text-white text-2xl">
          <Link to="/" className="btn btn-ghost  text-white">
            GlobalVisaHub
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{items}</ul>
        </div>
        <div className="navbar-end">
          <button onClick={toggleTheme} className="btn btn-ghost rounded-full text-white">
            {theme === "dark" ? <FaSun className="text-white" /> : <FaMoon className="text-white" />}
          </button>
          {user ? (
            <button onClick={signOutUser} className="btn btn-ghost text-white">
              <UserIcon user={user} />
            </button>
          ) : (
            <Link to="/authPage" className="btn text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;