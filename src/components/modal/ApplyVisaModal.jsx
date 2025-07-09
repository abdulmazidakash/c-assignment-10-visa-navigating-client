export default function ApplyVisaModal({setIsModalOpen, handleInputChange, handleSubmit, formData, user}) {
  return (
	<div className="modal modal-open">
		<div className="modal-box">
		<h3 className="font-bold text-lg text-center text-orange-500">Apply for the Visa</h3>
		<form onSubmit={handleSubmit}>
			<div className="form-control">
			<label className="label">Email</label>
			<input
				type="email"
				name="email"
				value={user?.email}
				readOnly
				className="input input-bordered"
			/>
			</div>
			<div className="form-control">
			<label className="label">First Name</label>
			<input
				type="text"
				name="firstName"
				value={formData.firstName}
				onChange={handleInputChange}
				className="input input-bordered"
			/>
			</div>
			<div className="form-control">
			<label className="label">Last Name</label>
			<input
				type="text"
				name="lastName"
				value={formData.lastName}
				onChange={handleInputChange}
				className="input input-bordered"
			/>
			</div>
			<div className="form-control">
			<label className="label">Applied Date</label>
			<input
				type="date"
				name="appliedDate"
				value={formData.appliedDate}
				readOnly
				className="input input-bordered"
			/>
			</div>
			<div className="form-control">
			<label className="label">Fee</label>
			<input
				type="text"
				name="fee"
				value={formData.fee}
				readOnly
				className="input input-bordered"
			/>
			</div>
			<div className="modal-action">
			<button type="submit" className="btn !bg-orange-500 !text-white">
				Apply
			</button>
			<button
				type="button"
				className="btn"
				onClick={() => setIsModalOpen(false)}
			>
				Cancel
			</button>
			</div>
		</form>
		</div>
	</div>
  )
}
