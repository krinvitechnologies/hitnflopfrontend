'use client';

import React, { useEffect, useState } from 'react';
import SkeletonLoading from '@/src/app/components/skeletonLoading/SkeletonLoading';
import Navbar from '@/src/app/components/navbar/Navbar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../lib/store/features/review/reviewSlice';
import { getUser } from '../../lib/store/features/user/userSlice';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
// import Rating from '@mui/material/Rating';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

const tabs = [
    // { label: 'My Watchlist', value: 'my_watchlist' },
    { label: 'My Reviews', value: 'my_reviews' },
    // { label: 'My Likes', value: 'my_likes' }
];

const Profile = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { user } = useSelector((state) => state.user);
    const { reviews, loading } = useSelector((state) => state.review);
    const [activeTab, setActiveTab] = useState('my_reviews');

    useEffect(() => {
        if (activeTab === 'my_reviews') {
            dispatch(getReviews());
        }
    }, [activeTab, dispatch]);

    useEffect(() => {
        dispatch(getUser());
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="bg-[#0F1014] flex h-screen overflow-hidden flex-col w-full">
            <Navbar />

            <div className="bg-[#15161B] flex items-center justify-between gap-4 w-full p-4 max-sm:p-2 box-border">
                <div className="bg-[#15161B] flex items-center gap-4 w-full">
                    <span className='bg-[#1E2027] text-[#FFFFFF] rounded-full p-2 box-border'>
                        <PersonOutlineOutlinedIcon sx={{ fontSize: '3rem' }} />
                    </span>
                    <h4 className="text-[#FFFFFF] font-semibold"> {typeof user?.name === 'string'
                        ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                        : 'Guest'}</h4>
                </div>
                <div className="flex justify-end ">
                    <button
                        onClick={() => router.push('/review')}
                        className="flex items-center whitespace-nowrap cursor-pointer gap-1 bg-[#FF6D3E] hover:bg-[#e25c32] text-white font-medium font-[family-name:var(--font-roboto)] px-4 py-2 rounded-md transition duration-200"
                    >
                        <AddIcon />
                        Add Review
                    </button>
                </div>

            </div>

            <div className="flex justify-start space-x-4 px-4 pt-2 box-border my-2 border-3 border-[rgba(255, 255, 255, 0.38)]">
                {tabs.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => handleTabClick(value)}
                        className={`px-4 py-2 text-sm font-semibold transition-colors cursor-pointer duration-200 ${activeTab === value
                            ? 'border-b-2 border-[#FF6D3E] text-[#FF6D3E]'
                            : 'text-[#FFFFFF] hover:text-[#FF6D3E]'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="p-4 box-border flex flex-col max-md:w-full max-md:overflow-x-auto">
                {loading ? (
                    <div className="h-[69vh] w-full rounded-b-lg overflow-hidden">
                        <SkeletonLoading />
                    </div>
                ) : (
                    <div style={{
                        scrollbarWidth: 'none', /* Firefox */
                        msOverflowStyle: 'none' /* IE and Edge */,
                    }} className="bg-[#0F1014] h-[69vh] overflow-y-auto hide-scrollbar p-4 box-border text-white">
                        {activeTab === 'my_watchlist' && (
                            <div>Your watchlist goes here.</div>
                        )}
                        {activeTab === 'my_reviews' && (
                            <>
                                {reviews?.length > 0 ? (
                                    reviews.map((review) => (
                                        <div key={review._id} className="flex gap-4 mb-4 border-b border-gray-700 pb-3 box-border">
                                            <div>
                                                <span className="text-sm font-normal text-[#FFFFFF] font-[family-name:var(--font-roboto)] whitespace-nowrap py-1 px-2 box-border rounded-md" style={{ background: getRatingColor(review?.rating) }}>{review?.rating} <StarOutlineIcon sx={{ fontSize: '1rem' }} /></span>
                                                {/* <Rating value={Number(review.rating)} precision={0.5} readOnly style={{ color: getRatingColor(review?.rating), fontSize: '1rem' }} /> */}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-[#FFFFFF] font-[family-name:var(--font-roboto)]">{review?.movie?.charAt(0).toUpperCase() + review?.movie?.slice(1) || "Unknown Movie"}</h4>
                                                <p className="text-sm font-normal text-[#FFFFFF] font-[family-name:var(--font-roboto)]">{review?.description}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h3 className="text-lg font-semibold text-[#FFFFFF] font-[family-name:var(--font-roboto)]">No reviews yet.</h3>
                                )}
                            </>
                        )}
                        {activeTab === 'my_likes' && (
                            <div>Your liked items go here.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;

const getRatingColor = (rating) => {
    //  const Rating = Number(rating);
    switch (Number(rating)) {
        case 1:
            return '#D85E5E';
        case 2:
            return '#D85E5E';
        case 3:
            return '#E4B454';
        case 4:
            return '#27B357';
        case 5:
            return '#27B357';
        default:
            return '#868484';
    }
};




// 'use client';

// import React, { useState } from 'react';
// import SkeletonLoading from '@/src/app/components/skeletonLoading/SkeletonLoading';
// import Navbar from '@/src/app/components/navbar/Navbar';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import { useSelector } from 'react-redux';

// const tabs = [
//     // { label: 'My watchlist', value: 'my_watchlist' },
//     { label: 'My reviews', value: 'my_reviews' },
//     // { label: 'My likes', value: 'my_likes' }
// ];

// const Profile = () => {
//     const { user } = useSelector((state) => state.user);
//     const [activeTab, setActiveTab] = useState('my_watchlist');
//     const [loading, setLoading] = useState(false);

//     const handleTabClick = (tab) => {
//         setActiveTab(tab);
//     };

//     return (
//         <div className="bg-[#0F1014] max-lg:bg-[#F6F7F8] flex h-screen overflow-hidden flex-col w-full">
//             <div>
//                 <Navbar />
//             </div>
//             <div className="bg-[#15161B] max-lg:bg-[#15161B] flex items-center gap-4 w-full p-4 box-border">
//                 <span className='bg-[#1E2027] text-[#FFFFFF] rounded-full p-2 box-border '>
//                     <PersonOutlineOutlinedIcon sx={{ fontSize: '3rem' }} />
//                 </span>
//                 <h4 className="text-[#FFFFFF] font-semibold font-[family-name:var(--font-roboto)]">{user?.name ? `${user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}` : ''}</h4>
//             </div>

//             {/* Tabs Navigation */}
//             <div className="flex justify-start space-x-4 px-4 pt-2 box-border my-2 border-3 border-[rgba(255, 255, 255, 0.38)] ">
//                 {tabs.map(({ label, value }) => (
//                     <button
//                         key={value}
//                         onClick={() => handleTabClick(value)}
//                         className={`px-4 py-2 text-sm font-semibold transition-colors cursor-pointer duration-200 ${activeTab === value
//                             ? 'border-b-2 border-[#FF6D3E] text-[#FF6D3E]'
//                             : 'text-[#FFFFFF] hover:text-[#FF6D3E]'
//                             }`}
//                     >
//                         {label}
//                     </button>
//                 ))}
//             </div>


//             {/* Content Section */}
//             <div className="p-4 box-border flex flex-col max-md:w-full max-md:overflow-x-auto">
//                 {loading ? (
//                     <div className="h-[69vh] w-full rounded-b-lg overflow-hidden">
//                         <SkeletonLoading />
//                     </div>
//                 ) : (
//                     <div className="bg-[#0F1014] h-[69vh] overflow-y-auto hide-scrollbar p-4 box-border">
//                         {activeTab === 'my_watchlist' && (
//                             <div className="text-[#FFFFFF] font-semibold font-[family-name:var(--font-roboto)]">Your watchlist goes here.</div>
//                         )}
//                         {activeTab === 'my_reviews' && (
//                             <div className="text-[#FFFFFF] font-semibold font-[family-name:var(--font-roboto)]">Your reviews go here.</div>
//                         )}
//                         {activeTab === 'my_likes' && (
//                             <div className="text-[#FFFFFF] font-semibold font-[family-name:var(--font-roboto)]">Your liked items go here.</div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Profile;






// 'use client';

// import React from 'react'

// const [activeTab, setActiveTab] = useState < 'Teams' | 'Manage Role' > ('Teams');

// // Function to change the tab
// const handleTabClick = (tab: 'Teams' | 'Manage Role') => {
//     setActiveTab(tab);
// };
// const Profile = () => {
//     return (
//         <div className="bg-[#F2FAFF] max-lg:bg-[#F6F7F8] flex h-screen overflow-hidden flex-col w-full">
//             <div>
//             </div>
//             <div className='w-full '>
//                 <Header />
//                 <SettingMobileHeader />
//             </div>
//             <div className='p-4 box-border flex flex-col max-md:w-full max-md:overflow-x-auto'>


//                 {activeTab === 'Teams' && (
//                     // <Team />
//                     loading ?
//                         (<div className='h-[69vh] w-full rounded-b-lg overflow-hidden'>
//                             <SkeletonLoading />
//                         </div>) :
//                         (
//                             <div className="bg-[#FFFFFf] border border-[#AAADB1] rounded-b-lg overflow-hidden h-[69vh] overflow-y-auto max-lg:overflow-x-auto"
//                                 style={{
//                                     scrollbarWidth: 'none', /* Firefox */
//                                     msOverflowStyle: 'none' /* IE and Edge */,
//                                 }}>

//                             </div>
//                         )
//                 )}

//                 {activeTab === 'Manage Role' && (
//                     loading ?
//                         (<div className='h-[69vh] w-full rounded-b-lg overflow-hidden'>
//                             <SkeletonLoading />
//                         </div>) :
//                         (
//                             <ManageRole />
//                         )
//                 )}

//             </div>
//         </div>
//     )
// }

// export default Profile