
import { useContext, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const MyVisaApplications = () => {
  const [applications, setApplications] = useState([]); 
  const [filteredApplications, setFilteredApplications] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const { user } = useContext(AuthContext);
  const userEmail = user?.email || "";

  // Fetch user's visa applications
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

  // Delete Visa Function
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

  // Search Filter Logic
  const handleSearch = () => {
    const filtered = applications.filter((app) =>
      app.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplications(filtered);
  };

  return (
    <div className="container mx-auto my-8">
      {/* Title */}
      <h1 className="text-3xl font-bold my-5 text-center text-orange-500">My Visa Applications</h1>

      {/* Search Bar */}
      <div className="flex mb-6 gap-2">
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

      {/* Visa Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app) => (
            <div key={app._id} className="card shadow-lg compact bg-base-100">
              <figure>
                <img
                  src={app.country_image}
                  alt={app.country}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{app.country}</h2>
                <div className="badge badge-primary mb-2">{app.visa_type}</div>
                <p>Processing Time: {app.processing_time} days</p>
                <p>Fee: ${app.fee}</p>
                <p>Validity: {app.validity} days</p>
                <p>Application Method: {app.application_method}</p>
                <p>
                  Applied Date: {new Date(app.appliedDate).toLocaleDateString()}
                </p>
                <p>Applicant's Name: {user.displayName}</p>
                <p>Applicant’s Email: {app.email}</p>
                <div className="badge badge-info mb-2">
                  Status: {app.application_method}
                </div>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(app._id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default MyVisaApplications;

