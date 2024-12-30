import {Link} from 'react-router-dom';
import Navbar from '../Navbar';
import './index.css';

const Login = () => {
    return (
        <>
            <Navbar />
            <div className="about-us">
                <h1>Login</h1>
                <p>Welcome to the Google Developer Groups on Campus! We are a community of developers and tech enthusiasts who come together to learn, share, and grow. Our mission is to foster a collaborative environment where students can enhance their skills, network with industry professionals, and contribute to open source projects.</p>
                <Link to="/">
                    <button>Go to Home</button>
                </Link>
            </div>
        </>
    );
};

export default Login;