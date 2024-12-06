import React, { useEffect } from "react";
import { useState } from "react";
import Card from "../components/common/Card";
const AllVisas = () => {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    const fetchVisas = async () => {
      const response = await fetch(
        "http://localhost:5000/visas"
      );
      const data = await response.json();
      setVisas(data);
    };
    fetchVisas();
  }, []);

  const handleSeeDetails = (visaId) => {
    // Add navigation or modal logic here
  };

  return (
    <div className="flex flex-col my-5 items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto w-11/12">
        {visas.map((visa) => (
          <Card
            key={visa._id}
            visaCard={visa}
            handleSeeDetails={handleSeeDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default AllVisas;