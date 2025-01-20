// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

// Import slider images
import slider1 from '../../../public/slider1.jpg'
import slider2 from '../../../public/slider2.jpg'
import slider3 from '../../../public/slider3.jpg'

const Slider = () => {
  return (
    <div className="container px-6 py-10 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative">
            <img
              src={slider1}
              alt="Earn Money Opportunities"
              className="w-full h-64 md:h-96 lg:h-[800px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-center text-white p-4">
              <h2 className="text-2xl md:text-5xl font-bold mb-4">
                Earn Money While Studying
              </h2>
              <p className="text-sm md:text-xl max-w-3xl mb-4">
                Unlock opportunities to earn while learning. Harvard offers scholarships, work-study programs, and entrepreneurial hubs to support your financial growth.
              </p>
              <p className="text-lg md:text-2xl font-semibold">
                Start earning and building your future today!
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative">
            <img
              src={slider2}
              alt="Job Opportunities"
              className="w-full h-64 md:h-96 lg:h-[800px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-center text-white p-4">
              <h2 className="text-2xl md:text-5xl font-bold mb-4">
                Turn Knowledge Into Earnings
              </h2>
              <p className="text-sm md:text-xl max-w-3xl mb-4">
                Stanford connects you to internships, part-time jobs, and startup incubators, helping you transform ideas into income.
              </p>
              <p className="text-lg md:text-2xl font-semibold">
                Build your career while earning money!
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative">
            <img
              src={slider3}
              alt="Career Growth"
              className="w-full h-64 md:h-96 lg:h-[800px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-center text-white p-4">
              <h2 className="text-2xl md:text-5xl font-bold mb-4">
                Learn, Innovate, Earn
              </h2>
              <p className="text-sm md:text-xl max-w-3xl mb-4">
                At MIT, you can access world-class innovation labs, industry projects, and entrepreneurial programs to monetize your skills.
              </p>
              <p className="text-lg md:text-2xl font-semibold">
                Innovation leads to income—start now!
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Slider;
