import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const features = [
  {
    title: "Find the right Job",
    description:
      "No matter where you are or how much time you have, you’re guaranteed to find the right job for you.",
    icon: "🧑‍💻",
    animation: "fade-up",
  },
  {
    title: "Never miss a job",
    description:
      "Activate push notifications in the Clickworker app, and we’ll immediately let you know when a new job is available. That way, you’ll never miss an opportunity!",
    icon: "🔔",
    animation: "fade-down",
  },
  {
    title: "Your account balance always in sight",
    description:
      "You can easily track what you’ve earned and how much of it is available for payment.",
    icon: "💰",
    animation: "zoom-in",
  },
  {
    title: "Working without internet connection",
    description:
      "Each accepted job is reserved for you for a fixed time. So you can work offline and submit the job when you are online again.",
    icon: "📶",
    animation: "fade-left",
  },
  {
    title: "Safe environment",
    description:
      "Ensuring a secure environment for your data, so you can focus on your tasks without worrying about potential security breaches.",
    icon: "🔒",
    animation: "fade-right",
  },
  {
    title: "Helpdesk Support",
    description:
      "Do you have questions or need help? We are happy to help you with all your queries about the Workplace.",
    icon: "🤝",
    animation: "flip-up",
  },
];

const FeaturesSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="features-section py-12 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-8">
        The Place Where It All Happens
      </h2>
      <p className="text-center text-lg mb-12">
        No matter where you are or how much time you have, you’re guaranteed to
        find the right job for you.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            data-aos={feature.animation} // Add animation type
            className="feature-card bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="icon text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
