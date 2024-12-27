import React from 'react';
import './index.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Google Developer Groups on Campus. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;