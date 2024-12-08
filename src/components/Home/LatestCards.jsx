

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import { Typewriter } from "react-simple-typewriter";

const LatestCards = () => {
  const navigate = useNavigate();
  const [visaCards, setVisaCards] = useState([]);

  // Fetch the latest visa cards
  useEffect(() => {
    fetch("http://localhost:5000/latestCards")
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
    <div className="flex justify-center items-center my-8 flex-col">
      {/* Animated Text Section */}
      <h1 className="text-4xl font-bold my-4 text-info">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto w-11/12 mb-4">
        {visaCards.map((visa) => (
          <Card key={visa._id} visaCard={visa} />
        ))}
      </div>

      {/* See All Visas Button */}
      <button
        onClick={handleSeeAllVisas}
        className="btn my-4  btn-info text-white mt-6 px-6 py-2  font-semibold"
      >
        See all visas
      </button>
    </div>
  );
};

export default LatestCards;
