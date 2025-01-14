
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
// import logo from '../assets/harvard.png'
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa"; // Import React Icons
import React from "react";



const Footer = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <footer className= "rounded-lg bg-blue-500  my-4 container mx-auto  py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Name */}
        <div className="flex flex-col items-start" data-aos="fade-down">
          <img
            // src={logo} // Replace with your logo
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-xl font-bold">Abroad University</h2>
          <p className="text-sm mt-2">
           Build Your Son Futures With Us
          </p>
        </div>

        {/* Social Media Links */}
        <div
          className="flex flex-col items-start"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-6">
            {/* Facebook Icon */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white  hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            {/* YouTube Icon */}
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white transition-colors"
            >
              <FaYoutube size={24} />
            </a>
            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white transition-colors"
            >
              <FaInstagram size={24} />
            </a>
          </div>
          <p className="text-sm mt-4">
            Follow us for updates, tips, and exclusive offers!
          </p>
        </div>

        {/* Contact Information */}
        <div
          className="flex flex-col items-start"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="text-sm">Email: support@abroadVersity.com</p>
          <p className="text-sm">Phone:01954288782</p>
          <p className="text-sm mt-4">
           DHaka 1212,Gulshan ,Badda ,Link Road
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t  border-white mt-8 pt-6 text-center text-sm text-white">
        © {new Date().getFullYear()} Abroad University. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;