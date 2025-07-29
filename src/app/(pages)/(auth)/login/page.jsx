'use client';

import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/src/app/lib/store/features/user/userSlice';

import Button from '@mui/material/Button';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [input, setInput] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const _onChange = useCallback((event) => {
    const { name, value } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const _onLogin = async () => {
    const { email, password } = input;

    // Basic client-side validation
    if (!email) return toast.error('Email is required');
    if (!password) return toast.error('Password is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Invalid email format');

    setLoading(true);

    try {
      const result = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(result)) {
        toast.success('Login successful');
        router.push('/');
      } else {
        toast.error(
          result?.payload?.message ||
            result?.payload?.error ||
            'Login failed, please try again'
        );
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    _onLogin();
  };

  return (
    <div className="flex h-screen bg-[#0F1014]">
      <ToastContainer />
      {/* Left Side */}
      <div className="w-[60%] p-4 bg-[#0F1014] flex flex-col justify-center items-center max-md:w-full max-md:bg-gradient-to-br from-yellow-400/60 to-blue-600/70">
        <div className="w-full max-w-sm pl-16 max-md:pl-0 flex flex-col items-center">
          <nav className="w-full mb-6 flex justify-center">
            <Image
              src="/assets/logo/Table Host Blue.svg"
              width={100}
              height={100}
              alt="Table Host"
              style={{ objectFit: 'contain', width: '80%', maxWidth: '400px', height: 'auto' }}
              priority
            />
          </nav>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 w-full max-w-screen-sm flex flex-col gap-2"
          >
            <h2 className="text-[#1F2122] text-4xl font-bold mb-4">Login</h2>

            {/* Email */}
            <label className="text-base font-semibold text-[#1F2122] flex flex-col">
              Email
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={_onChange}
                placeholder="Enter Email"
                className="px-2 py-2 border border-[#AAADB1] rounded-lg text-base text-[#66696D] outline-none"
              />
            </label>

            {/* Password */}
            <label className="text-base font-semibold text-[#1F2122] flex flex-col">
              Password
              <div className="flex items-center border border-[#AAADB1] rounded-lg p-2 bg-white">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={input.password}
                  onChange={_onChange}
                  placeholder="Enter Password"
                  className="w-full outline-none text-[#414346]"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-[#1F2122]">
                  {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </span>
              </div>
            </label>

            {/* Forgot Password */}
            <div className="text-sm flex justify-end">
              <button
                type="button"
                onClick={() => router.push('/reset-password')}
                className="text-[#0265DC] text-sm font-normal"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                background: '#0265DC',
                fontSize: '1rem',
                fontWeight: '600',
                fontFamily: 'var(--font-inter)',
                textTransform: 'none',
              }}
              className="rounded-lg mt-3"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            {/* Signup Redirect */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => router.push('/signup')}
                className="text-[#0265DC] text-sm font-medium"
              >
                <span className="text-[#1F2122] mr-1">Don't have an account?</span> Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full min-h-screen bg-[#E7E6F5] flex items-end justify-end max-md:hidden">
        <figcaption className="w-full h-auto min-h-screen">
          <Image
            src="/assets/images/login/Login2.png"
            alt="Login"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
          />
        </figcaption>
      </div>
    </div>
  );
}


// 'use client';

// import React, { useCallback, useState } from 'react';
// import Button from '@mui/material/Button';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import { VisibilityOffOutlined } from '@mui/icons-material';
// import { toast } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';
// import { loginUser } from '@/src/app/lib/store/features/user/userSlice';
// import { useDispatch } from 'react-redux';

// export default function Login() {
//   const [input, setInput] = useState({
//     email: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('error');

//   const router = useRouter();

//   const _onChange = useCallback((event) => {
//     const { name, value } = event.target;
//     setInput((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }, []);

//   const _onLogin = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (!email) {
//         toast.error("Email is required");
//       }
//       else if (!password) {
//         toast.error('Password is required');
//       }
//       else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
//         toast.error("Invalid Email")
//       }
//       else if (!validator.isEmail(email)) {
//         toast.error("Invalid Email");
//       }
//       else if (password.length < 6) {
//         toast.error("Invalid Credentials");
//       } else {
//         // dispatch(loginUser(payload, navigate));
//         const result = await dispatch(loginUser({ email, password }));
//         if (loginUser.fulfilled.match(result)) {
//           toast.success("Login successful");
//           navigate("/dashboard");
//         } else {
//           toast.error(result?.payload?.error || result?.payload?.message || result?.payload || "Login failed");
//         }
//       }
//     } catch (error) {
//       // console.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
//       toast.error(`${error?.response?.data?.error || 'Something Went Wrong'}`);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!input.email || !input.password) {
//       const message = 'Please fill in both email and password.';
//       setError(message);
//       setSnackbarMessage(message);
//       setSnackbarSeverity('warning');
//       setOpenSnackbar(true);
//       return;
//     }
//     _onLogin();
//   };

//   return (
//     <div className="flex h-screen bg-[#0F1014]">
//       {/* Left Side */}
//       <div className="w-[60%] p-4 bg-[#0F1014] flex flex-col justify-center items-center max-md:w-full max-md:bg-gradient-to-br from-yellow-400/60 to-blue-600/70">
//         <div className="w-full max-w-sm pl-16 max-md:pl-0 flex flex-col items-center">
//           <nav className="w-full mb-6 flex justify-center">
//             <Image
//               src="/assets/logo/Table Host Blue.svg"
//               width={100}
//               height={100}
//               alt="Table Host"
//               style={{ objectFit: 'contain', width: '80%', maxWidth: '400px', height: 'auto' }}
//               priority
//             />
//           </nav>

//           <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-screen-sm flex flex-col gap-2">
//             <h2 className="text-[#1F2122] text-4xl font-bold mb-4">Login</h2>

//             <label htmlFor="email" className="text-base font-semibold text-[#1F2122] flex flex-col">
//               Email
//               <input
//                 type="email"
//                 name="email"
//                 value={input.email}
//                 onChange={_onChange}
//                 placeholder="Enter Email"
//                 className="px-2 py-2 border border-[#AAADB1] rounded-lg text-base text-[#66696D] outline-none"
//               />
//             </label>

//             <label htmlFor="password" className="text-base font-semibold text-[#1F2122] flex flex-col">
//               Password
//               <div className="flex items-center border border-[#AAADB1] rounded-lg p-2 bg-white">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={input.password}
//                   onChange={_onChange}
//                   placeholder="Enter Password"
//                   className="w-full outline-none text-[#414346]"
//                 />
//                 <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-[#1F2122]">
//                   {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlined />}
//                 </span>
//               </div>
//             </label>

//             <div className="text-sm flex justify-end">
//               <button
//                 type="button"
//                 onClick={() => router.push('/reset-password')}
//                 className="text-[#0265DC] text-sm font-normal"
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             <Button
//               variant="contained"
//               type="submit"
//               disabled={loading}
//               sx={{
//                 background: '#0265DC',
//                 fontSize: '1rem',
//                 fontWeight: '600',
//                 fontFamily: 'var(--font-inter)',
//                 textTransform: 'none',
//               }}
//               className="rounded-lg mt-3"
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </Button>

//             <div className="flex justify-center">
//               <button
//                 type="button"
//                 onClick={() => router.push('/signup')}
//                 className="text-[#0265DC] text-sm font-medium"
//               >
//                 <span className="text-[#1F2122] mr-1">Don't have an account?</span> Sign Up
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="w-full min-h-screen bg-[#E7E6F5] flex items-end justify-end max-md:hidden">
//         <figcaption className="w-full h-auto min-h-screen">
//           <Image
//             src="/assets/images/login/Login2.png"
//             alt="Login"
//             width={1920}
//             height={1080}
//             className="w-full h-full object-cover"
//             priority
//           />
//         </figcaption>
//       </div>

//       {/* Snackbar Placeholder (Uncomment when Alert component is restored) */}
//       {/* <Alert open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} /> */}
//     </div>
//   );
// }




// 'use client';

// import React, { useCallback, useState } from 'react';
// import Button from '@mui/material/Button';
// // import Api from '@/app/service/api';
// // import { Cookie, Storage } from '@/app/utils/common';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// // import Alert from '@/app/components/alert/alert';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import { VisibilityOffOutlined } from '@mui/icons-material';

// export default function Login() {
//   const [input, setInput] = useState({
//     email: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
//   const router = useRouter(); // Initialize the router

//   // Handle input changes using useCallback to avoid unnecessary re-renders
//   const _onChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = event.target;
//       setInput((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     },
//     []
//   );

//   const _onLogin = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // const result = await Api.login({
//       //   // email: input.email,
//       //   email: input.email.trim().toLowerCase(),
//       //   password: input.password,
//       // });

//       // if (result.token) {
//       //   // Store token in both cookie and local storage
//       //   Cookie.set('th_token', result.token);
//       //   localStorage.setItem('restaurantId', result?.restaurant?.id);
//       //   // localStorage.setItem('restaurant_id', result?.restaurant?.id);
//       //   const parentId = result?.restaurant?.parent_id;
//       //   // Save parent_id in cookie (or restaurant ID if parent_id is not available)
//       //   if (parentId) {
//       //     localStorage.setItem('restaurant_id', parentId);
//       //   } else {
//       //     localStorage.setItem('restaurant_id', result?.restaurant?.id);
//       //   }

//       //   setSnackbarMessage('Login successful!');
//       //   setSnackbarSeverity('success');
//       //   setOpenSnackbar(true);
//       //   router.push('/dashboard');
//       // }
//       // setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       setError(`${error}` || 'Login Failed. Please check your credentials and try again.');
//       // setSnackbarMessage(`${error}` || 'Login Failed. Please check your credentials and try again.');
//       // setSnackbarSeverity('error');
//       // setOpenSnackbar(true);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!input.email || !input.password) {
//       setError('Please fill in both email and password.');
//       setSnackbarMessage('Please fill in both email and password.');
//       setSnackbarSeverity('warning');
//       setOpenSnackbar(true);
//       return;
//     }
//     _onLogin(); // Call the login function when form is submitted
//   };

//   // Handle closing Snackbar
//   const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpenSnackbar(false); // Hide Snackbar
//   };

//   return (
//     <div className="flex h-screen bg-[#0F1014]">
//       {/* Left Section - Login Form */}
//       <div className="w-[60%] p-4 box-border bg-[#0F1014] flex flex-col justify-center items-center max-md:w-full max-md:bg-[linear-gradient(148.67deg,_rgba(255,193,7,0.62)_7.66%,_rgba(2,101,220,0.69)_92.99%)] ">
//         <div className="w-full max-w-sm pl-16 max-md:pl-0 box-border max-md:w-full flex flex-col items-center">
//           <nav className="flex gap-4 box-border items-center justify-center w-[100%] mb-6 ">
//             {/* <Image src="/assets/logo/Table Host Blue.svg" width={100} height={100} layout="responsive" alt="Table Host" /> */}
//             <Image
//               src="/assets/logo/Table Host Blue.svg"
//               width={100}
//               height={100}
//               alt="Table Host"
//               style={{ objectFit: 'contain', width: '80%', maxWidth: '400px', height: 'auto' }}
//               priority
//             />
//           </nav>
//           <form
//             onSubmit={handleSubmit}
//             className="bg-[#FFFFFF] flex flex-col gap-2 rounded-2xl p-6 box-border w-full max-w-screen-sm"
//           >
//             <h2 className="text-[#1F2122] text-4xl font-bold font-inter text-start mb-4">
//               Login
//             </h2>
//             <label
//               htmlFor="email"
//               className="text-[#1F2122] text-base font-semibold font-inter text-start flex flex-col"
//             >
//               Email
//               <input
//                 type="email"
//                 name="email"
//                 value={input.email}
//                 onChange={_onChange}
//                 placeholder="Enter Email"
//                 className="px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#66696D] font-normal font-inter outline-none"
//               />
//             </label>

//             <label
//               htmlFor="password"
//               className="text-[#1F2122] text-base font-semibold font-inter text-start flex flex-col"
//             >
//               Password
//               {/* <input
//                 type="password"
//                 name="password"
//                 value={input.password}
//                 onChange={_onChange}
//                 placeholder="Password"
//                 className="px-3 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#66696D] font-normal font-inter outline-none"
//               /> */}
//               <div className="flex items-center gap-1 w-full max-w-screen-sm border border-[#AAADB1] rounded-lg bg-[#FFFFFF] p-2 box-border outline-none text-[#414346] font-normal font-inter"
//               >
//                 <input
//                   type={!showPassword ? "password" : "text"}
//                   name="password"
//                   id=""
//                   placeholder="Enter Password"
//                   value={input.password}
//                   onChange={_onChange}
//                   className="w-full max-w-screen-sm border-none bg-[#FFFFFF] outline-none text-[#414346] font-normal font-inter"
//                 />
//                 <span className="cursor-pointer text-[#1F2122]" onClick={() => setShowPassword(!showPassword)}>
//                   {!showPassword ? <VisibilityOffOutlined sx={{ color: '#1F2122' }} /> : <VisibilityOutlinedIcon sx={{ color: '#1F2122' }} />}
//                 </span>
//               </div>
//             </label>

//             <div className="forget text-sm flex justify-end">
//               <button type="button"
//                 onClick={(event) => {
//                   event.preventDefault();
//                   router.push('/reset-password');
//                 }} className="text-[#0265DC] text-sm font-normal font-inter text-end">
//                 Forgot Password?
//               </button>
//             </div>

//             <Button
//               sx={{ background: '#0265DC', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-inter)', textTransform: 'none' }}
//               className="bg-[#0265DC] text-base font-semibold font-inter h-[40px] rounded-lg mt-3 normal-case"
//               variant="contained"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </Button>

//             <div className="flex flex-col justify-center items-center">
//               <button type="button"
//                 onClick={(event) => {
//                   event.preventDefault();
//                   router.push('/signup');
//                 }} className="text-[#0265DC] text-sm font-medium font-inter text-center flex items-center gap-1">
//                 <span className="text-[#1F2122] text-sm font-semibold font-inter text-center flex">Do not have an Account?</span> SignUp
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Right Section - Background Image */}
//       <div className="w-full min-h-screen bg-[#E7E6F5] flex items-end justify-end max-md:hidden">
//         <figcaption className='w-[100%] h-auto min-h-screen'>
//           <Image
//             src="/assets/images/login/Login2.png"
//             // src="/assets/images/login/Login.png"
//             alt="Login"
//             width={100}
//             height={100}
//             className='w-full h-full min-h-screen'
//             style={{ width: '100%', height: 'auto', minHeight: '100vh' }}
//             // loading="lazy"
//             layout="responsive"
//             priority
//           // fill
//           // style={{ objectFit: 'contain',objectPosition:'right' }}
//           />
//         </figcaption>
//       </div>
//       {/* Snackbar Alert */}
//       {/* <Alert open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} /> */}
//     </div>
//   );
// }