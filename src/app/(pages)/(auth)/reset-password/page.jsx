'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '@/src/app/lib/store/features/user/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

const ResetPasswordPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [input, setInput] = useState({ email: '' });
    const [loading, setLoading] = useState(false);

    const _onChange = useCallback((event) => {
        const { name, value } = event.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const _onVerifyEmail = async () => {
        try {
            const result = await dispatch(forgotPassword(input.email));
            if (forgotPassword.fulfilled.match(result)) {
                toast.success(result?.payload?.message || result?.payload || "A password reset link has been sent to your email.");
            } else {
                toast.error(result?.payload?.message || result.payload?.error || result?.payload || "We couldn’t process your request. Please try again.");
            }
        } catch (error) {
            toast.error(error?.message || error || "An unexpected error occurred. Please try again later.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!input.email) {
            toast.error("Please enter your email address.");
            return;
        }

        _onVerifyEmail();
    };

    return (
        <div className="flex w-full h-screen bg-[#0F1014]">
            {/* Left Side */}
            <div className="w-full min-h-screen bg-[#141633] flex justify-center items-center max-md:hidden">
                <figcaption className="w-full h-auto min-h-screen">
                    <Image
                        src="/assets/auth/forgot_password.webp"
                        alt="Forgot Password"
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover"
                        priority
                    />
                </figcaption>
            </div>

            {/* Right Side */}
            <div className="w-[50%] p-4 bg-[#0F1014] flex flex-col justify-center items-center max-md:w-full max-md:bg-gradient-to-br from-yellow-400/60 to-blue-600/70">
                <div className="w-full max-w-sm  max-md:pl-0 flex flex-col items-center">
                    <nav className="w-full mb-6 flex flex-col justify-center">
                        <h1 className="text-[#FFFFFF] text-4xl font-bold mb-4 font-[family-name:var(--font-roboto)]">Reset Password</h1>
                        <h4 className="text-[#FFFFFF] font-semibold mb-4 font-[family-name:var(--font-roboto)]"> To reset your password, please enter your email address you may have used with HitnFlop.</h4>
                    </nav>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-screen-sm flex flex-col gap-6"
                    >
                        <label className="text-base font-semibold text-[#FFFFFF] flex flex-col font-[family-name:var(--font-roboto)]">
                            Email
                            <div className="flex items-center border-0 border-b-2 border-[#FFFFFF] py-2 box-border">
                                <span className="cursor-pointer text-[#FFFFFF] font-normal">
                                    <MailOutlineOutlinedIcon />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={_onChange}
                                    placeholder="Enter email"
                                    className="w-full outline-none text-[#FFFFFF] font-normal font-[family-name:var(--font-roboto)] pl-2 box-border"
                                />
                            </div>
                        </label>

                        <div className="mt-6 flex justify-end gap-4 w-full max-w-screen-sm">
                            <Button
                                variant="outlined"
                                onClick={() => router.push('/login')}
                                sx={{ color: '#0265DC', fontSize: '1rem', fontWeight: '600', textTransform: 'none' }}
                            >
                                Return to Sign In
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={loading}
                                sx={{
                                    color: '#FFFFFF',
                                    background: '#FF6D3E',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    fontFamily: 'var(--font-inter)',
                                    textTransform: 'none',
                                    borderRadius: '6rem'
                                }}
                                className="primary-button rounded-lg mt-3"
                            >
                                {loading ? 'Sending...' : 'Next'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ResetPasswordPage;






// 'use client';

// import { Button, Snackbar, Alert } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { useState, useCallback } from 'react';
// import { useDispatch } from 'react-redux';
// import { forgotPassword } from '@/src/app/lib/store/features/user/userSlice';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ResetPasswordPage = () => {
//     const router = useRouter();
//     const dispatch = useDispatch();

//     const [input, setInput] = useState({ email: '' });
//     const [loading, setLoading] = useState(false);
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('error');

//     const _onChange = useCallback((event) => {
//         const { name, value } = event.target;
//         setInput((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     }, []);

//     const _onVerifyEmail = async () => {
//         // setLoading(true);

//         // try {
//         //     const response = await dispatch(forgotPassword({ email: input.email })).unwrap();

//         //     setSnackbarMessage(response.message || 'Reset link sent successfully!');
//         //     setSnackbarSeverity('success');
//         //     setOpenSnackbar(true);
//         // } catch (error) {
//         //     const message = error?.message || 'Failed to send reset email.';
//         //     setSnackbarMessage(message);
//         //     setSnackbarSeverity('error');
//         //     setOpenSnackbar(true);
//         // } finally {
//         //     setLoading(false);
//         // }
//         // e.preventDefault();

//         if (!input.email.trim()) {
//             return toast.error("Please enter your email address.");
//         }

//         // if (!validator.isEmail(input.email)) {
//         //     return toast.error("Please enter a valid email address.");
//         // }

//         try {
//             const result = await dispatch(forgotPassword(input.email));
//             if (forgotPassword.fulfilled.match(result)) {
//                 toast.success(result?.payload?.message || result?.payload || "A password reset link has been sent to your email.");
//             } else {
//                 toast.error(result?.payload?.message || result.payload?.error || result?.payload || "We couldn’t process your request. Please try again.");
//             }
//         } catch (error) {
//             toast.error(error?.message || error || "An unexpected error occurred. Please try again later.");
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!input.email) {
//             setSnackbarMessage('Please enter your email address.');
//             setSnackbarSeverity('warning');
//             setOpenSnackbar(true);
//             return;
//         }

//         _onVerifyEmail();
//     };

//     const handleCloseSnackbar = (event, reason) => {
//         if (reason === 'clickaway') return;
//         setOpenSnackbar(false);
//     };

//     return (
//         <div className="flex max-sm:flex-col bg-[#E7E6F5] min-h-screen">
//             <div className="w-1/2 max-sm:w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/backgrounds/Rectangle 39589.png')" }}>
//                 <nav className="w-[100%] px-4 py-4 box-border mb-6">
//                     <Image
//                         src="/assets/logo/Table Host Blue.svg"
//                         width={100}
//                         height={100}
//                         alt="Table Host"
//                         priority
//                         style={{ objectFit: 'contain', width: '80%', height: 'auto', maxWidth: '340px', minWidth: '160px' }}
//                     />
//                 </nav>
//                 <figcaption className="w-[70%] h-auto">
//                     <Image
//                         src="/assets/images/forgot-password/Collaboration Project 1.png"
//                         alt="Illustration"
//                         width={100}
//                         height={100}
//                         layout="responsive"
//                         priority
//                     />
//                 </figcaption>
//             </div>

//             <form onSubmit={handleSubmit} className="w-1/2 max-sm:w-full flex flex-col justify-center items-start p-10 box-border">
//                 <h6 className="text-xl font-semibold text-[#000000] font-roboto mb-4 max-w-lg">
//                     To reset your password, please enter your email address you may have used with TableHost.
//                 </h6>

//                 <label className="w-full max-w-screen-sm text-[#1F2122] flex flex-col text-base font-semibold font-inter">
//                     Email
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email Id"
//                         value={input.email}
//                         onChange={_onChange}
//                         className="w-full max-w-screen-sm border border-[#AAADB1] rounded-[12px] bg-[#FFFFFF] p-2 box-border outline-none text-[#414346] font-normal font-inter"
//                     />
//                 </label>

//                 <div className="mt-6 flex justify-end gap-4 w-full max-w-screen-sm">
//                     <Button
//                         variant="outlined"
//                         onClick={() => router.push('/login')}
//                         sx={{ color: '#0265DC', fontSize: '1rem', fontWeight: '600', textTransform: 'none' }}
//                     >
//                         Return to Sign In
//                     </Button>
//                     <Button
//                         variant="contained"
//                         type="submit"
//                         disabled={loading}
//                         sx={{ background: '#0265DC', fontSize: '1rem', fontWeight: '600', textTransform: 'none' }}
//                     >
//                         {loading ? 'Sending...' : 'Next'}
//                     </Button>
//                 </div>
//             </form>

//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={4000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </div>
//     );
// };

// export default ResetPasswordPage;




// 'use client';

// import { Button } from '@mui/material';
// import { useRouter } from 'next/navigation';
// // import Api from '@/app/service/api';
// // import { Cookie, Storage } from '@/app/utils/common';
// import Image from 'next/image';
// // import Alert from '@/app/components/alert/alert';
// import { useCallback, useState } from 'react';

// const ResetPasswordPage = () => {

//     const [input, setInput] = useState({
//         email: '',
//     });
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
//     const router = useRouter(); // Initialize the router

//     // Handle input changes using useCallback to avoid unnecessary re-renders
//     const _onChange = useCallback(
//         (event: React.ChangeEvent<HTMLInputElement>) => {
//             const { name, value } = event.target;
//             setInput((prev) => ({
//                 ...prev,
//                 [name]: value,
//             }));
//         },
//         []
//     );

//     const _onVerifyEmail = async () => {
//         setLoading(true);
//         setError(null); // Clear previous error
//         // setSnackbarMessage('');

//         try {
//             const response = await Api.resetPassword({
//                 email: input.email,
//             });

//             if (response && response.success) {
//                 setSnackbarMessage('Reset password email sent! Please check your email.');
//                 setSnackbarSeverity('success');
//                 setOpenSnackbar(true);

//                 // Navigate to a verify or check email page after email is sent
//                 // router.push('/verify');
//             } else {
//                 setError(`${response?.message}` || 'Failed to send reset email.');
//                 setSnackbarMessage(`${response?.message}` || 'Failed to send reset email.');
//                 setSnackbarSeverity('error');
//             }
//             setLoading(false);
//         } catch (error) {
//             setError(`${error}` || 'Failed to send reset email.');
//             setSnackbarMessage(`${error}` || 'Failed to send reset email.');
//             setSnackbarSeverity('error');
//             setOpenSnackbar(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (!input.email) {
//             setError('Please fill in both email and password.');
//             setSnackbarMessage('Please fill in both email and password.');
//             setSnackbarSeverity('warning');
//             setOpenSnackbar(true);
//             return;
//         }

//         _onVerifyEmail(); // Call the login function when form is submitted
//     };

//     // Handle closing Snackbar
//     const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setOpenSnackbar(false); // Hide Snackbar
//     };

//     return (
//         <div className='flex max-sm:flex-col bg-[#E7E6F5] min-h-screen'>
//             <div className="w-1/2 max-sm:w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/backgrounds/Rectangle 39589.png')" }}>
//                 {/* <div className='flex gap-6 p-6 box-border items-center w-[100%]'>
//                     <img src="/assets/logo/TH.svg" alt="" className='w-[50px]' />
//                     <img src="/assets/logo/Table Host.png" alt="" className='w-[250px]' />
//                 </div> */}
//                 <nav className="w-[100%] px-4 py-4 box-border mb-6 ">
//                     {/* <Image src="/assets/logo/Table Host Blue.svg" width={100} height={100} layout="responsive" alt="Table Host" /> */}
//                     <Image
//                         src="/assets/logo/Table Host Blue.svg"
//                         width={100}
//                         height={100}
//                         alt="Table Host"
//                         priority
//                         style={{ objectFit: 'contain', width: '80%', height: 'auto', maxWidth: '340px', minWidth: '160px' }}
//                     />
//                 </nav>
//                 <figcaption className='w-[70%] h-auto'>
//                     <Image
//                         src="/assets/images/forgot-password/Collaboration Project 1.png"
//                         alt="Illustration"
//                         width={100}
//                         height={100}
//                         layout="responsive"
//                         priority
//                     />
//                 </figcaption>
//                 {/* <img
//                     src="/assets/images/forgot-password/Collaboration Project 1.png"
//                     alt="Illustration"
//                     className="max-w-full w-[80%] h-auto"
//                 /> */}
//             </div>

//             <form onSubmit={handleSubmit} className="w-1/2 max-sm:w-full flex flex-col justify-center items-start p-10 box-border">
//                 <h6 className="text-xl font-semibold text-[#000000] font-roboto mb-4 max-w-lg">
//                     To reset your password, please enter your email address
//                     you may have used with TableHost.
//                 </h6>
//                 <label htmlFor="email" className="w-full max-w-screen-sm text-[#1F2122] flex flex-col text-base font-semibold font-inter">
//                     Email
//                     <input
//                         type="email"
//                         name="email"
//                         id=""
//                         placeholder="Email Id"
//                         value={input.email}
//                         onChange={_onChange}
//                         className="w-full max-w-screen-sm border border-[#AAADB1] rounded-[12px] bg-[#FFFFFF] p-2 box-border outline-none text-[#414346] font-normal font-inter"
//                     />
//                 </label>

//                 <div className="mt-6 flex justify-end gap-4 w-full max-w-screen-sm">
//                     <Button variant="outlined" onClick={() => router.push('/login')}
//                         sx={{ color: '#0265DC', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-inter)', textTransform: 'none' }}
//                         className="text-[#0265DC] border border-[#0265DC] text-base font-semibold font-inter rounded-lg normal-case">
//                         Return to Sign In
//                     </Button>
//                     <Button variant="contained"
//                         sx={{ background: '#0265DC', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-inter)', textTransform: 'none' }}
//                         className="bg-[#0265DC] text-base font-semibold font-inter rounded-lg normal-case"
//                         // onClick={() => router.push('/verify')}
//                         type="submit"
//                         disabled={loading}>
//                         {loading ? 'Sending...' : 'Next'}
//                     </Button>
//                 </div>
//             </form>
//             {/* Snackbar Alert */}
//             {/* <Alert open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} /> */}
//         </div>
//     )
// }

// export default ResetPasswordPage