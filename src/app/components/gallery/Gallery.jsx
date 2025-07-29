'use client';

import React, { useState, useEffect } from 'react';
import "./gallery.css";
import { LinearProgress, Skeleton } from '@mui/material';
import { ClipLoader } from "react-spinners";
import Link from 'next/link';
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import { CAMPAIGN_IMAGE_URL } from '../../service/helper';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const galleryData = [
    {
        _id: "1",
        campaignName: "Food Distribution",
        description: "Providing nutritious meals to the underprivileged.",
        image: "food.webp",
        raised: 12000,
        goal: 25000,
    },
    {
        _id: "2",
        campaignName: "Education Support",
        description: "Helping children get access to quality education.",
        image: "education.webp",
        raised: 18000,
        goal: 30000,
    },
    {
        _id: "3",
        campaignName: "Old Age Support",
        description: "Supporting senior citizens with daily essentials.",
        image: "elderly.webp",
        raised: 9500,
        goal: 20000,
    },
];

const Gallery = () => {
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState({});

    useEffect(() => {
        if (galleryData && galleryData.length > 0) {
            setLoading(false);
        }
    }, []);

    // useEffect(() => {
    //     if (campaigns && campaigns.length > 0) {
    //         setLoading(false);
    //     }
    // }, [campaigns]);

    const normalizeText = (text) => text.toLowerCase();

    // const filteredCampaigns = campaigns?.filter(campaign => normalizeText(campaign?.campaignArea) === normalizeText(activeTab));

    const handleImageLoad = (id) => {
        setImageLoading(prev => ({ ...prev, [id]: false }));
    };

    return (
        <div className='campaigns' id="campaigns">
            <div className='campaigns-header'>
                <h6>- Gallery</h6>
                <h1>Our Gallery</h1>
            </div>

            <div className='campaigns-cards-cont'>
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
                            960: { slidesPerView: 2 },
                            1200: { slidesPerView: 2 },
                            2000: { slidesPerView: 3 },
                        }}
                        className='campaigns-cards-cont'
                    >
                        {/* {campaigns.map((campaign) => { */}
                        {galleryData.map((campaign) => {
                            const completionPercentage = (campaign.raised / campaign.goal) * 100;
                            return (
                                <SwiperSlide key={campaign._id} className="campaigns-card" >
                                    {/* <SwiperSlide key={campaign._id} className="campaigns-swiper-slide" > */}
                                    {/* <div> */}
                                    <div className='campign-card-img'>
                                        {/* <img src={campaign.image} alt="" /> */}
                                        {/* <img src={`/assets/campaigns/${campaign?.campaignName}.webp`} alt={campaign?.campaignName} /> */}
                                        {imageLoading[campaign._id] !== false && (
                                            <Skeleton variant="rectangular" width="100%" height={160} />
                                        )}
                                        <img
                                            // src={`/assets/campaigns/${campaign?.campaignName}.webp`}
                                            src={`${CAMPAIGN_IMAGE_URL}/${campaign?.image}`}
                                            alt={campaign?.campaignName}
                                            style={{ display: imageLoading[campaign._id] ? 'none' : 'block' }}
                                            onLoad={() => handleImageLoad(campaign._id)}
                                        />
                                        <div className='curve-image'>
                                            <img src="/assets/curve.svg" alt="" />
                                        </div>
                                    </div>
                                    <div className='campign-card-bottom'>
                                        {/* <div className='curved-shape'> */}
                                        <div className='campign-card-headline'>
                                            <h5>{campaign.campaignName}</h5>
                                        </div>
                                        <div className='campign-card-info'>
                                            <span>{campaign.description}</span>
                                        </div>
                                        <div className='hlc-profile-progress'>
                                            <LinearProgress
                                                variant="determinate"
                                                value={completionPercentage}
                                                aria-label={`Campaign progress: ${completionPercentage}%`}
                                                sx={{
                                                    height: 4, // Set the height of the progress bar
                                                    borderRadius: 5, // Set the border radius
                                                    bgcolor: '#DDDDDD', // Set the background color
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: '#4496D2', // Set the progress bar color
                                                    },
                                                }}
                                            />
                                            <div className='campign-card-price-cont'>
                                                <div className='campign-card-price'>
                                                    <span>Raised:</span>
                                                    <p>&#x20B9; {campaign.raised}</p>
                                                </div>
                                                <div className='campign-card-price'>
                                                    <span>Goal:</span>
                                                    <p>&#x20B9; {campaign.goal}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='campign-card-btn'>
                                            <Link href="/donate">
                                                <button>Donate Now</button>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                )}
            </div>
        </div >
    );
};

export default Gallery;
