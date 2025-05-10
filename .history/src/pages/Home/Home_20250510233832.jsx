import React from 'react';
import Banner from './Banner';
import FeatureSection from './Feature/FeatureSection';
import FAQSection from './FAQ/FAQSection';
import HowItWorks from './HowItWorks/HowItWorks';
import TestimonialsSection from './TestimonialsSection/TestimonialsSection';
import UniqueValueSection from './UniqueValueSection/UniqueValueSection';
import SuccessStoriesSection from './SuccessStoriesSection/SuccessStoriesSection';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <HowItWorks></HowItWorks>
            <TestimonialsSection></TestimonialsSection>
            <UniqueValueSection></UniqueValueSection>
            <FAQSection></FAQSection>
            <SuccessStoriesSection></SuccessStoriesSection>
        </div>
       
    );
};

export default Home;