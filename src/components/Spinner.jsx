const Spinner = () => {
	return (
	  <div className="flex items-center justify-center min-h-screen bg-base-100">
		<div className="relative w-24 h-24">
		  {/* Outer Ring */}
		  <div className="absolute inset-0 border-[6px] border-primary border-t-transparent rounded-full animate-spin"></div>
  
		  {/* Inner Ring */}
		  <div className="absolute inset-3 border-[6px] border-secondary border-t-transparent rounded-full animate-spin-reverse"></div>
  
		  {/* Pulsing Dot */}
		  <div className="absolute inset-7 flex items-center justify-center">
			<div className="w-6 h-6 bg-primary rounded-full animate-ping"></div>
		  </div>
		</div>
	  </div>
	);
  };
  
  export default Spinner;
  