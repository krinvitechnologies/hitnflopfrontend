'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { createSubscribe } from '../../lib/store/features/subscribe/subscribeSlice';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Email is required.");
            return;
        }

        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);

        try {
            const result = await dispatch(createSubscribe({ email }));

            if (createSubscribe.fulfilled.match(result)) {
                toast.success("Subscribed successfully!");
                setEmail('');
            } else {
                toast.error(result.payload || "Subscription failed. Please try again.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const scrollToComponent = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push('/');
            setTimeout(() => {
                const delayedElement = document.getElementById(id);
                if (delayedElement) {
                    delayedElement.scrollIntoView({ behavior: "smooth" });
                }
            }, 500);
        }
    };

    return (
        <div className="bg-[#0F1014] p-10 max-md:p-6 box-border">
            <div className="flex flex-wrap md:flex-nowrap justify-evenly gap-6">
                <div className="max-w-sm flex flex-col gap-3">
                    <img src="/assets/logo/hitnflop.webp" alt="hitnflop" className="w-44 cursor-pointer" onClick={() => router.push('/')} />
                    <p className="text-white font-[family-name:var(--font-inter)] text-base font-semibold text-start">
                        HitnFlop is your ultimate destination for sharing honest reviews on movies and web series. Watch, review, and earn rewards while helping others discover what’s worth watching.
                    </p>
                </div>

                <div className="flex flex-col gap-3 justify-start">
                    {['FAQs', 'Blogs', 'Contact', 'Campaigns', 'Privacy Policy', 'Terms & Conditions', 'Refund Policy'].map((item, idx) => (
                        <span
                            key={idx}
                            onClick={() => {
                                if (item === 'Contact') scrollToComponent('contact');
                                else if (item === 'Campaigns') scrollToComponent('campaigns');
                                else router.push(`/${item.toLowerCase().replace(/ /g, '-')}`);
                            }}
                            className="text-white font-[family-name:var(--font-inter)] text-base font-semibold text-start cursor-pointer"
                        >
                            {item}
                        </span>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-white font-[family-name:var(--font-inter)] text-base font-semibold mb-3 text-start">
                            Subscribe to our email updates
                        </label>
                        <div className="flex items-center border-2 border-[#4496D2] rounded-full h-11 w-full">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 bg-transparent text-[#8E8787] font-[family-name:var(--font-inter)] text-base font-semibold px-3 outline-none border-none"
                            />
                            <span
                                onClick={handleSubscribe}
                                className="bg-[#4496D2] text-[#ECF7FF] w-10 h-full rounded-full flex justify-center items-center cursor-pointer"
                            >
                                {isLoading ? <ClipLoader color="#F6F6F6" size={20} /> : <SendIcon />}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                        <div className="flex flex-col items-center md:items-start">
                            {/* Add contact/location info if needed */}
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <Link
                                href='https://www.facebook.com/people/Shree-Kishori-Priya-Foundation/61557011483775/'
                                aria-label="Facebook"
                                className="bg-[#4496D2] text-[#ECF7FF] rounded-full p-2 text-sm font-semibold flex justify-center items-center cursor-pointer"
                            >F</Link>
                            <Link
                                href='https://www.instagram.com/shreekishoripriya/'
                                aria-label="Instagram"
                                className="bg-[#4496D2] text-[#ECF7FF] rounded-full p-2 text-sm font-semibold flex justify-center items-center cursor-pointer"
                            >I</Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;



// 'use client';

// import React, { useState } from 'react';
// import "./footer.css";
// import { toast } from 'react-toastify';
// import { ClipLoader } from 'react-spinners';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useDispatch } from 'react-redux';
// import { createSubscribe } from '../../lib/store/features/subscribe/subscribeSlice';
// import SendIcon from '@mui/icons-material/Send';

// const Footer = () => {
//     const router = useRouter();
//     const dispatch = useDispatch();

//     const [email, setEmail] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     // 🔹 Email Regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     // 🔹 Subscribe Handler
//     const handleSubscribe = async (e) => {
//         e.preventDefault();

//         if (!email.trim()) {
//             toast.error("Email is required.");
//             return;
//         }

//         if (!emailRegex.test(email)) {
//             toast.error("Please enter a valid email address.");
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const result = await dispatch(createSubscribe({ email }));

//             if (createSubscribe.fulfilled.match(result)) {
//                 toast.success("Subscribed successfully!");
//                 setEmail('');
//             } else {
//                 toast.error(result.payload || "Subscription failed. Please try again.");
//             }
//         } catch (error) {
//             toast.error("Something went wrong. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const scrollToComponent = (id) => {
//         const element = document.getElementById(id);
//         if (element) {
//             element.scrollIntoView({ behavior: "smooth" });
//         } else {
//             router.push('/');
//             setTimeout(() => {
//                 const delayedElement = document.getElementById(id);
//                 if (delayedElement) {
//                     delayedElement.scrollIntoView({ behavior: "smooth" });
//                 }
//             }, 500);
//         }
//     };

//     return (
//         <div className="footer">
//             <div className="footer-cont">
//                 <div className="footer-item">
//                     <img src="/assets/logo/hitnflop.webp" alt="hitnflop" onClick={() => router.push('/')} />
//                     <p>HitnFlop is your ultimate destination for sharing honest reviews on movies and web series. Watch, review, and earn rewards while helping others discover what’s worth watching.</p>
//                 </div>

//                 <div className="footer-menu-list">
//                     <span onClick={() => router.push('/faq')}>FAQs</span>
//                     <span onClick={() => router.push('/blog')}>Blogs</span>
//                     <span onClick={() => scrollToComponent('contact')}>Contact</span>
//                     <span onClick={() => scrollToComponent('campaigns')}>Campaigns</span>
//                     <span onClick={() => router.push('/privacy-policy')}>Privacy Policy</span>
//                     <span onClick={() => router.push('/terms-and-conditions')}>Terms & Conditions</span>
//                     <span onClick={() => router.push('/refund-policy')}>Refund Policy</span>
//                 </div>

//                 <div className="footer-subscribe-cont">
//                     <div className='fs-cont'>
//                         <label>Subscribe to our email updates</label>
//                         <div className='fs-input-cont'>
//                             <input
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 className="search-input"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             {isLoading ? (
//                                 <span><ClipLoader color="#F6F6F6" size={20} /></span>
//                             ) : (
//                                 <span onClick={handleSubscribe} disabled={isLoading} style={{ cursor: 'pointer' }}>
//                                     <SendIcon />
//                                 </span>
//                             )}
//                         </div>
//                     </div>

//                     <div className='right-bottom-fc'>
//                         <div className='footer-location'>
//                             {/* Add location or contact details if needed */}
//                         </div>
//                         <div className='footer-share-icon'>
//                             <Link href='https://www.facebook.com/people/Shree-Kishori-Priya-Foundation/61557011483775/' aria-label="Facebook" />
//                             <Link href='https://www.instagram.com/shreekishoripriya/' aria-label="Instagram" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Footer;





// 'use client';

// import React, { useState } from 'react'
// import "./footer.css"
// // import { FaTelegramPlane } from "react-icons/fa";
// // import { FaFacebook, FaInstagram, FaLocationDot, FaPhone } from 'react-icons/fa6';
// // import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// // import validator from "validator";
// // import { axiosRequest } from '../../services/ApiCall';
// import { ClipLoader } from 'react-spinners';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { createSubscribe } from '../../lib/store/features/subscribe/subscribeSlice';

// const Footer = () => {

//     const router = useRouter();

//     const [email, setEmail] = useState('');
//     const [mobile, setMobile] = useState('');
//     const [isLoading, setIsLoading] = useState(false); // State variable to track loading state

//     const handleSubscribe = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         try {
//              const payload = {
//             ...reviewForm,
//             rating: value,
//             movie: selectedMovie,
//         };
        
//             const result = await dispatch(createSubscribe(payload));
//             if (addReview.fulfilled.match(result)) {
//                 toast.success('Review submitted successfully!');
//                 setReviewForm({  email: '' });
//             } else {
//                 toast.error(result.payload || 'Submission failed. Please try again.');
//             }
//         } catch (error) {
//             if (error.response) {
//                 toast.error(error?.response?.data?.message);
//             } else if (error?.response?.data?.message) {
//                 toast.error(error?.response?.data?.message);
//             } else {
//                 toast.error('Something went wrong. Please try again!');
//             }
//         } finally {
//             setIsLoading(false); // Set loading state to false when API call completes
//         }
//     };

//     const handleContactClick = () => {
//         // Scroll to the contact component on the home page
//         const contactComponent = document.getElementById('contact');
//         if (contactComponent) {
//             // setModalOpen(false)
//             contactComponent.scrollIntoView({ behavior: "smooth" });
//         } else {
//             router.push('/'); // Navigate to home page if contact component is not found
//             setTimeout(() => {
//                 const contactComponent = document.getElementById('contact');
//                 if (contactComponent) {
//                     contactComponent.scrollIntoView({ behavior: "smooth" });
//                 }
//             }, 500);
//         }
//     };
//     // const handleContactClick = () => {
//     //     if (window.location.pathname === '/') {
//     //         // If already on the home page, just scroll
//     //         const contactComponent = document.getElementById('contact');
//     //         if (contactComponent) {
//     //             contactComponent.scrollIntoView({ behavior: "smooth" });
//     //         }
//     //     } else {
//     //         // Navigate to home, then scroll after page loads
//     //         navigate('/');
//     //         setTimeout(() => {
//     //             const contactComponent = document.getElementById('contact');
//     //             if (contactComponent) {
//     //                 contactComponent.scrollIntoView({ behavior: "smooth" });
//     //             }
//     //         }, 500); // Delay to ensure the home page is rendered
//     //     }
//     // };


//     const handleCampaignsClick = () => {
//         // Scroll to the campaigns component on the home page
//         const campaignsComponent = document.getElementById('campaigns');
//         if (campaignsComponent) {
//             // setModalOpen(false)
//             campaignsComponent.scrollIntoView({ behavior: "smooth" });
//         } else {
//             router.push('/');
//             setTimeout(() => {
//                 const campaignsComponent = document.getElementById('campaigns');
//                 if (campaignsComponent) {
//                     campaignsComponent.scrollIntoView({ behavior: "smooth" });
//                 }
//             }, 500);
//         }
//     };

//     return (
//         <div className="footer">
//             <div className="footer-cont">
//                 <div className="footer-item">
//                     <img src="/assets/logo/hitnflop.webp" alt="hitnflop" onClick={() => router.push('/')} />
//                     <p>HitnFlop is your ultimate destination for sharing honest reviews on movies and web series. Watch, review, and earn rewards while helping others discover what’s worth watching.</p>
//                 </div>

//                 <div className="footer-menu-list">
//                     <span onClick={() => router.push('/faq')}>FAQs</span>
//                     <span onClick={() => router.push('/blog')}>Blogs</span>
//                     <span onClick={handleContactClick}>Contact</span>
//                     {/* <span>Latest News</span> */}
//                     <span onClick={handleCampaignsClick}>Campaigns</span>
//                     {/* <span>Donations</span> */}
//                     <span onClick={() => router.push('/privacy-policy')}>Privacy Policy</span>
//                     <span onClick={() => router.push('/terms-and-conditions')}>Terms & Conditions</span>
//                     <span onClick={() => router.push('/refund-policy')}>Refund Policy</span>
//                 </div>

//                 <div className="footer-subscribe-cont">
//                     <div className='fs-cont'>
//                         {/* <label>Subscribe to our daily news updates</label> */}
//                         <label>Connect us with our WhatsApp group for updates</label>
//                         <div className='fs-input-cont'>
//                             <input type="tel" placeholder="Enter phone number" className="search-input" value={mobile} onChange={(e) => setMobile(e.target.value)} />
//                             {isLoading ? (
//                                 <span><ClipLoader color="#F6F6F6" /></span>
//                             ) : (
//                                 // <span onClick={handleSubscribe} disabled={isLoading}><FaTelegramPlane /></span>
//                                 <span onClick={handleSubscribe} disabled={isLoading}>T</span>
//                             )}
//                         </div>
//                     </div>
//                     <div className='right-bottom-fc'>
//                         <div className='footer-location'>
//                             {/* <h6><span><FaLocationDot /></span><a href="https://maps.google.com/?q=Vrindavan, Mathura-281121" target="_blank" rel="noopener noreferrer" className="flink">Vrindavan, Mathura, 281121</a></h6>
//                             <h6><span><FaPhone /></span><a href="tel:+91 8979545845" className='flink'>+91-8979545845</a></h6> */}
//                         </div>
//                         <div className='footer-share-icon'>
//                             <Link href='https://www.facebook.com/people/Shree-Kishori-Priya-Foundation/61557011483775/?mibextid=ZbWKwL' aria-label="Facebook">
//                                 {/* <span><FaFacebook /></span> */}
//                             </Link>
//                             <Link href='https://www.instagram.com/shreekishoripriya/?igsh=MzRlODBiNWFlZA%3D%3D' aria-label="Instagram">
//                                 {/* <span><FaInstagram /></span> */}
//                             </Link>
//                             {/* <span><FaTwitter /></span> */}
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Footer