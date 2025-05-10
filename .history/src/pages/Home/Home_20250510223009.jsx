import React from 'react';
import Banner from './Banner';
import FeatureSection from './Feature/FeatureSection';
import FAQSection from './FAQ/FAQSection';
import HowItWorks from './HowItWorks/HowItWorks';
import TestimonialsSection from './TestimonialsSection/TestimonialsSection';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <HowItWorks></HowItWorks>
            <TestimonialsSection></TestimonialsSection>
            <FAQSection></FAQSection>
        </div>
       
    );
};

export default Home;