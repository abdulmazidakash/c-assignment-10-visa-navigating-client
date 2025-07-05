import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const UserIcon = ({ user }) => {
  const firstName = user?.displayName?.split(" ")[0] || "Anonymous";

  return (
    <div className="flex-row flex gap-3 shadow-sm items-center justify-around">
      <div className="flex flex-row justify-center items-center gap-1">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img
              src={user?.photoURL || "default-avatar.png"}
              alt={`${user?.displayName || "User"}'s avatar`}
              data-tooltip-id="user-tooltip"
              data-tooltip-content={user?.displayName || "Anonymous"}
            />
            <Tooltip id="user-tooltip" place="top" offset={10} />
          </div>
        </div>
        <p className="text-white">Logout</p>
      </div>
    </div>
  );
};

export default UserIcon;
