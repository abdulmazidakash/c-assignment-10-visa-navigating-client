
import React from "react";
import { Link } from "react-router-dom";

const Card = ({ visaCard }) => {
  return (
    <div className="card bg-base-100 lg:w-72 md:w-80 shadow-xl outline-0">
      <figure>
        <img
          className="w-full h-48 object-cover  rounded-b-lg"
          src={visaCard.country_image}
          alt={visaCard.country_name}
        />
      </figure>
      <div className="card-body p-2 gap-0">
        <h2 className="card-title">
          {visaCard.country_name}
          {visaCard.application_method === "Online" ? (
            <div className="badge badge-primary">
              {visaCard.application_method}
            </div>
          ) : (
            <div className="badge badge-secondary">
              {visaCard.application_method}
            </div>
          )}
        </h2>
        <p>Visa Type: {visaCard.visa_type}</p>
        <p>Processing Time: {visaCard.processing_time}</p>
        
        {/* Safe handling of required_documents */}
        <p>Required Documents: { 
          Array.isArray(visaCard.required_documents) && visaCard.required_documents.length > 0
            ? visaCard.required_documents.join(", ") 
            : "No documents available"
        }</p>

        <p>Description: {visaCard.description}</p>
        <p>Age Restriction: {visaCard.age_restriction}</p>
        <p>Fee: ${visaCard.fee}</p>
        <div className="badge badge-primary"> {visaCard.validity}</div>

        <div className="card-actions justify-end text-white">
          <Link
            to={`/visa-details/${visaCard._id}`}
            className="btn btn-info text-white">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
