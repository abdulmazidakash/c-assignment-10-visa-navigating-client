
import React, { useState } from "react";
import Swal from "sweetalert2";

const CardWithModal = ({ item, fetchData }) => {

  console.log(item);
  const { _id } = item;
  // console.log(_id);
  const [showModal, setShowModal] = useState(false);
  const [visas, setVisas] = useState([])
  const [formData, setFormData] = useState({
    country_name: item.country_name,
    visa_type: item.visa_type,
    processing_time: item.processing_time,
    fee: item.fee,
    validity: item.validity,
    application_method: item.application_method,
  });

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Update Visa
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`https://assignment-10-visa-server.vercel.app/update-visa/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Your Visa Info has been updated.", "success");
          fetchData();
        } else {
          Swal.fire("Error!", "Failed to update Visa Info.", "error");
        }
      })
      .catch(() => Swal.fire("Error!", "An error occurred.", "error"));
    setShowModal(false);
  };

  const handleDelete = async id =>{
    Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		  }).then((result) => {
			if (result.isConfirmed) {
	

				fetch(`https://assignment-10-visa-server.vercel.app/visa/${id}`,{
					method: 'DELETE'
				})
					.then(res => res.json())
					.then(data =>{
						console.log(data)
						if(data.deletedCount > 0){
						  Swal.fire({
								title: "Deleted!",
								text: "Your coffee has been deleted.",
								icon: "success"
							  });

							fetchData();
						}
					})
			}
		  });
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="w-full h-52 object-cover" src={item.country_image} alt={item.country_name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.country_name}</h2>
        <p>Visa Type: {item.visa_type}</p>
        <p>Processing Time: {item.processing_time} days</p>
        <p>Fee: ${item.fee}</p>
        <p>Validity: {item.validity} days</p>
        <p>Application Method: {item.application_method}</p>
        <div className="card-actions justify-end">

          {/* Update Button */}
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Update
          </button>

          {/* Delete Button */}
          <button className="btn btn-secondary" onClick={() => handleDelete(_id)}>
            Delete
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Visa Information</h3>
            <form onSubmit={handleUpdate}>
              {["country_name", "visa_type", "processing_time", "fee", "validity", "application_method"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium mb-1">{field}:</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
              ))}
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="button" className="btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardWithModal;


