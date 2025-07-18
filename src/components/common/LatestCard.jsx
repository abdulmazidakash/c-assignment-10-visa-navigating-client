import React from "react";
import { Link } from "react-router-dom";

const LatestCard = ({ visaCard }) => {
  return (
    <div className="card lg:w-96 md:w-80 shadow-xl">
      <figure>
        <img src={visaCard.country_image} alt={visaCard.country_name} />
      </figure>
      <div className="card-body">
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
        <p>Description: {visaCard.description}</p>
        <p>Age Restriction: {visaCard.age_restriction}</p>
        <p>Fee: ${visaCard.fee}</p>
        <div className="badge badge-primary"> {visaCard.validity}</div>

        <div className="card-actions justify-end">
          <Link
            to={`/visa-details/${visaCard._id}`}
            className="btn btn-primary">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestCard;
