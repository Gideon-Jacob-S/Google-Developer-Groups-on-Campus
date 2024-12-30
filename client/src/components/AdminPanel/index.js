import Navbar from '../Navbar';
import './index.css';

const AdminPanel = () => {
    return (
        <>
            <Navbar />
            <div className="about-us">
                <h1>Admin Panel</h1>
                <p>Welcome to the Google Developer Groups on Campus! We are a community of developers and tech enthusiasts who come together to learn, share, and grow. Our mission is to foster a collaborative environment where students can enhance their skills, network with industry professionals, and contribute to open source projects.</p>
            </div>
        </>
    );
};

export default AdminPanel;
