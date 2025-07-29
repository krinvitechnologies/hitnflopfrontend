import React, { useState } from 'react'
import './contact.css'
// import { FaFacebook, FaInstagram } from 'react-icons/fa6'
import { toast } from 'react-toastify';
import validator from "validator";
// import { axiosRequest } from '../../services/ApiCall';
import Link from 'next/link'; 
import contactImage from '../../assets/contact/contact.webp';

const Contact = () => {

    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleContact = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!name || !message || !phoneNo) {
                toast.error('All fields are required');
            } else if (phoneNo.length !== 10 || !/^[0-9]{10}$/.test(phoneNo)) {
                toast.error('Please enter a valid phone number');
            } else if (!validator.isMobilePhone(phoneNo, 'en-IN')) {
                toast.error('Please enter a valid phone number');
            } else {

                // const response = await axiosRequest.post('/contact', {
                //     name,
                //     phoneNo,
                //     message,
                // });
                // toast.success(response?.data?.message);

                // Reset the fields after the request success
                setName('');
                setPhoneNo('');
                setMessage('');

            }
        } catch (error) {
            if (error.response) {
                toast.error(error?.response?.data?.message);
            }
        } finally {
            setIsLoading(false); // Set loading state to false when API call completes
        }
    };

    return (
        <div className="contact" id="contact">
            <div className="contact-cont">
                <div className="contact-img-cont">
                    <img src={contactImage} alt="Contact" />
                </div>
                <div className="contact-form">
                    <h1>Contact Us</h1>
                    <form>
                        <label htmlFor="name">Full Name
                            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label htmlFor="phone">Phone no.
                            <input type="tel" id="phone" name="phone" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                        </label>
                        <label htmlFor="message">Message
                            <input type="message" id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                        </label>
                        <button className="contact-btn" onClick={handleContact} disabled={isLoading}>
                            {isLoading ? 'Loading...' : 'Contact Us'}
                        </button>
                    </form>
                </div>
                <div className="contact-details">
                    <div className='contact-info'>
                        <h6>Contact</h6>
                        <span><a href="tel:+91 8979545845" className='contact-link'>+91-8979545845</a></span>
                    </div>
                    <div className='contact-info'>
                        <h6>Based in</h6>
                        <span><a href="https://maps.google.com/?q=Vrindavan, Mathura-281121" target="_blank" rel="noopener noreferrer" className="contact-link">Vrindavan, Mathura,</a></span>
                        <span><a href="https://maps.google.com/?q=Vrindavan, Mathura-281121" target="_blank" rel="noopener noreferrer" className="contact-link">281121</a></span>
                    </div>
                    <div className='contact-icon'>
                        <Link href='https://www.facebook.com/people/Shree-Kishori-Priya-Foundation/61557011483775/?mibextid=ZbWKwL' aria-label="Facebook">
                            <span>Facebook</span>
                        </Link>
                        <Link href='https://www.instagram.com/shreekishoripriya/?igsh=MzRlODBiNWFlZA%3D%3D' aria-label="Instagram">
                            <span>Instagram</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact