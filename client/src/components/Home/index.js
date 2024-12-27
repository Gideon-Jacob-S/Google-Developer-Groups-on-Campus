import React from 'react';
import Navbar from '../Navbar';
import HeroBanner from './HeroBanner';
import AboutUs from './AboutUs';
import OurClubs from './OurClubs'; 
import ContactUs from './ContactUs';
import Footer from './Footer';
import './index.css';

// Sections (..., Contributors, Join Us, Login)
// Hero Banner
// About Us
// Our Clubs
// Contact Us
// Footer

const Home = () => {
    return (
        <div>
            <Navbar />
            <HeroBanner />
            <AboutUs />
            <OurClubs />
            <ContactUs />
            <Footer />
        </div>
    );
};

export default Home;