import React from "react";

const ContactUs = () => {
  return (
    <div>
      <div className="p-6 bg-base-100 rounded-lg shadow-lg card my-4 w-11/12 mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-primary  text-center">
          Contact Us
        </h2>
        <p className="text-base-content mb-4 text-center">
          If you have any questions or need assistance, please fill out the form
          below and our team will get back to you shortly.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-base-content font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-base-content font-medium mb-1">
              Your Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-base-content font-medium mb-1">
              Message
            </label>
            <textarea
              placeholder="Type your message here..."
              className="textarea textarea-bordered w-full"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn bg-gradient-to-tr from-rose-700 to-slate-900 text-white">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;