import { useState } from "react";
import Swal from "sweetalert2";
import UpdateVisaModal from "../modal/UpdateVisaModal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

// Optional: If using separate utils
// import { getBadgeColor, getAppMethodColor } from "../utils/badgeColor";

const MyAddedVisasTable = ({ item, fetchData }) => {
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

  // Optional local color functions (if not using utility file)
  const getBadgeColor = (type) => {
    switch (type.toLowerCase()) {
      case "tourist visa":
        return "badge-success";
      case "student visa":
        return "badge-info";
      case "official visa":
        return "badge-warning";
      case "business visa":
        return "badge-primary";
      default:
        return "badge-ghost";
    }
  };

  const getAppMethodColor = (method) => {
    if (method.toLowerCase() === "online") return "badge-accent";
    if (method.toLowerCase() === "offline") return "badge-neutral";
    return "badge-outline";
  };

  // Handlers...
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleDelete = async (id) => {
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
        fetch(`https://assignment-10-visa-server.vercel.app/visa/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Visa deleted successfully.", "success");
              fetchData();
            }
          });
      }
    });
  };

  return (
    <>
      <tr className="hover:bg-orange-50">
        <td>
          <img
            className="w-10 h-10 object-cover rounded-lg border border-gray-400"
            src={item.country_image}
            alt={item.country_name}
          />
        </td>

        {/* Visa Type Badge */}
        <td>
          <span className={`badge ${getBadgeColor(item.visa_type)} capitalize`}>
            {item.visa_type}
          </span>
        </td>

        <td>{item.processing_time}</td>
        <td>${item.fee}</td>
        <td>{item.validity}</td>

        {/* Application Method Badge */}
        <td>
          <span className={`badge ${getAppMethodColor(item.application_method)} capitalize`}>
            {item.application_method}
          </span>
        </td>

        <td className="flex flex-wrap gap-2">
          <button
            className="btn btn-sm !bg-orange-500 !text-white"
            onClick={() => setShowModal(true)}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-sm btn-error !text-white"
            onClick={() => handleDelete(_id)}
          >
            <FaTrashAlt />
          </button>
        </td>
      </tr>

      {showModal && (
        <UpdateVisaModal
          formData={formData}
          handleInputChange={handleInputChange}
          handleUpdate={handleUpdate}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default MyAddedVisasTable;
