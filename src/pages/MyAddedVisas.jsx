import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import CardWithModal from "../components/utils/CardWithModal";

const MyAddedVisas = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [visas, setVisas] = useState([]);
  console.log(visas);


  useEffect(()=>{
    fetchData()
  } , [])


  const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/visas/${user?.email}`
        );
        const data = await response.json();
        setVisas(data);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="flex items-center justify-center py-5">
      {/* <h1>My Added Visas sddd</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {visas.map((visa) => (
          <CardWithModal 
          key={visa._id} 
          item={visa} 
          fetchData={fetchData} 
          />


        ))}
      </div>
    </div>
  );
};

export default MyAddedVisas;