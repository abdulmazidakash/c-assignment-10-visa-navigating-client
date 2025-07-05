import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-orange-200 text-base-content p-10 flex  md:flex-row flex-col-reverse items-start md:items-center justify-around">
        <nav>
          <h6 className="footer-title">Global Visa Hub</h6>
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
        
      </footer>
      <p className="font-semibold text-center p-2">© Global Visa Hub 2024</p>
    </div>
  );
};

export default Footer;