import CoverflowSlider from "../components/Home/CoverflowSlider";
import LatestCards from "../components/Home/LatestCards";
import ExtraOne from "../components/Home/ExtraOne";
import ContactUs from "../components/Home/ContactUs";

const Home = () => {
  return (
      <div className="w-11/12 mx-auto">
        <CoverflowSlider />
        <LatestCards />
        <ExtraOne />
        <ContactUs />
      </div>
  );
};

export default Home;