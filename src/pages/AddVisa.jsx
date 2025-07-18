import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2"; // Ensure this import is correct

const AddVisa = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const [formData, setFormData] = useState({
    country_image: "",
    country_name: "",
    visa_type: "",
    processing_time: "",
    required_documents: [],
    description: "",
    age_restriction: "",
    fee: "",
    validity: "",
    application_method: "",
  });
 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        required_documents: checked
          ? [...prevData.required_documents, value]
          : prevData.required_documents.filter((doc) => doc !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add user email and appliedDate to the formData
    const dataToSubmit = {
      ...formData,
      email: user?.email || "No user email",
      appliedDate: new Date().toISOString(),
    };

    const jsonData = JSON.stringify(dataToSubmit, null, 2);
    // Send the JSON data to the server

    //send data to the server
    fetch("https://assignment-10-visa-server.vercel.app/addVisa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((res) => res.json())
      .then((data) => {
        // Clear the form
        setFormData({
          country_image: "",
          country_name: "",
          visa_type: "",
          processing_time: "",
          required_documents: [],
          description: "",
          age_restriction: "",
          fee: "",
          validity: "",
          application_method: "",
        });
        // Show Swal notification
        Swal.fire({
          title: "Success!",
          text: "Visa added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  

  return (
    <div className="w-11/12 mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">My Visa Applications</h1>
      <div className="card mx-auto w-full max-w-lg border border-gray-300 my-4 shadow-lg bg-orange-50 p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Country Image:
            </label>
            <input
              type="text"
              name="country_image"
              value={formData.country_image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Country Name:
            </label>
            <input
              type="text"
              name="country_name"
              value={formData.country_name}
              onChange={handleChange}
              placeholder="Enter country name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Visa Type:</label>
            <select
              name="visa_type"
              value={formData.visa_type}
              onChange={handleChange}
              className="select select-bordered w-full">
              <option value="">Select Visa Type</option>
              <option value="Tourist visa">Tourist visa</option>
              <option value="Student visa">Student visa</option>
              <option value="Official visa">Official visa</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Processing Time:
            </label>
            <input
              type="text"
              name="processing_time"
              value={formData.processing_time}
              onChange={handleChange}
              placeholder="Enter processing time"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Required Documents:
            </label>
            <div className="flex flex-col space-y-2">
              <div>
                <input
                  type="checkbox"
                  name="required_documents"
                  value="Valid passport"
                  checked={formData.required_documents.includes(
                    "Valid passport"
                  )}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                />
                <span className="ml-2">Valid passport</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="required_documents"
                  value="Visa application form"
                  checked={formData.required_documents.includes(
                    "Visa application form"
                  )}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                />
                <span className="ml-2">Visa application form</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="required_documents"
                  value="Recent passport-sized photograph"
                  checked={formData.required_documents.includes(
                    "Recent passport-sized photograph"
                  )}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                />
                <span className="ml-2">Recent passport-sized photograph</span>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="textarea textarea-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Age Restriction:
            </label>
            <input
              type="number"
              name="age_restriction"
              value={formData.age_restriction}
              onChange={handleChange}
              placeholder="Enter age restriction"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Fee:</label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              placeholder="Enter fee"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Validity:</label>
            <input
              type="text"
              name="validity"
              value={formData.validity}
              onChange={handleChange}
              placeholder="Enter validity period (in day's)"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Application Method:
            </label>
            <select
              name="application_method"
              value={formData.application_method}
              onChange={handleChange}
              className="select select-bordered w-full">
              <option value="">Select Application Method</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          <button type="submit" className="btn !bg-orange-500 !text-white w-full">
            Add Visa
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVisa;