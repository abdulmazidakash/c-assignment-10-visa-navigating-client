import React, { useEffect } from "react";
import { useState } from "react";
import Card from "../components/common/Card";
const AllVisas = () => {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    const fetchVisas = async () => {
      const response = await fetch("http://localhost:8000/visas");
      const data = await response.json();
      setVisas(data);
    };
    fetchVisas();
  }, []);

  const handleSeeDetails = (visaId) => {
    console.log("See details for visa:", visaId);
    // Add navigation or modal logic here
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {visas.map(
          (visa) => (
            console.log(visa),
            (
              <Card
                key={visa._id}
                visaCard={visa}
                handleSeeDetails={handleSeeDetails}
              />
            )
          )
        )}
      </div>
      )
    </div>
  );
};

export default AllVisas;
