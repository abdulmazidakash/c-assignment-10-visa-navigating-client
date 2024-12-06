import React from "react";

const ExtraOne = () => {
  return (
    <div>
      <div className="p-6 bg-base-100 rounded-lg shadow-lg card my-4">
        {/* Welcome Section */}
        <h2 className="text-2xl font-bold mb-4 text-primary card-title">
          What You Need?
        </h2>
        <p className="text-base-content">
          Welcome to the{" "}
          <strong>Electronic Visa Applications Forms Instructions Page</strong>.
          Forms available on this page can be filled out online to assist in
          processing your application.
        </p>

        {/* Supported Countries */}
        <div className="collapse collapse-arrow bg-base-200 mt-6">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            Supported Countries:
          </div>
          <div className="collapse-content">
            <p className="text-base-content">
              Before applying, check our{" "}
              <span className="text-primary font-semibold">
                Supported Countries
              </span>{" "}
              page to see if the country you’re applying to accepts online
              applications.
            </p>
          </div>
        </div>

        {/* Services Offered */}
        <div className="collapse collapse-arrow bg-base-200 mt-6">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Services Currently Available:
          </div>
          <div className="collapse-content">
            <ul className="list-disc pl-6 space-y-2 text-base-content">
              <li>New Visa</li>
              <li>Extension of Visa</li>
              <li>No Visa Required (NVR)</li>
              <li>On Arrival Visa (OAV)</li>
            </ul>
          </div>
        </div>

        {/* What You Need */}
        <div className="collapse collapse-arrow bg-base-200 mt-6">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            What You’ll Need:
          </div>
          <div className="collapse-content">
            <ul className="list-disc pl-6 space-y-2 text-base-content">
              <li>A valid Passport</li>
              <li>
                A 45mm x 35mm Digital Photo in JPEG format (optional, max size:
                300kb)
              </li>
              <li>Address in Bangladesh</li>
              <li>A valid Email Address</li>
            </ul>
            <p className="text-base-content mt-2">
              You’ll also need access to a printer to print your completed
              application form.
            </p>
          </div>
        </div>

        {/* Steps to Apply */}
        <div className="collapse collapse-arrow bg-base-200 mt-6">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Steps to Apply:
          </div>
          <div className="collapse-content">
            <ol className="list-decimal pl-6 space-y-2 text-base-content">
              <li>Fill up and submit the Online Visa Application Form.</li>
              <li>Print the completed form.</li>
              <li>
                Take the printed form along with required documents and visa fee
                payment proof to the nearest Visa office or Bangladesh Mission.
              </li>
            </ol>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-6 text-center">
          <button className="btn btn-primary">
            Start Your Visa Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtraOne;