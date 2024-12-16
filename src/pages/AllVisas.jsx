
import React, { useEffect, useState } from "react";
import Card from "../components/common/Card";

const AllVisas = () => {
  const [visas, setVisas] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [filter, setFilter] = useState("All Visas");

  // Fetch visas from the server
  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const response = await fetch("https://assignment-10-visa-server.vercel.app/visas");
        const data = await response.json();
        setVisas(data);
        setFilteredVisas(data); // Initialize filtered visas
      } catch (error) {
        console.error("Error fetching visas:", error);
      }
    };
    fetchVisas();
  }, []);

  // Filter visas based on dropdown selection
  useEffect(() => {
    if (filter === "All Visas") {
      setFilteredVisas(visas);
    } else {
      const filtered = visas.filter((visa) => visa.visa_type === filter);
      setFilteredVisas(filtered);
    }
  }, [filter, visas]);

  const handleSeeDetails = (visaId) => {
    console.log("Visa ID:", visaId);
    // Add navigation or modal logic here for visa details
  };

  return (
    <div className="flex flex-col my-5 items-center justify-center">
      <h1 className="text-3xl font-bold text-info mb-5">All Visas</h1>

      {/* Filter Section */}
      <div className="flex flex-row items-center justify-between w-11/12 mb-5">
        <label className="text-info text-lg font-semibold">Select a visa type:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded-lg font-semibold">
          <option value="All Visas">All Visas</option>
          <option value="Tourist visa">Tourist Visa</option>
          <option value="Student visa">Student Visa</option>
          <option value="Official visa">Official Visa</option>
        </select>
      </div>

      {/* Visa Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto w-11/12">
        {filteredVisas.map((visa) => (
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
