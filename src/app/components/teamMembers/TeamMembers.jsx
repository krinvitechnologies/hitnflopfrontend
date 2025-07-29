import React, { useState, useEffect } from 'react';
import "./teammembers.css";
import { Skeleton } from '@mui/material';
import { ClipLoader } from "react-spinners";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import teamMembers from './teamMember.js';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const TeamMembers = () => {
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState({});

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading
        return () => clearTimeout(timer);
    }, []);

    const handleImageLoad = (id) => {
        setImageLoading(prev => ({ ...prev, [id]: false }));
    };

    return (
        <div className='members'>
            <div className='members-header'>
                <h6>- Team Members</h6>
                <h1>Meet the Souls Behind Our Journey</h1>
            </div>

            <div className='members-cards-cont'>
                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '80vh',
                    }}>
                        <ClipLoader color="#4496D2" />
                    </div>
                ) : (
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        // slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        // pagination={{ clickable: true }}
                        navigation={true}
                        spaceBetween={10}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            960: { slidesPerView: 3 },
                            1200: { slidesPerView: 3 },
                            2000: { slidesPerView: 4 },
                        }}
                        className='members-cards-cont'
                    >
                        {teamMembers.map((member) => (
                            <SwiperSlide key={member._id} className="members-card" >
                                <div className='member-card-img'>
                                    {/* <img src={campaign.image} alt="" /> */}
                                    {/* <img src={`/assets/campaigns/${campaign?.campaignName}.webp`} alt={campaign?.campaignName} /> */}
                                    {imageLoading[member._id] !== false && (
                                        <Skeleton variant="rectangular" width="100%" height={160} />
                                    )}
                                    <img
                                        // src={`/assets/campaigns/${campaign?.campaignName}.webp`}
                                        src={member.img}
                                        alt={member.name}
                                        style={{ display: imageLoading[member._id] ? 'none' : 'block' }}
                                        onLoad={() => handleImageLoad(member._id)}
                                    />
                                    <div className='member-curve-image'>
                                        <img src="/assets/curve.svg" alt="" />
                                    </div>
                                </div>
                                <div className='member-card-bottom'>
                                    {/* <div className='curved-shape'> */}
                                    <div className='member-card-headline'>
                                        <h5>{member.name}</h5>
                                    </div>
                                    <div className='member-card-info'>
                                        <span>{member.address}</span>
                                    </div>
                                    <div className='member-card-info'>
                                        <span>{member.designation}</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div >
    );
};

export default TeamMembers;