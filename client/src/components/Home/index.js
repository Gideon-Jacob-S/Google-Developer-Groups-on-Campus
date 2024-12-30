import Navbar from '../Navbar';
import HeroBanner from '../HeroBanner';
import AboutUs from '../HomeAboutUs';
import OurClubs from '../HomeOurClubs'; 
import ContactUs from '../HomeContactUs';
import Footer from '../Footer';
import './index.css';

// Sections (..., Contributors, Join Us, Login)
// Hero Banner
// About Us
// Our Clubs
// Contact Us
// Footer

const Home = () => {
    return (
        <>
            <Navbar />
            <HeroBanner />
            <AboutUs />
            <OurClubs />
            <ContactUs />
            <Footer />
        </>
    );
};

export default Home;