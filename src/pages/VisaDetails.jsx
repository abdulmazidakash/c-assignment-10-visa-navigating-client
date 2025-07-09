import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import ApplyVisaModal from "../components/modal/ApplyVisaModal";
import { MdAttachEmail, MdDocumentScanner } from "react-icons/md";
import { FaClock, FaDollarSign, FaGlobe, FaShieldAlt, FaUserLock } from "react-icons/fa";

const VisaDetails = () => {
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
      const response = await fetch("https://assignment-10-visa-server.vercel.app/applyVisa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visaData),
      });

      const result = await response.json();

      if (result.status === "ok") {
        Swal.fire({
          title: "Success!",
          text: "Your visa application has been submitted successfully.",
          icon: "success",
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
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an error submitting your application. Please try again.",
        icon: "error",
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <h1 className="text-center text-3xl font-bold text-orange-500 mb-8">
        Visa Information for {country_name}
      </h1>

      <div className="flex flex-col lg:flex-row bg-orange-50 shadow-lg rounded-xl overflow-hidden border border-gray-300">
        {/* Left Side Image */}
        <div className="lg:w-1/2">
          <img
            src={country_image}
            alt={country_name}
            className="w-full h-64 lg:h-full object-cover border border-gray-300"
          />
        </div>

        {/* Right Side Content */}
        <div className="lg:w-1/2 p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-orange-600">{country_name}</h2>
          <p className="text-gray-700">{description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="badge badge-primary">
              <FaGlobe className="mr-1" /> {visa_type}
            </div>
            <div className="badge badge-secondary">
              <FaClock className="mr-1" /> Processing: {processing_time} days
            </div>
            <div className="badge badge-accent">
              <FaDollarSign className="mr-1" /> Fee: ${fee}
            </div>
            <div className="badge badge-info">
              <FaShieldAlt className="mr-1" /> Validity: {validity} days
            </div>
            <div className="badge badge-warning">
              <FaUserLock className="mr-1" /> Age: {age_restriction}+
            </div>
            <div className="badge badge-success">
              <FaGlobe className="mr-1" /> Method: {application_method}
            </div>
          </div>

          <div>
            <h3 className="font-bold mt-4 flex items-center text-gray-800">
              <MdDocumentScanner className="mr-2" /> Required Documents:
            </h3>
            <ul className="list-disc list-inside pl-4 text-gray-600">
              {required_documents?.length > 0 ? (
                required_documents.map((doc, idx) => <li key={idx}>{doc}</li>)
              ) : (
                <li>No documents available</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-bold flex items-center text-gray-800">
              <MdAttachEmail className="mr-2" /> Contact Email:
            </h3>
            <p className="text-gray-700">{email}</p>
          </div>

          <button
            className="btn w-full bg-orange-500 hover:bg-orange-600 text-white mt-4"
            onClick={() => setIsModalOpen(true)}
          >
            Apply for the Visa
          </button>
        </div>
      </div>

      {/* Apply Modal */}
      {isModalOpen && (
        <ApplyVisaModal
          setIsModalOpen={setIsModalOpen}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          formData={formData}
          user={user}
        />
      )}
    </div>
  );
};

export default VisaDetails;
