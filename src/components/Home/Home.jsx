import FeaturesSection from "./FeaturesSection";
import PricingPlans from "./PricingPlans";
import Slider from "./Slider";
import TestimonialSection from "./TestimonialSection";
import TopWorkers from "./TopWokers";
import UpcomingFeatures from "./UpcomingFeatures";


const Home = () => {
    return (
        <div className="overflow-hidden">
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