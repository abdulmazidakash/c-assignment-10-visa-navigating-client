
import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const UpdateVisa = () => {
  const { user } = useContext(AuthContext); 
  const data = useLoaderData(); 
  const {
    id,
    country_name,
    country_image,
    visa_type,
    processing_time,
    required_documents,
    description,
    age_restriction,
    fee,
    validity,
    application_method,
    email,
  } = data;

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [formData, setFormData] = useState({
    email: email,
    firstName: "",
    lastName: "",
    appliedDate: new Date().toISOString().split("T")[0], 
    fee: fee,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const visaData = {
      country: country_name,
      country_image: country_image,
      visa_type: visa_type,
      processing_time: processing_time,
      fee: fee,
      validity: validity,
      application_method: application_method,
      applied_date: formData.appliedDate,
      applicant_name: fullName,
      email: user.email, 
    };

    try {
      
      const response = await fetch("http://localhost:5000/applyVisa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visaData),
      });
      const result = await response.json();
      console.log(result);

      if (result.status === "ok") {
        Swal.fire({
          title: "Success!",
          text: "Your visa application has been submitted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setFormData({
          firstName: "",
          lastName: "",
          appliedDate: new Date().toISOString().split("T")[0],
          fee: fee,
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "There was an error submitting your application. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error submitting your application. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="card w-full max-w-md bg-white shadow-xl">
        <figure>
          <img src={country_image} alt={country_name} className="w-full h-auto" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl md:text-2xl">{country_name}</h2>
          <p className="text-gray-700 text-sm md:text-base">{description}</p>
          <div className="badge badge-primary">{visa_type}</div>
          <div className="badge badge-secondary">Processing Time: {processing_time}</div>
          <div className="badge badge-accent">Fee: ${fee}</div>
          <div className="badge badge-info">Validity: {validity}</div>
          <div className="badge badge-warning">Age Restriction: {age_restriction}+ </div>
          <div className="badge badge-success">Application Method: {application_method}</div>
          <div className="mt-4">
            <h3 className="font-bold text-sm md:text-base">Required Documents:</h3>
            <ul className="list-disc list-inside text-sm md:text-base">
              {required_documents && Array.isArray(required_documents) && required_documents.length > 0
                ? required_documents.map((doc, index) => <li key={index}>{doc}</li>)
                : "No documents available"}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-sm md:text-base">Contact:</h3>
            <p className="text-sm md:text-base">{email}</p>
          </div>
          <button className="btn btn-primary mt-4" onClick={() => setIsModalOpen(true)}>
            Apply for the visa
          </button>
        </div>
      </div>

      {/* Modal for applying */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Apply for the Visa</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user?.email}
                  readOnly
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Applied Date</label>
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  readOnly
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Fee</label>
                <input
                  type="text"
                  name="fee"
                  value={formData.fee}
                  readOnly
                  className="input input-bordered"
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Apply
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateVisa;


