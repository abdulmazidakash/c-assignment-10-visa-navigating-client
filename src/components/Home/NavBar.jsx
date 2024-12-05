import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import UserIcon from "../common/UserIcon";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  const items = [
    <li key="home" className="text-black font-roboto font-medium">
      <Link to="/">Home</Link>
    </li>,
    <li key="allvisas" className="text-black font-roboto font-medium">
      <Link to="/allvisas">All Visas</Link>
    </li>,
    <li key="addVisa" className="text-black font-roboto font-medium">
      <Link to="/addVisa">Add Visa</Link>
    </li>,
    <li key="myAddedVisa" className="text-black font-roboto font-medium">
      <Link to="/myAddedVisa">My Added Visa</Link>
    </li>,
    <li key="myVisaApplication" className="text-black font-roboto font-medium">
      <Link to="/myVisaApplication">My Visa Application</Link>
    </li>,
    <li key="profilePage" className="text-black font-roboto font-medium">
      <Link to="/profilePage">Profile</Link>
    </li>,
  ];
  return (
    <div>
      <div className="navbar bg-base-100 shadow p-3">
        <div className="navbar-start">
          <div className="dropdown">
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
          <a className="btn btn-ghost text-xl">VisaEase</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{items}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <Link to="/profilePage">
              <UserIcon user={user} />
            </Link>
          ) : (
            <Link to="/authPage" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
