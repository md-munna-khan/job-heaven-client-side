import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram, FaGithub } from "react-icons/fa"; // Import React Icons
import React from "react";
import logo from '../../../public/job-logo-icon-with-tie-image-free-vector-removebg-preview.png'
const Footer = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <footer className="rounded-lg  my-4 container mx-auto py-4">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Name */}
        <div className="flex flex-col items-start" data-aos="fade-down">
         <div className="inline-flex"> <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-xl font-bold"> Heaven</h2></div>
          <p className="text-sm mt-2">Build Your  Futures With Us</p>
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
              href="https://www.facebook.com/md.munna.362879"
              target="_blank"
              rel="noopener noreferrer"
              className="  transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            {/* LinkedIn Icon */}
            <a
              href="https://www.linkedin.com/in/munna-mia/"
              target="_blank"
              rel="noopener noreferrer"
              className=" transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            {/* YouTube Icon */}
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className=" transition-colors"
            >
              <FaYoutube size={24} />
            </a>
            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className=" transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            {/* GitHub Icon */}
            <a
              href="https://github.com/md-munna-khan/Md.munna-mia"
              target="_blank"
              rel="noopener noreferrer"
              className=" transition-colors"
            >
              <FaGithub size={24} />
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
          <p className="text-sm">Email: support@jobheaven.com</p>
          <p className="text-sm">Phone: 01954288782</p>
          <p className="text-sm mt-4">Dhaka 1212, Gulshan, Badda, Link Road</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white pt-6 text-center text-sm text-white">
        © {new Date().getFullYear()} Job Heaven. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
