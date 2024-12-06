import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules"; // Import Autoplay module
import "swiper/swiper-bundle.css";

const images = [
  "https://edulaunchers.com/wp-content/uploads/2023/08/Visa-Processing-scaled.webp",
  "https://careerpaths.com.bd/wp-content/uploads/2022/04/UK-Student-Visa-Process-for-bangladeshi-student.png",
  "https://assets.studies-overseas.com/Germany_Student_Visa_Process_New_Banner_Size_1190_400_bac6de4cdf.png",
  "https://globaltree.in/uploadsweb/blog/ireland-visa-process-application-process-requirements-and-tips-L-1726665164.webp",
];

function CoverflowSlider() {
  return (
    <div className="w-full mx-auto my-8">
      {" "}
      {/* Set container to full width */}
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000, // Change slide every 3 seconds
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        pagination={{
          clickable: true, // Makes the pagination dots clickable
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]} // Add Autoplay module
        className="w-full rounded-lg shadow-lg">
        {" "}
        {/* Set Swiper to full width */}
        {images.map((src, index) => (
          <SwiperSlide key={index} className="w-full">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-96 object-cover rounded-lg" // Use relative units for height
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CoverflowSlider;