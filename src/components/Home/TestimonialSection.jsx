import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles

// Import necessary modules from Swiper
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      photo: "https://i.ibb.co.com/p2PZFMB/joseph-gonzalez-i-Fg-Rcq-Hznqg-unsplash.jpg",
      quote: "This platform has exceeded my expectations. Highly recommended!",
    },
    {
      id: 2,
      name: "Jane Smith",
      photo: "https://i.ibb.co.com/yFpQ1SZ/ian-dooley-d1-UPki-Fd04-A-unsplash.jpg",
      quote: "Amazing experience! I absolutely love the services provided here.",
    },
    {
      id: 3,
      name: "Alex Johnson",
      photo: "https://i.ibb.co.com/mXdZLv0/albert-dera-ILip77-Sbm-OE-unsplash.jpg",
      quote: "A seamless experience from start to finish. Truly professional!",
    },
    {
      id: 4,
      name: "Sarah Lee",
      photo: "https://i.ibb.co.com/QKXsCVJ/seth-doyle-vm-Bik4xv27s-unsplash.jpg",
      quote: "Best decision I ever made. Truly a game-changer for my business.",
    },
    {
      id: 5,
      name: "Oliver Ragfelt",
      photo: "https://i.ibb.co.com/f12TcsJ/oliver-ragfelt-kh-V4f-Ty6-D8-unsplash.jpg",
      quote: "Exceptional service and support throughout the process.",
    },
    {
      id: 6,
      name: "Arrul Lin",
      photo: "https://i.ibb.co.com/tYnby28/arrul-lin-s-Yh-Uhse5u-T8-unsplash.jpg",
      quote: "I can't imagine working with anyone else. Top-notch!",
    },
    {
      id: 7,
      name: "Tamarcus Brown",
      photo: "https://i.ibb.co.com/8MW0njM/tamarcus-brown-29p-Fb-I-D1-Sc-unsplash.jpg",
      quote: "A fantastic experience! I highly recommend this service.",
    },
    {
      id: 8,
      name: "Gregory Hayes",
      photo: "https://i.ibb.co.com/DYXHt9d/gregory-hayes-h5cd51-KXm-RQ-unsplash.jpg",
      quote: "One of the best decisions I’ve made for my business.",
    },
    {
      id: 9,
      name: "Brooke Cagle",
      photo: "https://i.ibb.co.com/Wy381tH/brooke-cagle-w-KOKid-NT14w-unsplash.jpg",
      quote: "Incredible quality and service. Would recommend to anyone.",
    },
  ];

  return (
    <div className="testimonial-section bg-gray-100 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
      <Swiper
        modules={[Pagination, Autoplay]} // Use Pagination and Autoplay modules
        spaceBetween={30} // Space between slides
        slidesPerView={1} // Display one slide at a time (serial view)
        autoplay={{
          delay: 3000, // Slide every 3 seconds
          disableOnInteraction: false, // Keep autoplay even after user interaction
        }}
        pagination={{ clickable: true }} // Pagination controls
        loop={true} // Enable looping through testimonials
        speed={800} // Smooth transition speed
        className="testimonial-slider"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide
            key={testimonial.id}
            className="flex flex-col items-center text-center px-8"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full flex flex-col items-center justify-center mx-auto">
              {/* Center the image and ensure it doesn't overflow */}
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">{testimonial.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{testimonial.quote}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSection;
