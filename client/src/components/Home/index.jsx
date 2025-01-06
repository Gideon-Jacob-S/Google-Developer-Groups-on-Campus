import NavbarWrapper from '../NavbarWrapper';
import HeroBanner from '../HeroBanner';
import AboutUs from '../HomeAboutUs';
import OurClubs from '../HomeOurClubs'; 
import ContactUs from '../HomeContactUs';
import Footer from '../Footer';

const Home = () => {
    return (
        <NavbarWrapper>
            <HeroBanner />
            <AboutUs />
            <OurClubs />
            <ContactUs />
            <Footer />
        </NavbarWrapper>
    );
};

export default Home;