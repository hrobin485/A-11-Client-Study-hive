import React from 'react';
import Banner from './Banner';
import FeatureSection from './Feature/FeatureSection';
import FAQSection from './FAQ/FAQSection';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeatureSection></FeatureSection>
            <FAQSection></FAQSection>
        </div>
       
    );
};

export default Home;