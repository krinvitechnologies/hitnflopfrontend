'use client';

import React, { useEffect, useMemo, useState } from 'react';
import "./banner.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import { useRouter } from 'next/navigation';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Banner() {
    const router = useRouter();
    const [country, setCountry] = useState('Unknown');

    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            const data = await res.json();

            const newCountry = data.address.country || 'Unknown';
            setCountry(newCountry);
        });
    }, []);

    const bannersByCountry = {
        India: [
            { id: 0, webp: "/assets/banner/HitnFlop India Promotional Illustration.webp", alt: "Bhojan Daan" },
            { id: 1, webp: "/assets/banner/HitnFlop India Promotional Illustration.webp", alt: "Bhojan Daan" },
        ],
        "United Kingdom": [
            { id: 2, webp: "/assets/banner/HitnFlop UK Platform Promotion.webp", alt: "UK Banner" },
        ],
        "United States": [
            { id: 3, webp: "/assets/banner/HitnFlop_ United States Promo Design.webp", alt: "USA Banner" },
        ],
        Unknown: [
            { id: 4, webp: "/assets/banner/Revise, Watch, Earn Rewards.webp", alt: "Global Banner" },
        ]
    };

    const imageSlider = useMemo(() => {
        return bannersByCountry[country] || bannersByCountry["Unknown"];
    }, [country]);

    return (
        <div className='banner'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
            >
                {imageSlider.map((image) => (
                    <SwiperSlide key={image.id}>
                        <picture>
                            <img
                                src={image.webp}
                                alt={image.alt}
                                onClick={() => router.push('/')}
                            />
                            {/* <Image
                                src={image.webp}
                                alt={image.alt}
                                fill={true}
                                sizes="100vw"
                                style={{ objectFit: "cover", cursor: "pointer" }}
                                onClick={() => router.push('/')}
                            /> */}
                        </picture>
                        {/* <p className="text-sm mt-4 text-gray-500 text-center">
              Based on GPS, you're in <strong>{country}</strong>
            </p> */}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}



// 'use client';

// import React, { useEffect, useMemo } from 'react';
// import "./banner.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
// import SwiperCore from "swiper";
// import { useRouter } from 'next/navigation';
// import { cookies } from 'next/headers';
// import ClientLocationOverride from '../location/ClientLocationOverride';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// export default function Banner() {
//     const router = useRouter();
//     const country = cookies().get('country')?.value || 'Unknown';

//     // Define different banners for each country
//     const bannersByCountry = {
//         India: [
//             { id: 0, webp: "src/assets/banner/bhojan_daan.webp", png: "src/assets/banner/bhojan_daan.png", alt: "Bhojan Daan" },
//             { id: 1, webp: "src/assets/banner/adopt_mataji.webp", png: "src/assets/banner/mata ji.png", alt: "Adopt Mataji" },
//         ],
//         "United Kingdom": [
//             { id: 2, webp: "src/assets/banner/uk_banner.webp", png: "src/assets/banner/uk_banner.png", alt: "UK Banner" },
//         ],
//         "United States": [
//             { id: 3, webp: "src/assets/banner/usa_banner.webp", png: "src/assets/banner/usa_banner.png", alt: "USA Banner" },
//         ],
//         Unknown: [
//             { id: 4, webp: "src/assets/banner/global_banner.webp", png: "src/assets/banner/global_banner.png", alt: "Global Banner" },
//         ]
//     };

//     // Memoized list of banners based on country
//     const imageSlider = useMemo(() => {
//         return bannersByCountry[country] || bannersByCountry["Unknown"];
//     }, [country]);

//     const handleDonateNow = () => {
//         router.push('/');
//     };

//     // Preload images
//     useEffect(() => {
//         const preloads = imageSlider.map((image) => {
//             const link = document.createElement('link');
//             link.rel = 'preload';
//             link.href = image.webp;
//             link.as = 'image';
//             document.head.appendChild(link);
//             return link;
//         });

//         return () => {
//             preloads.forEach((link) => document.head.removeChild(link));
//         };
//     }, [imageSlider]);

//     return (
//         <div className='banner'>
//             <Swiper
//                 modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
//                 slidesPerView={1}
//                 loop={true}
//                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                 pagination={{ clickable: true }}
//             >
//                 {imageSlider.map((image) => (
//                     <SwiperSlide key={image.id}>
//                         <picture>
//                             <img
//                                 src={image.webp}
//                                 alt={image.alt}
//                                 onClick={handleDonateNow}
//                             />
//                             <ClientLocationOverride />
//                         </picture>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// }





// import { cookies } from 'next/headers';
// import ClientLocationOverride from '../location/ClientLocationOverride';
// // import ClientLocationOverride from '@/components/location/ClientLocationOverride';

// export default function Banner() {
//     const country = cookies().get('country')?.value || 'Unknown';

//     let content = <p>Welcome from somewhere unknown!</p>;
//     if (country === 'India') content = <p>Namaste! 🇮🇳 Special Indian Offers</p>;
//     else if (country === 'United Kingdom') content = <p>Hello UK! 🇬🇧 Check out our UK-specific deals</p>;
//     else if (country === 'United States') content = <p>Hi USA! 🇺🇸 Explore American products</p>;

//     return (
//         <main>
//             <h1>Location-Based Content</h1>
//             {content}
//             <ClientLocationOverride />
//         </main>
//     );
// }