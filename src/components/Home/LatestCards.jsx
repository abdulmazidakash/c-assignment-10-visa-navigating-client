import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import { Typewriter } from "react-simple-typewriter";

const LatestCards = () => {
  const navigate = useNavigate();
  const [visaCards, setVisaCards] = useState([]);

  // Fetch the latest visa cards
  useEffect(() => {
    fetch("https://assignment-10-visa-server.vercel.app/latestCards")
      .then((res) => res.json())
      .then((data) => {
        setVisaCards(data);
      });
  }, []);

  // Navigate to "All visas" page
  const handleSeeAllVisas = () => {
    navigate("/allvisas"); // Replace "/visas" with your actual route for the "All visas" page
  };

  return (
    <div className="w-11/12 mx-auto flex justify-center items-center my-8 flex-col">
      {/* Animated Text Section */}
      <h1 className="text-4xl font-bold my-4 text-orange-600">
        <span>
          <Typewriter
            words={["Latest Visa Cards"]}
            loop={true} // Infinite loop
            cursor
            typeSpeed={100}
            deleteSpeed={60}
            delaySpeed={1000}
          />
        </span>
      </h1>

      {/* Visa Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 mt-4">
        {visaCards.map((visa) => (
          <Card key={visa._id} visaCard={visa} />
        ))}
      </div>

      {/* See All Visas Button */}
      <button
        onClick={handleSeeAllVisas}
        className="btn my-4  !bg-orange-500 !text-white mt-6 font-semibold shadow-sm hover:!bg-orange-600 transition-colors duration-300 border-none !rounded-lg"
      >
        See all visas
      </button>
    </div>
  );
};

export default LatestCards;
