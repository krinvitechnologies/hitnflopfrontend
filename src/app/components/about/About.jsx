import React, { useState, useRef, useEffect } from 'react';
import "./about.css";

// 🖼️ Importing image from src/assets
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
        <div className='about'>
            <div className="left-about">
                <div className="left-about-img-cont">
                    <div className='about-gif'>
                        {!isVideoLoaded && <img src={aboutImage} alt="About" />}
                        <video
                            ref={videoRef}
                            src="/assets/about.webm"  // Keep this in public if you want to lazy load it statically
                            alt="About us"
                            style={{ display: isVideoLoaded ? 'block' : 'none' }}
                            onCanPlayThrough={handleVideoLoad}
                            autoPlay
                            loop
                            muted
                        />
                    </div>
                    <div className='about-gif-image'>
                        <img src={aboutImage} alt="About" />
                    </div>
                </div>
            </div>
            <div className="right-about">
                <h5>- About Us</h5>
                <h1>Get To Know About Us</h1>
                <p>At Shree Kishori Priya Foundation, we believe in honoring and cherishing the elderly by providing them with a loving and caring home where they can live their lives with dignity and respect. Named after Shree Radha Rani, our foundation is nestled in the serene surroundings of Mathura Vrindavan, known for its spiritual significance and peaceful atmosphere.  </p>
                <h6>Our Mission</h6>
                <p> Our mission is simple yet profound: to provide a safe, comfortable, and nurturing environment for senior citizens who deserve the best care and attention in their golden years. We are committed to ensuring that every resident at Kishori Priya Foundation feels loved, valued, and part of a caring community.</p>
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