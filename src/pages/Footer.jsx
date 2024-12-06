import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-base-200 text-base-content p-10 flex  md:flex-row flex-col-reverse items-start md:items-center justify-around">
        <nav>
          <h6 className="footer-title">Visa Navigator</h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">All Visas</a>
          <a className="link link-hover">Add Visa</a>
          <a className="link link-hover">My Applications</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title ">Newsletter</h6>
          <fieldset className="form-control w-full md:w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join flex flex-col md:flex-row">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item mb-2 md:mb-0"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
    </div>
  );
};

export default Footer;