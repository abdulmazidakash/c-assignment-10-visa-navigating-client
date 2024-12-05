import React from "react";
import { FiLogOut } from "react-icons/fi";

const UserIcon = ({ user }) => {
  const firstName = user?.displayName?.split(" ")[0] || "Anonymous";
  return (
    <div className="flex-row flex gap-3 shadow-sm items-center justify-around">
      <button className="btn btn-ghost ">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img
              src={user?.photoURL || "default-avatar.png"}
              alt={`${user?.displayName || "User"}'s avatar`}
            />
          </div>
        </div>
        <p>Logout</p>
        {/* <FiLogOut className="w-10" /> */}
      </button>
    </div>
  );
};

export default UserIcon;
