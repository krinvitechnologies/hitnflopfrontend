'use client';

import React, { useState, useRef, useEffect } from 'react';
import aboutImage from '../../assets/about/about.webp';

const About = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef(null);

    const handleVideoLoad = () => {
        setIsVideoLoaded(true);
    };

    useEffect(() => {
        const handleTimeUpdate = () => {
            if (videoRef.current) {
                const video = videoRef.current;
                if (video.currentTime >= video.duration) {
                    video.currentTime = 0;
                    video.play();
                }
            }
        };

        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, []);

    return (
        <div className="flex flex-col md:flex-row px-4 md:px-5 py-8 bg-[#0F1014] box-border">
            <div className="w-full md:w-1/2">
                <div className="flex justify-center items-center w-full">
                    {/* Video or fallback image */}
                    <div className="block md:hidden w-full max-w-[500px] min-w-[220px]">
                        <img src={aboutImage} alt="About" className="w-full" />
                    </div>

                    <div className="hidden md:block w-full max-w-[400px] min-w-[220px]">
                        {!isVideoLoaded && (
                            <img src={aboutImage} alt="About" className="w-full" />
                        )}
                        <video
                            ref={videoRef}
                            src="/assets/about.webm"
                            onCanPlayThrough={handleVideoLoad}
                            autoPlay
                            loop
                            muted
                            style={{ display: isVideoLoaded ? 'block' : 'none' }}
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 max-w-[550px] flex flex-col justify-center gap-4 mt-4 md:mt-0 px-1">
                <h5 className="text-[#FF6D3E] text-start font-schoolbell text-base m-0">
                    - About Us
                </h5>
                <h1 className="text-[#FFFFFF] text-start font-nunito text-2xl font-bold m-0">
                    Discover the Pulse of Entertainment
                </h1>
                <p className="text-[#FFFFFF] text-justify font-nunito text-base font-normal m-0">
                    Welcome to Hitnflop – your ultimate destination for everything entertainment. From the latest movie releases to trending web series, celebrity buzz, reviews, and box office reports, we bring you the most accurate and engaging content all in one place.
                </p>
                <h6 className="text-[#FF6D3E] text-start font-nunito text-base font-semibold m-0">
                    Our Mission
                </h6>
                <p className="text-[#FFFFFF] text-justify font-nunito text-base font-normal m-0">
                    Our mission is to be the most trusted and entertaining source for movie ratings, reviews, and entertainment news. At Hitnflop, we believe in honest opinions, detailed insights, and real-time updates that help our audience stay ahead in the world of films and digital entertainment.
                </p>
            </div>
        </div>
    );
};

export default About;







// import React, { useState } from 'react';
// import "./about.css";

// const About = () => {
//     const [isVideoLoaded, setIsVideoLoaded] = useState(false);

//     const handleVideoLoad = () => {
//         setIsVideoLoaded(true);
//     };

//     return (
//         <div className='about'>
//             <div className="left-about">
//                 <div className="left-about-img-cont">
//                     {!isVideoLoaded && <img src="/assets/about.webp" alt="About" />}
//                     <video
//                         src="/assets/about.webm"
//                         alt="About us"
//                         style={{ display: isVideoLoaded ? 'block' : 'none' }}
//                         onCanPlayThrough={handleVideoLoad}
//                         autoPlay
//                         loop
//                         muted
//                     />
//                 </div>
//             </div>
//             <div className="right-about">
//                 <h5>- About Us</h5>
//                 <h1>Get To Know About Us</h1>
//                 <p>At Kishori Priya Foundation, we believe in honoring and cherishing the elderly by providing them with a loving and caring home where they can live their lives with dignity and respect. Named after Shree Radha Rani, our foundation is nestled in the serene surroundings of Mathura Vrindavan, known for its spiritual significance and peaceful atmosphere.  </p>
//                 <h6>Our Mission</h6>
//                 <p> Our mission is simple yet profound: to provide a safe, comfortable, and nurturing environment for senior citizens who deserve the best care and attention in their golden years. We are committed to ensuring that every resident at Kishori Priya Foundation feels loved, valued, and part of a caring community.</p>
//             </div>
//         </div>
//     );
// };

// export default About;



// import React, { useState } from 'react'
// import "./about.css"

// const About = () => {

//     const [isGifLoaded, setIsGifLoaded] = useState(false);

//     const handleGifLoad = () => {
//         setIsGifLoaded(true);
//     };

//     return (
//         <div className='about'>
//             <div className="left-about">
//                 <div className="left-about-img-cont">
//                     {/* <img src="/assets/about.gif" alt="" /> */}
//                     {!isGifLoaded && <img src="/assets/about.webp" alt="About" />}
//                     <img
//                         src="/assets/about.gif"
//                         alt="About us"
//                         style={{ display: isGifLoaded ? 'block' : 'none' }}
//                         onLoad={handleGifLoad}
//                     />
//                 </div>
//             </div>
//             <div className="right-about">
//                 <h5>- About Us</h5>
//                 <h1>Get To Know About Us</h1>
//                 <p>At Kishori Priya Foundation, we believe in honoring and cherishing the elderly by providing them with a loving and caring home where they can live their lives with dignity and respect. Named after Shree Radha Rani, our foundation is nestled in the serene surroundings of Mathura Vrindavan, known for its spiritual significance and peaceful atmosphere.  </p>
//                 <h6>Our Mission</h6>
//                 <p> Our mission is simple yet profound: to provide a safe, comfortable, and nurturing environment for senior citizens who deserve the best care and attention in their golden years. We are committed to ensuring that every resident at Kishori Priya Foundation feels loved, valued, and part of a caring community.</p>
//             </div>
//         </div>
//     )
// }

// export default About