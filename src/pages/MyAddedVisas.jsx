import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import MyAddedVisasTable from "../components/common/MyAddedVisasTable";

const MyAddedVisas = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [visas, setVisas] = useState([]);
  console.log(visas);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://assignment-10-visa-server.vercel.app/visas/${user?.email}`
      );
      const data = await response.json();
      setVisas(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-11/12 mx-auto my-8">
      <h1 className="text-3xl font-bold my-5 text-center text-orange-500">
        My Added Visas
      </h1>
      <div className="">
        {visas.length > 0 ? (
          <div className="overflow-x-auto border border-gray-200 bg-orange-50 rounded-lg">
            <table className="table w-full">
              <thead>
                <tr className="bg-orange-100">
                  <th>Country</th>
                  <th>Visa Type</th>
                  <th>Processing Time</th>
                  <th>Fee</th>
                  <th>Validity</th>
                  <th>Application Method</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visas.map((visa) => (
                  <MyAddedVisasTable
                    key={visa._id}
                    item={visa}
                    fetchData={fetchData}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">No visas added yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyAddedVisas;