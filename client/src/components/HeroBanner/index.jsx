import Button from '../Button';
import './index.css';

const HeroBanner = () => {
    return (
        <div className="hero-banner">
            <h1>Welcome to Google Developer Groups on Campus</h1>
            <p>Join us to learn, share, and connect with fellow developers.</p>
            <Button type="cta">Get Started</Button>
        </div>
    );
};

export default HeroBanner;