import { Link } from "react-router-dom";
import {
  FaGlobe,
  FaFileAlt,
  FaClock,
  FaDollarSign,
  FaInfoCircle,
  FaUserShield,
} from "react-icons/fa";

const Card = ({ visaCard }) => {
  return (
      <div className="card shadow-xl border border-gray-200 transition-transform hover:scale-[1.02] hover:shadow-2xl duration-300 rounded-lg overflow-hidden h-full flex flex-col group bg-orange-50">
        <figure className="h-48 w-full overflow-hidden">
          <img
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 border-b-2 border-gray-300"
            src={visaCard.country_image}
            alt={visaCard.country_name}
          />
        </figure>

        <div className="card-body p-5 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex flex-wrap justify-between items-center gap-y-2 mb-3">
              <h2 className="card-title text-2xl font-bold text-orange-500 flex items-center gap-2">
                <FaGlobe className="text-xl" /> {visaCard.country_name}
              </h2>
              <div
                className={`badge text-sm py-2 px-3 font-semibold ${
                  visaCard.application_method === "Online"
                    ? "badge-primary bg-blue-500 text-white"
                    : "badge-secondary bg-purple-500 text-white"
                }`}
              >
                {visaCard.application_method}
              </div>
            </div>

            <p className="flex items-center gap-2 text-gray-700 mb-2">
              <FaInfoCircle className="text-lg text-blue-500" />{" "}
              <span className="font-semibold">Visa Type:</span>{" "}
              {visaCard.visa_type}
            </p>

            <p className="flex items-center gap-2 text-gray-700 mb-2">
              <FaClock className="text-lg text-green-500" />{" "}
              <span className="font-semibold">Processing Time:</span>{" "}
              {visaCard.processing_time}
            </p>

            <p className="flex items-start gap-2 text-gray-700 mb-2">
              <FaFileAlt className="text-lg text-orange-500 mt-1" />{" "}
              <span className="font-semibold">Required Documents:</span>{" "}
              <span className="flex-1">
                {Array.isArray(visaCard.required_documents) &&
                visaCard.required_documents.length > 0
                  ? visaCard.required_documents.join(", ").split(' ').slice(0, 1).join(' ')
                  : "No documents listed"}...
              </span>
            </p>

            <p className="flex items-start gap-2 text-gray-700 mb-2">
              <FaInfoCircle className="text-lg text-teal-500 mt-1" />{" "}
              <span className="font-semibold">Description:</span>{" "}
              <span className="flex-1">
                {visaCard.description.split(' ').slice(0, 1).join(' ') || "N/A"}...
              </span>
            </p>

            <p className="flex items-center gap-2 text-gray-700 mb-2">
              <FaUserShield className="text-lg text-red-500" />{" "}
              <span className="font-semibold">Age Restriction:</span>{" "}
              {visaCard.age_restriction || "None"}
            </p>

            <p className="flex items-center gap-2 text-gray-700 mb-4">
              <FaDollarSign className="text-lg text-yellow-600" />{" "}
              <span className="font-semibold">Fee:</span> $
              {visaCard.fee}
            </p>

            <div className="badge badge-outline border-blue-500 text-blue-700 font-semibold py-2 px-3 text-sm">
              Validity: {visaCard.validity || "N/A"}
            </div>
          </div>

          <div className="justify-end mt-6">
            <Link
              to={`/visa-details/${visaCard._id}`}
              className="btn !bg-orange-500 !text-white w-full font-semibold text-lg border-none !rounded-lg"
            >
              See Details
            </Link>
          </div>
        </div>
      </div>

  );
};

export default Card;