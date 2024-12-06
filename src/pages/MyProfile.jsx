import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function MyProfile() {
  const { user, signOutUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto card flex flex-col items-center p-6  rounded-md">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold  text-center">
            Welcome, {user?.displayName || "User Name"}
          </h1>
        </div>
        {/* Responsive Layout */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-8">
          {/* Left Side: User Image */}
          <div className="mb-4 md:mb-0">
            <img
              src={user?.photoURL || "default-photo-url"}
              alt="User Photo"
              className="rounded-full shadow-md"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          {/* Right Side: User Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <h3 className="text-xl font-bold">
              {user?.displayName || "User Name"}
            </h3>
            <p className="text-gray-600">{user?.email || "user@example.com"}</p>
            <button
              onClick={signOutUser}
              className="btn btn-outline px-4 py-2 border-gray-500 text-gray-700 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}