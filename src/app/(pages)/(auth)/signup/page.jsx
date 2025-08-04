'use client';

import React, { useCallback, useState } from 'react';
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';
import { registerUser } from '@/src/app/lib/store/features/user/userSlice';
import { useDispatch } from 'react-redux';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Link from 'next/link';

const SignUp = () => {
    const [input, setInput] = useState({
        email: '',
        name: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const _onChange = useCallback((event) => {
        const { name, value } = event.target;
        setInput(prev => ({ ...prev, [name]: value }));
    }, []);

    const handlePhoneChange = (value) => {
        setInput(prev => ({ ...prev, mobile: value }));
    };

    const _onRegister = async () => {
        setLoading(true);
        try {
            const payload = {
                email: input.email.trim().toLowerCase(),
                name: input.name.trim(),
                mobile: input.mobile,
                password: input.password,
            };
            // dispatch(registerUser(payload));
            const result = await dispatch(registerUser(payload));
            if (registerUser.fulfilled.match(result)) {
                toast.success("Registration completed successfully!");
                navigate("/dashboard");
            } else {
                toast.error(result.payload || "Registration failed. Please try again.");
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message || 'An unexpected error occurred. Please try again later.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, name, mobile, password, confirmPassword } = input;

        if (!email || !name || !password) {
            toast.warning('Please fill out all required fields.');
            return;
        }

        if (password.length < 8) {
            toast.warning('Password must be at least 8 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Password and Confirm Password do not match.');
            return;
        }

        _onRegister();
    };

    return (
        <div className="flex w-full h-screen bg-[#0F1014]">
            {/* <ToastContainer /> */}
            {/* Left Side */}
            <div className="w-full min-h-screen bg-[#164A96] flex justify-center items-center max-md:hidden">
                <figcaption className="w-full h-auto min-h-screen">
                    <Image
                        src="/assets/auth/register.webp"
                        alt="Register"
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
                        <h1 className="text-[#FFFFFF] text-4xl font-bold mb-4 font-[family-name:var(--font-roboto)]">Sign up</h1>
                        <h4 className="text-[#FFFFFF] font-semibold mb-4 font-[family-name:var(--font-roboto)]">If you already have an account register You can <Link href="/login" className="text-[#FF6D3E] font-semibold font-[family-name:var(--font-roboto)]">Login here !</Link></h4>
                    </nav>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-screen-sm flex flex-col gap-6"
                    >
                        <label className="text-base font-semibold text-[#FFFFFF] flex flex-col font-[family-name:var(--font-roboto)]">
                            Name
                            <div className="flex items-center border-0 border-b-2 border-[#FFFFFF] py-2 box-border">
                                <span className="cursor-pointer text-[#FFFFFF] font-normal">
                                    <PersonOutlineOutlinedIcon />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={_onChange}
                                    placeholder="Enter name"
                                    className="w-full outline-none text-[#FFFFFF] font-normal font-[family-name:var(--font-roboto)] pl-2 box-border"
                                />
                            </div>
                        </label>

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

                        {/* <label className="flex flex-col gap-1 text-base font-semibold text-[#1F2122] font-inter">
                            Phone Number
                            <PhoneInput
                                country="us"
                                value={input.mobile}
                                onChange={handlePhoneChange}
                                inputStyle={{
                                    width: '100%',
                                    padding: '14px 12px',
                                    fontSize: '1rem',
                                    borderRadius: '8px',
                                    border: '1px solid #AAADB1'
                                }}
                                buttonStyle={{
                                    border: '1px solid #AAADB1',
                                    borderRadius: '8px',
                                }}
                            />
                        </label> */}

                        <label className="text-base font-semibold text-[#FFFFFF] flex flex-col font-[family-name:var(--font-roboto)]">
                            Password
                            <div className="flex items-center border-0 border-b-2 border-[#FFFFFF] py-2 box-border">
                                <span className="cursor-pointer text-[#FFFFFF] font-normal">
                                    <HttpsOutlinedIcon />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={input.password}
                                    onChange={_onChange}
                                    placeholder="Enter password"
                                    className="w-full outline-none text-[#FFFFFF] font-normal font-[family-name:var(--font-roboto)] pl-2 box-border"
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-[#FFFFFF]">
                                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                </span>
                            </div>
                        </label>

                        <label className="text-base font-semibold text-[#FFFFFF] flex flex-col font-[family-name:var(--font-roboto)]">
                            Confirm Password
                            <div className="flex items-center border-0 border-b-2 border-[#FFFFFF] py-2 box-border">
                                <span className="cursor-pointer text-[#FFFFFF] font-normal">
                                    <HttpsOutlinedIcon />
                                </span>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={input.confirmPassword}
                                    onChange={_onChange}
                                    placeholder="Enter confirm password"
                                    className="w-full outline-none text-[#FFFFFF] font-normal font-[family-name:var(--font-roboto)] pl-2 box-border"
                                />
                                <span onClick={() => setShowConfirmPassword(prev => !prev)} className="cursor-pointer">
                                    {showConfirmPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                </span>
                            </div>
                        </label>


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
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default SignUp;



// 'use client';

// import React, { useCallback, useState } from 'react';
// import { Button } from "@mui/material";
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// // import Alert from '@/app/components/alert/alert';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

// const SignUp = () => {
//     const [input, setInput] = useState({
//         email: '',
//         firstName: '',
//         mobile: '',
//         lastName: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('error');

//     const router = useRouter();

//     const _onChange = useCallback((event) => {
//         const { name, value } = event.target;
//         setInput(prev => ({ ...prev, [name]: value }));
//     }, []);

//     const handlePhoneChange = (value) => {
//         setInput(prev => ({ ...prev, mobile: value }));
//     };

//     const handleCloseSnackbar = () => {
//         setOpenSnackbar(false);
//     };

//     const _onRegister = async () => {
//         setLoading(true);
//         setError(null);

//         try {
//             const payload = {
//                 email: input.email.trim().toLowerCase(),
//                 name: `${input.firstName} ${input.lastName}`.trim(),
//                 mobile: input.mobile,
//                 password: input.password,
//             };

//             // Simulate API call
//             // const result = await Api.register(payload);
//             // if (result.email) {
//             //   Cookie.set('th_token', result.token);
//             //   setSnackbarMessage('Registration successful!');
//             //   setSnackbarSeverity('success');
//             //   setOpenSnackbar(true);
//             //   router.push('/register');
//             // }

//             setSnackbarMessage('Simulated success: Registration complete.');
//             setSnackbarSeverity('success');
//             setOpenSnackbar(true);
//         } catch (err) {
//             setError(`${err}` || 'Registration Failed.');
//             setSnackbarMessage(`${err}` || 'Registration Failed.');
//             setSnackbarSeverity('error');
//             setOpenSnackbar(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const { email, firstName, lastName, mobile, role, password, confirmPassword } = input;

//         if (!email || !firstName || !lastName || !mobile || !role || !password) {
//             setSnackbarMessage('Please fill all the required fields.');
//             setSnackbarSeverity('warning');
//             setOpenSnackbar(true);
//             return;
//         }

//         if (password.length < 8) {
//             setSnackbarMessage('Password must be at least 8 characters.');
//             setSnackbarSeverity('warning');
//             setOpenSnackbar(true);
//             return;
//         }

//         if (password !== confirmPassword) {
//             setSnackbarMessage('Passwords do not match.');
//             setSnackbarSeverity('error');
//             setOpenSnackbar(true);
//             return;
//         }

//         _onRegister();
//     };

//     return (
//         <div className="flex h-screen bg-[#E7E6F5] max-md:h-full min-h-screen">
//             <div className="w-[50%] flex flex-col justify-center items-center gap-6 p-4 box-border max-md:w-full bg-[#E7E6F5]">
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-sm">
//                     <header className="flex items-center justify-center w-full">
//                         <figure className="w-[80%] h-auto">
//                             <Image
//                                 src="/assets/logo/Table Host Blue.svg"
//                                 alt="Table Host"
//                                 width={300}
//                                 height={100}
//                                 priority
//                             />
//                         </figure>
//                     </header>

//                     {/* Email */}
//                     <label className="flex flex-col gap-1 text-base font-semibold text-[#1F2122] font-inter">
//                         Email
//                         <input
//                             type="email"
//                             name="email"
//                             value={input.email}
//                             onChange={_onChange}
//                             placeholder="Email"
//                             required
//                             className="px-2 py-2 border border-[#BCBFC1] rounded-lg outline-none"
//                         />
//                     </label>

//                     {/* First & Last Name */}
//                     <div className="flex gap-2">
//                         <label className="flex flex-col gap-1 w-full text-base font-semibold text-[#1F2122] font-inter">
//                             First Name
//                             <input
//                                 type="text"
//                                 name="firstName"
//                                 value={input.firstName}
//                                 onChange={_onChange}
//                                 placeholder="First name"
//                                 required
//                                 className="px-2 py-2 border border-[#BCBFC1] rounded-lg outline-none"
//                             />
//                         </label>
//                         <label className="flex flex-col gap-1 w-full text-base font-semibold text-[#1F2122] font-inter">
//                             Last Name
//                             <input
//                                 type="text"
//                                 name="lastName"
//                                 value={input.lastName}
//                                 onChange={_onChange}
//                                 placeholder="Last name"
//                                 required
//                                 className="px-2 py-2 border border-[#BCBFC1] rounded-lg outline-none"
//                             />
//                         </label>
//                     </div>

//                     {/* Phone Number */}
//                     <label className="flex flex-col gap-1 text-base font-semibold text-[#1F2122] font-inter">
//                         Phone Number
//                         <PhoneInput
//                             country="gb"
//                             value={input.mobile}
//                             onChange={handlePhoneChange}
//                             inputStyle={{
//                                 width: '100%',
//                                 padding: '14px 12px',
//                                 fontSize: '1rem',
//                                 borderRadius: '8px',
//                                 border: '1px solid #AAADB1'
//                             }}
//                             buttonStyle={{
//                                 border: '1px solid #AAADB1',
//                                 borderRadius: '8px',
//                             }}
//                         />
//                     </label>

//                     {/* Password */}
//                     <label className="flex flex-col gap-1 text-base font-semibold text-[#1F2122] font-inter">
//                         Set Password
//                         <div className="flex items-center border border-[#AAADB1] rounded-lg bg-white p-2">
//                             <input
//                                 type={showPassword ? 'text' : 'password'}
//                                 name="password"
//                                 value={input.password}
//                                 onChange={_onChange}
//                                 placeholder="Password"
//                                 className="w-full outline-none"
//                             />
//                             <span onClick={() => setShowPassword(prev => !prev)} className="cursor-pointer">
//                                 {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
//                             </span>
//                         </div>
//                     </label>

//                     {/* Confirm Password */}
//                     <label className="flex flex-col gap-1 text-base font-semibold text-[#1F2122] font-inter">
//                         Re-enter Password
//                         <div className="flex items-center border border-[#AAADB1] rounded-lg bg-white p-2">
//                             <input
//                                 type={showConfirmPassword ? 'text' : 'password'}
//                                 name="confirmPassword"
//                                 value={input.confirmPassword}
//                                 onChange={_onChange}
//                                 placeholder="Confirm Password"
//                                 className="w-full outline-none"
//                             />
//                             <span onClick={() => setShowConfirmPassword(prev => !prev)} className="cursor-pointer">
//                                 {showConfirmPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
//                             </span>
//                         </div>
//                     </label>

//                     {/* Role */}
//                     <label className="flex flex-col gap-1 text-base font-semibold text-[#1F2122] font-inter">
//                         Role
//                         <select
//                             name="role"
//                             value={input.role}
//                             onChange={_onChange}
//                             className="px-2 py-2 border border-[#BCBFC1] rounded-lg outline-none"
//                             required
//                         >
//                             <option value="">Select</option>
//                             <option value="owner">Owner</option>
//                             <option value="manager">Manager</option>
//                         </select>
//                     </label>

//                     <div className="flex justify-center">
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             disabled={loading}
//                             sx={{
//                                 textTransform: 'none',
//                                 background: '#0265DC',
//                                 fontSize: '1rem',
//                                 fontWeight: 600,
//                                 fontFamily: 'var(--font-inter)',
//                                 borderRadius: '8px',
//                                 width: '85%',
//                                 mt: 2
//                             }}
//                         >
//                             {loading ? 'Signing Up...' : 'Sign Up'}
//                         </Button>
//                     </div>
//                 </form>
//             </div>

//             {/* Side image */}
//             <div className="w-full hidden max-md:hidden md:flex items-end justify-end bg-[#E7E6F5]">
//                 <figure className="w-full">
//                     <Image
//                         src="/assets/images/login/Login2.png"
//                         alt="SignUp Illustration"
//                         width={800}
//                         height={800}
//                         priority
//                     />
//                 </figure>
//             </div>

//             {/* Alert Snackbar */}
//             {/* <Alert open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} /> */}
//         </div>
//     );
// };

// export default SignUp;







// 'use client';

// import React, { useCallback, useState } from 'react';
// import { Button } from "@mui/material";
// // import Api from '@/app/service/api';
// import { Cookie } from '@/app/utils/common';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Alert from '@/app/components/alert/alert';
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import { VisibilityOffOutlined } from '@mui/icons-material';

// const SignUp = () => {
//     const [input, setInput] = useState({
//         email: '',
//         firstName: '',
//         mobile: '',
//         lastName: '',
//         password: '',
//         confirmPassword: '',
//         role: '',
//     });

//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
//     const router = useRouter();

//     // const _onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//     //     const { name, value } = event.target;
//     //     setInput((prev) => ({ ...prev, [name]: value }));
//     // }, []);

//     const _onChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = event.target;
//         setInput((prev) => ({ ...prev, [name]: value }));
//     }, []);

//     const handlePhoneChange = (value: string) => {
//         setInput((prev) => ({ ...prev, mobile: value }));
//     };

//     const _onRegister = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const payload = {
//                 // email: input.email,
//                 email: input.email.trim().toLowerCase(),
//                 name: `${input.firstName} ${input.lastName}`.trim(),
//                 mobile: input.mobile,
//                 // lastName: input.lastName,
//                 password: input.password,
//                 role: input.role,
//             };

//             // const result = await Api.register(payload);
//             // if (result.email) {
//             //     Cookie.set('th_token', result.token);
//             //     setSnackbarMessage('Registrations successful!');
//             //     setSnackbarSeverity('success');
//             //     setOpenSnackbar(true);
//             //     router.push('/register');
//             // }
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//             setError(`${error}` || 'Registration Failed. Please try again later.');
//             // setSnackbarMessage(`${error}` || 'Registration Failed. Please try again later.');
//             // setSnackbarSeverity('error');
//             // setOpenSnackbar(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!input.email || !input.firstName || !input.lastName || !input.mobile || !input.role || !input.password) {
//             setError('Please fill all the required fields.');
//             setSnackbarMessage('Please fill all the required fields.');
//             setSnackbarSeverity('warning');
//             setOpenSnackbar(true);
//             return;
//         }
//         if (input.password.length < 8) {
//             setError('Password must be at least 8 characters long.');
//             setSnackbarMessage('Password must be at least 8 characters long.');
//             setSnackbarSeverity('warning');
//             setOpenSnackbar(true);
//             return;
//         }
//         if (input.password !== input.confirmPassword) {
//             setError('Passwords do not match.');
//             setSnackbarMessage('Passwords do not match.');
//             setSnackbarSeverity('error');
//             setOpenSnackbar(true);
//             return;
//         }
//         _onRegister();
//     };

//     // Handle closing Snackbar
//     // const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
//     //     if (reason === 'clickaway') {
//     //         return;
//     //     }
//     //     setOpenSnackbar(false); // Hide Snackbar
//     // };

//     return (
//         <div className="flex h-screen bg-[#E7E6F5] max-md:h-full min-h-screen">
//             <div className="w-[50%] bg-[#E7E6F5] flex flex-col justify-center items-center gap-6 p-4 box-border max-md:w-full">
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-sm">
//                     <header className="flex items-center w-full justify-center">
//                         <figcaption className="flex items-center justify-center w-[80%] h-auto">
//                             <Image src="/assets/logo/Table Host Blue.svg" width={100} height={100} layout="responsive" priority alt="Table Host" />
//                         </figcaption>
//                     </header>
//                     <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
//                         Email Id
//                         <input
//                             type="email"
//                             name="email"
//                             value={input.email}
//                             onChange={_onChange}
//                             placeholder="Email"
//                             className="px-2 py-2 box-border border border-[#BCBFC1] rounded-lg outline-none text-[#1F2122] font-normal font-inter"
//                             required
//                         />
//                     </label>
//                     <div className="flex gap-2 w-full">
//                         <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1 w-full">
//                             First Name
//                             <input
//                                 type="text"
//                                 name="firstName"
//                                 value={input.firstName}
//                                 onChange={_onChange}
//                                 placeholder="Your first name"
//                                 className="w-full px-2 py-2 box-border border border-[#BCBFC1] rounded-lg outline-none text-[#1F2122] font-normal font-inter"
//                                 required
//                             />
//                         </label>
//                         <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1 w-full">
//                             Last Name
//                             <input
//                                 type="text"
//                                 name="lastName"
//                                 value={input.lastName}
//                                 onChange={_onChange}
//                                 placeholder="Your last name"
//                                 className="w-full px-2 py-2 box-border border border-[#BCBFC1] rounded-lg outline-none text-[#1F2122] font-normal font-inter"
//                                 required
//                             />
//                         </label>
//                     </div>
//                     <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1 w-full">
//                         Phone number
//                         {/* <input
//                             type="tel"
//                             name="mobile"
//                             value={input.mobile}
//                             onChange={_onChange}
//                             placeholder="Phone number"
//                             className="px-2 py-2 box-border border border-[#BCBFC1] rounded-lg outline-none text-[#1F2122] font-normal font-inter"
//                             required
//                         /> */}
//                         <PhoneInput
//                             country="gb" // Set default country to United Kingdom
//                             countryCodeEditable={false} // Prevent changing the country code manually
//                             // value={phone}
//                             value={input.mobile}
//                             onChange={handlePhoneChange}
//                             // Container styles for the complete phone input
//                             containerStyle={{
//                                 display: 'flex',
//                                 gap: '10px',
//                                 width: '100%',
//                                 borderRadius: '8px',
//                                 // border: '1px solid #AAADB1',
//                                 // padding: '8px',
//                                 boxSizing: 'border-box',
//                             }}
//                             // Styles for the input field inside PhoneInput
//                             inputStyle={{
//                                 width: '100%',
//                                 borderRadius: '8px',
//                                 // border: 'none',
//                                 border: '1px solid #AAADB1',
//                                 padding: '20px 12px',
//                                 boxSizing: 'border-box',
//                                 fontSize: '1rem',
//                                 color: '#414346',
//                                 fontWeight: '400',
//                                 outline: 'none',
//                                 marginLeft: '50px',
//                                 fontFamily: 'var(--font-inter)'
//                             }}
//                             // Styles for the dropdown button in the PhoneInput
//                             buttonStyle={{
//                                 borderRadius: '8px',
//                                 // border: 'none',
//                                 border: '1px solid #AAADB1',
//                                 fontSize: '1rem',
//                                 color: '#414346',
//                                 fontWeight: '400',
//                                 outline: 'none',
//                                 backgroundColor: '#FFFFFF',
//                                 fontFamily: 'var(--font-inter)'
//                                 // overflow: 'hidden'
//                                 // marginRight:'20px'
//                             }}
//                         />
//                     </label>
//                     <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
//                         Set Password
//                         {/* <input
//                             type="password"
//                             name="password"
//                             value={input.password}
//                             onChange={_onChange}
//                             placeholder="Password"
//                             className="px-2 py-2 box-border border border-[#BCBFC1] rounded-lg outline-none text-[#1F2122] font-normal font-inter"
//                             required
//                         /> */}
//                         <div className="flex items-center gap-1 w-full max-w-screen-sm border border-[#AAADB1] rounded-lg bg-[#FFFFFF] p-2 box-border outline-none text-[#414346] font-normal font-inter"
//                         >
//                             <input
//                                 type={!showPassword ? "password" : "text"}
//                                 name="password"
//                                 id=""
//                                 placeholder="Password"
//                                 value={input.password}
//                                 onChange={_onChange}
//                                 className="w-full max-w-screen-sm border-none bg-[#FFFFFF] outline-none text-[#414346] font-normal font-inter"
//                             />
//                             <span className="cursor-pointer text-[#1F2122]" onClick={() => setShowPassword(!showPassword)}>
//                                 {!showPassword ? <VisibilityOffOutlined sx={{ color: '#1F2122' }} /> : <VisibilityOutlinedIcon sx={{ color: '#1F2122' }} />}
//                             </span>
//                         </div>
//                     </label>
//                     <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
//                         Re-Enter Password
//                         {/* <input
//                             type="password"
//                             name="confirmPassword"
//                             value={input.confirmPassword}
//                             onChange={_onChange}
//                             placeholder="Confirm Password"
//                             className="px-2 py-2 box-border border border-[#BCBFC1] rounded-lg outline-none text-[#1F2122] font-normal font-inter"
//                             required
//                         /> */}
//                         <div className="flex items-center gap-1 w-full max-w-screen-sm border border-[#AAADB1] rounded-lg bg-[#FFFFFF] p-2 box-border outline-none text-[#414346] font-normal font-inter"
//                         >
//                             <input
//                                 type={!showConfirmPassword ? "password" : "text"}
//                                 // type="password"
//                                 name="confirmPassword"
//                                 id=""
//                                 placeholder="Confirm password"
//                                 value={input.confirmPassword}
//                                 onChange={_onChange}
//                                 className="w-full max-w-screen-sm border-none bg-[#FFFFFF] outline-none text-[#414346] font-normal font-inter"
//                             />
//                             <span className="cursor-pointer text-[#1F2122]" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                                 {!showConfirmPassword ? <VisibilityOffOutlined sx={{ color: '#1F2122' }} /> : <VisibilityOutlinedIcon sx={{ color: '#1F2122' }} />}
//                             </span>
//                         </div>
//                     </label>
//                     <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
//                         Role
//                         {/* <input
//                             type="text"
//                             name="role"
//                             value={input.role}
//                             onChange={_onChange}
//                             placeholder="Role"
//                             className="px-2 py-2 box-border border border-[#BCBFC1] rounded-lg outline-none text-[#1F2122] font-normal font-inter"
//                             required
//                         /> */}
//                         <select
//                             name="role"
//                             value={input.role}
//                             onChange={_onChange}
//                             className="px-2 py-2 box-border border border-[#BCBFC1] rounded-lg outline-none text-[#1F2122] font-normal font-inter"
//                             required
//                         >
//                             <option value="">Select</option>
//                             <option value="owner">Owner</option>
//                             <option value="manager">Manager</option>
//                         </select>
//                     </label>
//                     {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
//                     <div className="flex justify-center items-center">
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             sx={{ textTransform: 'none', background: '#0265DC', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-inter)' }}
//                             className="text-[#FFFFFF] bg-[#0265DC] rounded-lg h-[40px] text-base font-semibold font-inter normal-case w-[85%] mt-4"
//                             disabled={loading}
//                         >
//                             {loading ? 'Signing Up...' : 'Sign Up'}
//                         </Button>
//                     </div>
//                 </form>
//             </div>

//             <div className="w-full bg-[#E7E6F5] flex items-end justify-end max-md:hidden">
//                 {/* <img src="/assets/images/login/Login.png" alt="Table Host Features" className="w-full h-full" /> */}
//                 <figcaption className='w-[100%] h-auto'>
//                     <Image
//                         // src="/assets/images/login/Login.png"
//                         src="/assets/images/login/Login2.png"
//                         alt="SignUp"
//                         width={100}
//                         height={100}
//                         layout="responsive"
//                         priority
//                     />
//                 </figcaption>
//             </div>
//             {/* Snackbar Alert */}
//             <Alert open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} />
//         </div>
//     );
// };

// export default SignUp;





// 'use client';

// import React, { useCallback, useState } from 'react';
// import { Button } from "@mui/material";
// import Api from '@/app/service/api';
// import { Cookie, Storage } from '@/app/utils/common';
// import { useRouter } from 'next/navigation';

// const SignUp = () => {

//     const [input, setInput] = useState({
//         email: '',
//         password: '',
//     });
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
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

//     const _onRegister = async () => {
//         setLoading(true);
//         setError(null); // Clear previous error

//         try {
//             const result = await Api.login({
//                 email: input.email,
//                 password: input.password,
//             });

//             if (result.token) {
//                 // Store token in both cookie and local storage
//                 Cookie.set('th_token', result.token);
//                 // Storage.set('th_token', result.token);

//                 router.push('/dashboard');
//             } else {
//                 setError('Login failed, token missing.');
//             }

//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//             setError('Failed to login. Please check your credentials and try again.');
//             console.log('Login error:', error);
//         }
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (!input.email || !input.password) {
//             setError('Please fill in both email and password.');
//             return;
//         }

//         _onRegister(); // Call the register function when form is submitted
//     };

//     return (
//         <div className="flex h-screen bg-[#E7E6F5] max-md:h-full">
//             {/* Left Section - Signup Form */}
//             <div className="w-[50%] bg-[#E7E6F5] flex flex-col justify-center items-center gap-6 p-4 box-border max-md:w-full max-md:bg-[linear-gradient(148.67deg,_rgba(255,193,7,0.62)_7.66%,_rgba(2,101,220,0.69)_92.99%)]">
//                 <div className='flex gap-4 box-border items-center justify-center w-[100%]'>
//                     <img src="/assets/logo/TH.svg" alt="" className='w-[50px]' />
//                     <img src="/assets/logo/Table Host.png" alt="" className='w-[250px]' />
//                 </div>
//                 <form className="flex flex-col gap-2 w-full max-w-sm">
//                     <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
//                         Email Id
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             className="px-3 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none"
//                             required
//                         />
//                     </label>
//                     <div className="flex items-center gap-3 w-full">
//                         <label className="w-full flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
//                             First name
//                             <input
//                                 type="text"
//                                 placeholder="Your first name"
//                                 className="w-full px-3 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none"
//                                 required
//                             />
//                         </label>
//                         <label className="w-full flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
//                             Last name
//                             <input
//                                 type="text"
//                                 placeholder="Your last name"
//                                 className="w-full px-3 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none"
//                                 required
//                             />
//                         </label>
//                     </div>
//                     <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
//                         Set Password
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             className="px-3 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none"
//                             required
//                         />
//                     </label>
//                     <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
//                         Re-Enter Password
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             className="px-3 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none"
//                             required
//                         />
//                     </label>
//                     <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
//                         Role
//                         <input
//                             type="text"
//                             placeholder=""
//                             className="px-3 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none"
//                             required
//                         />
//                     </label>
//                     <div className="flex justify-center items-center">
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             className="text-[#FFFFFF] bg-[#0265DC] text-base font-semibold font-inter w-[85%] mt-4 normal-case"
//                         >
//                             Sign Up
//                         </Button>
//                     </div>
//                 </form>
//             </div>

//             {/* Right Section - Background Image */}
//             <div className="w-full bg-[#E7E6F5] flex items-end justify-end max-md:hidden">
//                 <img src="/assets/images/login/Login.png" alt="Table Host Features" className="w-full h-full" />
//             </div>
//         </div>
//     );
// }

// export default SignUp