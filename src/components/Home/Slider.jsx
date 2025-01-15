// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
// import Slide from './Slide'


import slider1 from '../../../public/slider1.jpg'
import slider2 from '../../../public/slider2.png'
import slider3 from '../../../public/slider3.png'



const Slider = () => {
  return (
    <div className='container px-6 py-10 mx-auto'>
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
        className='mySwiper'
      >
       
       <SwiperSlide>
        <div className="relative mt-32">
          <img src={slider1} alt="University 1" className="w-full h-64 md:h-96 lg:h-[800px] object-cover" style={{ objectFit: 'cover' }} />
          <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 p-2">
            <div className="text-left text-white">
              <h2 className="text-lg md:text-4xl font-bold">Harvard University</h2>
              <p className="mt-2 text-sm md:text-xl">Established in 1636, Harvard is the oldest institution of higher education in the United States. It is renowned for its rigorous academics and influential alumni.</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <img src={slider2} alt="University 2" className="w-full h-64 md:h-96 lg:h-[800px] object-cover" style={{ objectFit: 'cover' }} />
          <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 p-2">
            <div className="text-left text-white">
              <h2 className="text-lg md:text-4xl font-bold">Stanford University</h2>
              <p className="mt-2 text-sm md:text-xl">Founded in 1885, Stanford is known for its entrepreneurial spirit and close ties to Silicon Valley. It offers a wide range of undergraduate and graduate programs.</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <img src={slider3} alt="University 3" className="w-full h-64 md:h-96 lg:h-[800px] object-cover" style={{ objectFit: 'cover' }} />
          <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 p-2">
            <div className="text-left text-white">
              <h2 className="text-lg md:text-4xl font-bold">Massachusetts Institute of Technology (MIT)</h2>
              <p className="mt-2 text-sm md:text-xl">MIT, established in 1861, is a leader in science, engineering, and technology education. It has a strong focus on innovation and research.</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>


    </div>
  )
}

export default Slider;