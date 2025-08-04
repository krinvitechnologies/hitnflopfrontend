'use client';

import React, { useEffect, useState } from 'react';
import SkeletonLoading from '@/src/app/components/skeletonLoading/SkeletonLoading';
import Navbar from '@/src/app/components/navbar/Navbar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useSelector, useDispatch } from 'react-redux';
// import { getReviews } from '@/src/app/redux/slices/reviewSlice';
import { getReviews } from '../../lib/store/features/review/reviewSlice';
import { getUser } from '../../lib/store/features/user/userSlice';

const tabs = [
    // { label: 'My watchlist', value: 'my_watchlist' },
    { label: 'My reviews', value: 'my_reviews' },
    // { label: 'My likes', value: 'my_likes' }
];

const Profile = () => {
    const dispatch = useDispatch();
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
        <div className="bg-[#0F1014] max-lg:bg-[#F6F7F8] flex h-screen overflow-hidden flex-col w-full">
            <Navbar />

            <div className="bg-[#15161B] flex items-center gap-4 w-full p-4 box-border">
                <span className='bg-[#1E2027] text-[#FFFFFF] rounded-full p-2 box-border'>
                    <PersonOutlineOutlinedIcon sx={{ fontSize: '3rem' }} />
                </span>
                <h4 className="text-[#FFFFFF] font-semibold"> {typeof user?.name === 'string'
                    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                    : 'Guest'}</h4>
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
                    <div className="bg-[#0F1014] h-[69vh] overflow-y-auto hide-scrollbar p-4 box-border text-white">
                        {activeTab === 'my_watchlist' && (
                            <div>Your watchlist goes here.</div>
                        )}
                        {activeTab === 'my_reviews' && (
                            <>
                                {reviews?.length > 0 ? (
                                    reviews.map((review) => (
                                        <div key={review._id} className="mb-4 border-b border-gray-700 pb-3">
                                            <h4 className="text-lg font-semibold">{review?.movie || "Unknown Movie"}</h4>
                                            <p className="text-sm text-gray-300">{review?.description}</p>
                                            <p className="text-sm text-yellow-400">Rating: {review?.rating}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews yet.</p>
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