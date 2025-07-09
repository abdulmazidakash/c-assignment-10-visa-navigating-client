import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { FaTrashAlt } from "react-icons/fa";
const MyVisaApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);
  const userEmail = user?.email || "";

  // Optional local color functions (if not using utility file)
  const getBadgeColor = (type) => {
    switch (type.toLowerCase()) {
      case "tourist visa":
        return "badge-success";
      case "student visa":
        return "badge-info";
      case "official visa":
        return "badge-warning";
      case "business visa":
        return "badge-primary";
      default:
        return "badge-ghost";
    }
  };

  const getAppMethodColor = (method) => {
    if (method.toLowerCase() === "online") return "badge-accent";
    if (method.toLowerCase() === "offline") return "badge-neutral";
    return "badge-outline";
  };

  useEffect(() => {
    if (userEmail) {
      fetch(`https://assignment-10-visa-server.vercel.app/visas/apply/email/${userEmail}`)
        .then((response) => response.json())
        .then((data) => {
          setApplications(data);
          setFilteredApplications(data);
        })
        .catch((error) => console.error("Error fetching visa applications:", error));
    }
  }, [userEmail]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-10-visa-server.vercel.app/deleteVisa/${_id}?email=${user.email}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              Swal.fire("Deleted!", "Your visa has been deleted.", "success");
              const remaining = applications.filter((app) => app._id !== _id);
              setApplications(remaining);
              setFilteredApplications(remaining);
            } else {
              Swal.fire("Error!", data.message, "error");
            }
          })
          .catch((error) => console.error("Error deleting visa:", error));
      }
    });
  };

  const handleSearch = () => {
    const filtered = applications.filter((app) =>
      app.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplications(filtered);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">My Visa Applications</h1>

      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by country name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn !bg-orange-500 !text-white" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 bg-orange-50 rounded-lg">
        <table className="table w-full">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Country</th>
              <th>User</th>
              <th>Visa Type</th>
              <th>Processing Time</th>
              <th>Fee</th>
              <th>Validity</th>
              <th>Method</th>
              <th>Applied Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app, index) => (
                <tr key={app._id} className="hover:bg-orange-100">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={app.country_image}
                      alt={app.country}
                      className="w-10 h-10 object-cover rounded-lg border border-gray-400"
                    />
                  </td>
                  <td>{app.country}</td>
                  <td>
                    <div className="text-sm">{user.displayName}</div>
                    <div className="text-xs text-gray-500">{app.email}</div>
                  </td>
                  {/* Visa Type Badge */}
                  <td>
                    <span className={`badge ${getBadgeColor(app.visa_type)} capitalize`}>
                      {app.visa_type}
                    </span>
                  </td>
                  <td>{app.processing_time} days</td>
                  <td>${app.fee}</td>
                  <td>{app.validity} days</td>
                  {/* <td>{app.application_method}</td> */}
                  {/* Application Method Badge */}
                  <td>
                    <span className={`badge ${getAppMethodColor(app.application_method)} capitalize`}>
                      {app.application_method}
                    </span>
                  </td>
                  <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                  
                  <td>
                    <button
                      className="btn btn-sm btn-error !text-white"
                      onClick={() => handleDelete(app._id)}
                    >
                    <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center py-6 text-gray-500">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyVisaApplications;
