import "aos/dist/aos.css";
import AOS from "aos";
import React from "react";

const UpcomingFeaturesSection = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-gray-100 py-16 px-4" id="upcoming-features">
      <div className="container mx-auto text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6">Upcoming Features</h2>
        <p className="text-gray-600 mb-12">
          Stay tuned for exciting updates and features that will enhance your experience on our platform!
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Feature 1 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-right">
          <img
         
              src="https://i.ibb.co.com/VvJgd1L/mariia-shalabaieva-GSs-XCDndk-LY-unsplash.jpg"
            alt="Mobile App"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Mobile App</h3>
            <p className="text-gray-600">
              Access our platform anytime, anywhere with our upcoming mobile app for iOS and Android.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-up">
          <img
            src="https://i.ibb.co.com/9yBwpW1/Restorative-Care-Referral-Program-660x330.jpg"
            alt="Referral Program"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Referral Program</h3>
            <p className="text-gray-600">
              Earn rewards by inviting friends to join our platform through our bonus referral programs.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-left">
          <img
            src="https://i.ibb.co.com/RpRSKKL/Header-1-Best-invoice-payment-methods.png"
            alt="New Payment Methods"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">New Payment Methods</h3>
            <p className="text-gray-600">
              We're introducing additional payment methods to make transactions seamless and secure.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-aos="fade-down">
          <img
             src="https://i.ibb.co.com/Gd7LJWQ/Blog-Images-5.webp"
            alt="Advanced Analytics"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
            <p className="text-gray-600">
              Gain insights with our upcoming advanced analytics feature for better decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingFeaturesSection;
