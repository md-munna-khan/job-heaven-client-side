import { Helmet } from "react-helmet-async";
import FeaturesSection from "./FeaturesSection";
import PricingPlans from "./PricingPlans";
import Slider from "./Slider";
import TestimonialSection from "./TestimonialSection";
import TopWorkers from "./TopWokers";
import UpcomingFeatures from "./UpcomingFeatures";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../assets/shared/LoadingSpinner";


const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulate data fetching or loading process
      const timer = setTimeout(() => {
        setLoading(false); // Set loading to false after the loading process is done
      }, 500); // Adjust the time as per your requirement
  
      return () => clearTimeout(timer); // Clean up the timer
    }, []);
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p><LoadingSpinner></LoadingSpinner></p>
        </div>
      );
    }
    return (
        <div className="overflow-hidden">
               <Helmet>
        <title> Job Heaven | Home</title>
        
      </Helmet>
            <Slider></Slider>
            <TopWorkers></TopWorkers>
            <TestimonialSection></TestimonialSection>
            <FeaturesSection></FeaturesSection>
            <UpcomingFeatures></UpcomingFeatures>
            <PricingPlans></PricingPlans>
        </div>
   
    );
};

export default Home;