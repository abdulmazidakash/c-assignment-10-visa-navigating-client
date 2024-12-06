import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import { Typewriter } from "react-simple-typewriter";

const LatestCards = () => {
  const navigate = useNavigate();
  const [visaCards, setVisaCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/latestCards")
      .then((res) => res.json())
      .then((data) => {
        setVisaCards(data);
      });
  }, []);

  return (
    <div className="flex justify-center items-center my-8 flex-col">
      {/* Animated Text Section */}
      <h1 className="text-4xl font-bold my-4">
        <span style={{ color: "" }}>
          <Typewriter
            words={[
              "Latest Visa Cards"
            ]}
            loop={true} // Infinite loop
            cursor
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={60}
            delaySpeed={1000}
          />
        </span>
      </h1>
      {/* Visa Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {visaCards.map((visa) => (
          <Card key={visa._id} visaCard={visa} />
        ))}
      </div>
    </div>
  );
};

export default LatestCards;