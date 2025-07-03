export default function UpdateVisaModal({handleUpdate, setShowModal, formData, handleInputChange}) {
  return (
	<div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Update Visa Information</h3>
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
  )
}
