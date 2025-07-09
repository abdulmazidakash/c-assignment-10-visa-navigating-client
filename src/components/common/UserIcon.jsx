import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { AuthContext } from "../../providers/AuthProvider";
import { RiLogoutCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const UserIcon = ({ user }) => {
  const { signOutUser } = useContext(AuthContext);

  return (
    <div className="flex-row flex gap-3 items-center justify-around">
      <div className="flex flex-row justify-center items-center gap-1">
        <p title="logout" onClick={signOutUser} className="text-white text-lg font-bold mr-2 hover:border-white shadow p-2 rounded-lg hover:border-2"><RiLogoutCircleFill /></p>
        <div className="avatar online">
          <Link to={'/profilePage'} className="w-10 rounded-full border-2 border-white shadow">
            <img
            className="rounded-full"
              src={user?.photoURL || "default-avatar.png"}
              alt={`${user?.displayName || "User"}'s avatar`}
              data-tooltip-id="user-tooltip"
              data-tooltip-content={user?.displayName || "Anonymous"}
            />
            <Tooltip id="user-tooltip" place="top" offset={10} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserIcon;
