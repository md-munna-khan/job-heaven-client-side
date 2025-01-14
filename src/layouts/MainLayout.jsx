

import { Outlet } from 'react-router-dom'
import Navbar from '../assets/shared/Navbar'
import Footer from '../assets/shared/Footer'

const MainLayout = () => {
  return (
    <div className='bg-white container mx-auto'>
      <Navbar />
      <div className=' '>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout