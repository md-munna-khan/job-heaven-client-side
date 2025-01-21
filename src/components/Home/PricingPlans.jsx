import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PricingPlans = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const plans = [
    {
      name: "Starter",
      price: "$5",
      coins: "100 Coins",
      features: [
        "Basic Support",
        "1 Task Listing",
      ],
      aosAnimation: "fade-up",
    },
    {
      name: "Basic",
      price: "$10",
      coins: "250 Coins",
      features: [
        "Standard Support",
        "5 Task Listings",
        "No Expiry",
      ],
      aosAnimation: "fade-down",
    },
    {
      name: "Professional",
      price: "$20",
      coins: "500 Coins",
      features: [
        "Priority Support",
        "10 Task Listings",
        "Task Analytics",
      ],
      aosAnimation: "fade-up",
    },
    {
      name: "Business",
      price: "$35",
      coins: "1000 Coins",
      features: [
        "Dedicated Support",
        "25 Task Listings",
        "Custom Analytics",
        "Email Assistance",
      ],
      aosAnimation: "fade-down",
    },
    {
      name: "Enterprise",
      price: "$50",
      coins: "1500 Coins",
      features: [
        "Premium Support",
        "Unlimited Task Listings",
        "Advanced Analytics",
        "Phone & Email Assistance",
        "Custom Integrations",
      ],
      aosAnimation: "fade-up",
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Pricing Plans for Buyers
        </h2>
        <p className="text-gray-600 mb-12">
          Select the plan that fits your needs and start managing tasks effortlessly.
        </p>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              data-aos={plan.aosAnimation}
              className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {plan.name}
              </h3>
              <p className="text-3xl font-bold text-blue-500 mb-4">
                {plan.price}
              </p>
              <p className="text-lg text-gray-700 mb-6">{plan.coins}</p>
              <ul className="text-gray-600 mb-6 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start mb-2">
                    <span className="text-green-500 mr-2">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition duration-300">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
