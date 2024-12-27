import React from 'react';
import './index.css';

const ContactUs = () => {
    return (
        <div className="contact-us">
            <h2>Contact Us</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ContactUs;