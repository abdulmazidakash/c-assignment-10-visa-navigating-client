import React, { useContext, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css";
import { AuthContext } from "../providers/AuthProvider";

const MyVisaApplications = () => {
  const [applications, setApplications] = useState([]);
  let userEmail = "f";
  const { user } = useContext(AuthContext);
  userEmail = user?.email;

  useEffect(() => {
    fetch(`https://backend-tau-vert-85.vercel.app/visas/email/${userEmail}`)
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) =>
        console.error("Error fetching visa applications:", error)
      );
  }, [userEmail]);

  const handleCancel = (id) => {
    fetch(`https://backend-tau-vert-85.vercel.app/visas/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => setApplications(applications.filter((app) => app._id !== id)))
      .catch((error) =>
        console.error("Error cancelling visa application:", error)
      );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Visa Applications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((app) => (
          <div key={app._id} className="card shadow-lg compact bg-base-100">
            <figure>
              <img
                src={app.country_image}
                alt={app.country_name}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{app.country_name}</h2>
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
                  onClick={() => handleCancel(app._id)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVisaApplications;