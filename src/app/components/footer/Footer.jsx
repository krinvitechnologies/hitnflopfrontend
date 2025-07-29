import React, { useState } from 'react'
import "./footer.css"
// import { FaTelegramPlane } from "react-icons/fa";
// import { FaFacebook, FaInstagram, FaLocationDot, FaPhone } from 'react-icons/fa6';
// import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from "validator";
// import { axiosRequest } from '../../services/ApiCall';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 

const Footer = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State variable to track loading state

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!mobile.trim()) {
                toast.error('Phone number is required');
            } else if (!validator.isMobilePhone(mobile, 'en-IN')) {
                toast.error('Please enter a valid Phone Number');
            } else {
                // const response = await axiosRequest.post('/subscribe', {
                //     mobile,
                // });
                toast.success(response?.data?.message);
                // Reset the fields after the request success
                // setEmail('');
                setMobile('');
            }
        } catch (error) {
            if (error.response) {
                toast.error(error?.response?.data?.message);
            } else if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error('Something went wrong. Please try again!');
            }
        } finally {
            setIsLoading(false); // Set loading state to false when API call completes
        }
    };

    const handleContactClick = () => {
        // Scroll to the contact component on the home page
        const contactComponent = document.getElementById('contact');
        if (contactComponent) {
            // setModalOpen(false)
            contactComponent.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push('/'); // Navigate to home page if contact component is not found
            setTimeout(() => {
                const contactComponent = document.getElementById('contact');
                if (contactComponent) {
                    contactComponent.scrollIntoView({ behavior: "smooth" });
                }
            }, 500);
        }
    };
    // const handleContactClick = () => {
    //     if (window.location.pathname === '/') {
    //         // If already on the home page, just scroll
    //         const contactComponent = document.getElementById('contact');
    //         if (contactComponent) {
    //             contactComponent.scrollIntoView({ behavior: "smooth" });
    //         }
    //     } else {
    //         // Navigate to home, then scroll after page loads
    //         navigate('/');
    //         setTimeout(() => {
    //             const contactComponent = document.getElementById('contact');
    //             if (contactComponent) {
    //                 contactComponent.scrollIntoView({ behavior: "smooth" });
    //             }
    //         }, 500); // Delay to ensure the home page is rendered
    //     }
    // };


    const handleCampaignsClick = () => {
        // Scroll to the campaigns component on the home page
        const campaignsComponent = document.getElementById('campaigns');
        if (campaignsComponent) {
            // setModalOpen(false)
            campaignsComponent.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push('/');
            setTimeout(() => {
                const campaignsComponent = document.getElementById('campaigns');
                if (campaignsComponent) {
                    campaignsComponent.scrollIntoView({ behavior: "smooth" });
                }
            }, 500);
        }
    };

    return (
        <div className="footer">
            <div className="footer-cont">
                <div className="footer-item">
                    <img src="/assets/logo.png" alt="SKP" />
                    <p>Shree Kishori Priya Foundation is a sanctuary
                        of care and compassion, dedicated to
                        providing elderly women with dignity,
                        empowerment, amd a vibrant community.
                    </p>
                </div>

                <div className="footer-menu-list">
                    <span onClick={() => router.push('/faq')}>FAQs</span>
                    <span onClick={() => router.push('/blog')}>Blogs</span>
                    <span onClick={handleContactClick}>Contact</span>
                    {/* <span>Latest News</span> */}
                    <span onClick={handleCampaignsClick}>Campaigns</span>
                    {/* <span>Donations</span> */}
                    <span onClick={() => router.push('/privacy-policy')}>Privacy Policy</span>
                    <span onClick={() => router.push('/terms-and-conditions')}>Terms & Conditions</span>
                    <span onClick={() => router.push('/refund-policy')}>Refund Policy</span>
                </div>

                <div className="footer-subscribe-cont">
                    <div className='fs-cont'>
                        {/* <label>Subscribe to our daily news updates</label> */}
                        <label>Connect us with our WhatsApp group for updates</label>
                        <div className='fs-input-cont'>
                            <input type="tel" placeholder="Enter phone number" className="search-input" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                            {isLoading ? (
                                <span><ClipLoader color="#F6F6F6" /></span>
                            ) : (
                                // <span onClick={handleSubscribe} disabled={isLoading}><FaTelegramPlane /></span>
                                <span onClick={handleSubscribe} disabled={isLoading}>T</span>
                            )}
                        </div>
                    </div>
                    <div className='right-bottom-fc'>
                        <div className='footer-location'>
                            {/* <h6><span><FaLocationDot /></span><a href="https://maps.google.com/?q=Vrindavan, Mathura-281121" target="_blank" rel="noopener noreferrer" className="flink">Vrindavan, Mathura, 281121</a></h6>
                            <h6><span><FaPhone /></span><a href="tel:+91 8979545845" className='flink'>+91-8979545845</a></h6> */}
                        </div>
                        <div className='footer-share-icon'>
                            <Link href='https://www.facebook.com/people/Shree-Kishori-Priya-Foundation/61557011483775/?mibextid=ZbWKwL' aria-label="Facebook">
                                {/* <span><FaFacebook /></span> */}
                            </Link>
                            <Link href='https://www.instagram.com/shreekishoripriya/?igsh=MzRlODBiNWFlZA%3D%3D' aria-label="Instagram">
                                {/* <span><FaInstagram /></span> */}
                            </Link>
                            {/* <span><FaTwitter /></span> */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer