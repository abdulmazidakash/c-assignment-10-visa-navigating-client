import React, { useState } from "react";
import Swal from "sweetalert2";

const CardWithModal = ({ item, fetchData }) => {
  const { _id } = item;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    country_name: item.country_name,
    visa_type: item.visa_type,
    processing_time: item.processing_time,
    fee: item.fee,
    validity: item.validity,
    application_method: item.application_method,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`https://backend-tau-vert-85.vercel.app/visas/updateVisa${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Your Visa Info has been updated.",
            icon: "success",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to update Visa Info.",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while updating Visa Info.",
          icon: "error",
        });
      });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://backend-tau-vert-85.vercel.app/visas/delete/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Visa Info has been deleted.",
                icon: "success",
              });
              fetchData();
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete Visa Info.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting Visa Info.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={item.country_image} alt={item.country_name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.country_name}</h2>
        <p>Visa Type: {item.visa_type}</p>
        <p>Processing Time: {item.processing_time} days</p>
        <p>Fee: {item.fee}</p>
        <p>Validity: {item.validity} days</p>
        <p>Application Method: {item.application_method}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}>
            Update
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleDelete(_id)}>
            Delete
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Visa Information</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Country Name:
                </label>
                <input
                  type="text"
                  name="country_name"
                  value={formData.country_name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Visa Type:
                </label>
                <select
                  name="visa_type"
                  value={formData.visa_type}
                  onChange={handleInputChange}
                  className="select select-bordered w-full">
                  <option value="">Select Visa Type</option>
                  <option value="Tourist visa">Tourist visa</option>
                  <option value="Student visa">Student visa</option>
                  <option value="Official visa">Official visa</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Processing Time:
                </label>
                <input
                  type="text"
                  name="processing_time"
                  value={formData.processing_time}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Fee:</label>
                <input
                  type="number"
                  name="fee"
                  value={formData.fee}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Validity:
                </label>
                <input
                  type="number"
                  name="validity"
                  value={formData.validity}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Application Method:
                </label>
                <select
                  name="application_method"
                  value={formData.application_method}
                  onChange={handleInputChange}
                  className="select select-bordered w-full">
                  <option value="">Select Application Method</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}>
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