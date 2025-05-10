import React from 'react';
import Banner from './Banner';
import FeatureSection from './Feature/FeatureSection';
import FAQSection from './FAQ/FAQSection';
import HowItWorks from './HowItWorks/HowItWorks';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <HowItWorks></HowItWorks>
            <FAQSection></FAQSection>
        </div>
       
    );
};

export default Home;