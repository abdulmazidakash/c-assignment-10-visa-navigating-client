import React from "react";
import SliderShow from "../components/Home/CoverflowSlider";
import LatestCards from "../components/Home/LatestCards";
import Footer from "./Footer";
import ExtraOne from "../components/Home/ExtraOne";
import ContactUs from "../components/Home/ContactUs";

const Home = () => {
  return (
    <div>
      <div className="w-11/12 mx-auto">
        <SliderShow />
        <LatestCards />
        <ExtraOne />
        <ContactUs />
      </div>
      <Footer />
    </div>
  );
};

export default Home;