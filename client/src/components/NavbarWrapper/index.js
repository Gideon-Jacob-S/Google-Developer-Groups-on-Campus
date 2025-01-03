import Navbar from '../Navbar';
import './index.css';

const NavbarWrapper = props => {
    const {children, className} = props
    return (
        <div className='nav-wrapper-bg-container'>
            <Navbar />
            <div className={`nav-wrapper-body-container ${className}`}>
                {children}
            </div>
        </div>
    );
};

export default NavbarWrapper;