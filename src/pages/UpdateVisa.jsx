import React from "react";
import { useLoaderData } from "react-router-dom";

const UpdateVisa = () => {
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="card w-full max-w-md bg-white shadow-xl">
        <figure>
          <img
            src={country_image}
            alt={country_name}
            className="w-full h-auto"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl md:text-2xl">{country_name}</h2>
          <p className="text-gray-700 text-sm md:text-base">{description}</p>
          <div className="badge badge-primary">{visa_type}</div>
          <div className="badge badge-secondary">
            Processing Time: {processing_time}
          </div>
          <div className="badge badge-accent">Fee: ${fee}</div>
          <div className="badge badge-info">Validity: {validity}</div>
          <div className="badge badge-warning">
            Age Restriction: {age_restriction}+
          </div>
          <div className="badge badge-success">
            Application Method: {application_method}
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-sm md:text-base">
              Required Documents:
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base">
              {required_documents.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-sm md:text-base">Contact:</h3>
            <p className="text-sm md:text-base">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateVisa;