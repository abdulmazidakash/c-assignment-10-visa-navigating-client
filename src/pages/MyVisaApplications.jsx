import { useContext, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const MyVisaApplications = () => {
  const [applications, setApplications] = useState([]);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email || "";
  console.log(applications);

  // Fetch user's visa applications when userEmail is available
  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:5000/visas/apply/email/${userEmail}`)
        .then((response) => response.json())
        .then((data) => setApplications(data))
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
        fetch(`http://localhost:5000/deleteVisa/${_id}?email=${user.email}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              Swal.fire("Deleted!", "Your visa has been deleted.", "success");
              const remaining = applications.filter((app) => app._id !== _id);
              setApplications(remaining);
            } else {
              Swal.fire("Error!", data.message, "error");
            }
          })
          .catch((error) => console.error("Error deleting visa:", error));
      }
    });
  };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Visa Applications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.length > 0 ? (
          applications.map((app) => (
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
                    onClick={()=> handleDelete(app._id)}
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
