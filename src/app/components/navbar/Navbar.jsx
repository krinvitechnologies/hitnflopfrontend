'use client';

import React, { useEffect, useState } from "react";
import "./navbar.css";
import Link from 'next/link';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
// import { FaBars } from "react-icons/fa6";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Navbar = () => {

    const router = useRouter();

    const [isModalOpen, setModalOpen] = useState(false);
    // const token = Cookies.get("skpf_token");

    const [token, setToken] = useState(null);

    useEffect(() => {
        // const storedToken = localStorage.getItem('hitnflop_token');
        const storedToken = Cookies.get('hitnflop_token');
        setToken(storedToken);
    }, []);

    const handleFabarClick = () => {
        setModalOpen(true);
    };

    // const handleContactClick = () => {
    //     // Navigate to the home page
    //     router.push('/');

    //     // Scroll to the contact component
    //     const contactComponent = document.getElementById('contact');
    //     contactComponent.scrollIntoView({ behavior: "smooth" });
    // };
    const handleContactClick = () => {
        // Scroll to the contact component on the home page
        const contactComponent = document.getElementById('contact');
        if (contactComponent) {
            setModalOpen(false)
            contactComponent.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push('/'); // Navigate to home page if contact component is not found
        }
    };

    const handleCampaignsClick = () => {
        // Scroll to the campaigns component on the home page
        const campaignsComponent = document.getElementById('campaigns');
        if (campaignsComponent) {
            setModalOpen(false)
            campaignsComponent.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push('/');
        }
    };

    return (
        <div className="navbar">
            <div className="left">
                {/* <img src="/assets/logo.png" alt="" onClick={() => router.push('/')} />
                <img src="/assets/logo.webp" alt="" onClick={() => router.push('/')} /> */}
                <img src="/assets/logo/hitnflop.webp" alt="" onClick={() => router.push('/')} />
            </div>
            <div className="right">
                <div className="nav-opt" onClick={() => router.push('/')}>Movies</div>
                <div className="nav-opt" onClick={handleCampaignsClick}>Series</div>
                <div className="nav-opt" onClick={handleContactClick}>Watchlist</div>
                {token ? (
                    <div className="nav-opt" onClick={() => router.push('/profile')}>Profile</div>
                ) : (
                    <div className="nav-opt" onClick={() => router.push('/login')}>Login</div>
                )}

                <button onClick={handleFabarClick} className="nav-fabar">Bars</button>
                <Dialog
                    open={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    fullWidth={true} // Set to true to make the dialog take up the full width
                    maxWidth="xs"
                    PaperProps={{ style: { backgroundColor: '#F6F6F6', maxWidth: '300px', borderRadius: '20px' } }}
                >
                    <DialogContent>
                        <div className="modal-content">
                            <div className="nav-btn-cont-mob">
                                <Link href="/" className='nav-link'>
                                    <button className='nav-btn-mob'>Movies</button>
                                </Link>
                                <Link href="/" className='nav-link'>
                                    <button className='nav-btn-mob' onClick={handleCampaignsClick}>Series</button>
                                </Link>
                                <Link href="/" className='nav-link'>
                                    <button className='nav-btn-mob' onClick={handleContactClick}>Watchlist</button>
                                </Link>
                                {token ? (
                                    <button className='nav-btn-mob' onClick={() => router.push('/profile')}>Profile</button>
                                ) : (
                                    <button className='nav-btn-mob' onClick={() => router.push('/login')}>Login</button>
                                )}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
};

export default Navbar