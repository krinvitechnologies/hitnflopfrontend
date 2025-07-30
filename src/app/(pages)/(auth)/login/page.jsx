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
import Link from 'next/link';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

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
    <div className="flex w-full h-screen bg-[#0F1014]">
      <ToastContainer />
      {/* Left Side */}
      <div className="w-full min-h-screen bg-[#164A96] flex justify-center items-center max-md:hidden">
        <figcaption className="w-full h-auto min-h-screen">
          <Image
            src="/assets/auth/login.webp"
            alt="Login"
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
            <h1 className="text-[#FFFFFF] text-4xl font-bold mb-4 font-[family-name:var(--font-roboto)]">Login</h1>
            <h4 className="text-[#FFFFFF] font-semibold mb-4 font-[family-name:var(--font-roboto)]">If you don’t have an account register
              You can <Link href="/signup" className="text-[#FF6D3E] font-semibold font-[family-name:var(--font-roboto)]">Register here !</Link></h4>
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

            <div className="text-sm flex justify-end">
              <button
                type="button"
                onClick={() => router.push('/reset-password')}
                className="text-[#FFFFFF] text-sm font-normal font-[family-name:var(--font-roboto)] cursor-pointer outline-none border-none bg-transparent"
              >
                Forgot Password ?
              </button>
            </div>

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
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>

    </div>
  );
}




// 'use client';

// import React, { useCallback, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { loginUser } from '@/src/app/lib/store/features/user/userSlice';

// import Button from '@mui/material/Button';
// import Image from 'next/image';
// import { toast, ToastContainer } from 'react-toastify';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// import 'react-toastify/dist/ReactToastify.css';
// import Link from 'next/link';
// import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';

// export default function Login() {
//   const [input, setInput] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const router = useRouter();

//   const _onChange = useCallback((event) => {
//     const { name, value } = event.target;
//     setInput((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }, []);

//   const _onLogin = async () => {
//     const { email, password } = input;

//     // Basic client-side validation
//     if (!email) return toast.error('Email is required');
//     if (!password) return toast.error('Password is required');
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Invalid email format');

//     setLoading(true);

//     try {
//       const result = await dispatch(loginUser({ email, password }));

//       if (loginUser.fulfilled.match(result)) {
//         toast.success('Login successful');
//         router.push('/');
//       } else {
//         toast.error(
//           result?.payload?.message ||
//           result?.payload?.error ||
//           'Login failed, please try again'
//         );
//       }
//     } catch (err) {
//       toast.error('Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     _onLogin();
//   };

//   return (
//     <div className="flex w-full h-screen bg-[#0F1014]">
//       <ToastContainer />
//       {/* Right Side */}
//       <div className="w-full min-h-screen bg-[#164A96] flex items-end justify-center items-center max-md:hidden">
//         <figcaption className="w-full h-auto min-h-screen">
//           <Image
//             src="/assets/auth/login.webp"
//             alt="Login"
//             width={1920}
//             height={1080}
//             className="w-full h-full object-cover"
//             priority
//           />
//         </figcaption>
//       </div>

//       {/* Left Side */}
//       <div className="w-[50%] p-4 bg-[#0F1014] flex flex-col justify-center items-center max-md:w-full max-md:bg-gradient-to-br from-yellow-400/60 to-blue-600/70">
//         <div className="w-full max-w-sm  max-md:pl-0 flex flex-col items-center">
//           <nav className="w-full mb-6 flex flex-col justify-center">
//             <h1 className="text-[#FFFFFF] text-4xl font-bold mb-4 font-[family-name:var(--font-roboto)]">Login</h1>
//             <h4 className="text-[#FFFFFF] font-semibold mb-4 font-[family-name:var(--font-roboto)]">If you don’t have an account register
//               You can <Link href="/signup" className="text-[#FF6D3E] font-semibold font-[family-name:var(--font-roboto)]">Register here !</Link></h4>
//           </nav>

//           <form
//             onSubmit={handleSubmit}
//             className="w-full max-w-screen-sm flex flex-col gap-6"
//           >

//             <label className="text-base font-semibold text-[#FFFFFF] flex flex-col font-[family-name:var(--font-roboto)]">
//               Email
//               <input
//                 type="email"
//                 name="email"
//                 value={input.email}
//                 onChange={_onChange}
//                 placeholder="Enter email"
//                 className="px-2 py-2 border-0 border-b-2 border-[#FFFFFF] font-medium text-base text-[#FFFFFF] outline-none font-[family-name:var(--font-roboto)]"
//               />
//             </label>

//             <label className="text-base font-semibold text-[#FFFFFF] flex flex-col font-[family-name:var(--font-roboto)]">
//               Password
//               <div className="flex items-center border-0 border-b-2 border-[#FFFFFF] py-2 box-border">
//                 <span className="cursor-pointer text-[#FFFFFF] font-normal">
//                   <HttpsOutlinedIcon />
//                 </span>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={input.password}
//                   onChange={_onChange}
//                   placeholder="Enter password"
//                   className="w-full outline-none text-[#FFFFFF] font-normal font-[family-name:var(--font-roboto)] pl-2 box-border"
//                 />
//                 <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-[#FFFFFF]">
//                   {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
//                 </span>
//               </div>
//             </label>

//             <div className="text-sm flex justify-end">
//               <button
//                 type="button"
//                 onClick={() => router.push('/reset-password')}
//                 className="text-[#FFFFFF] text-sm font-normal font-[family-name:var(--font-roboto)] cursor-pointer outline-none border-none bg-transparent"
//               >
//                 Forgot Password ?
//               </button>
//             </div>

//             <Button
//               variant="contained"
//               type="submit"
//               disabled={loading}
//               sx={{
//                 color: '#FFFFFF',
//                 background: '#FF6D3E',
//                 fontSize: '1rem',
//                 fontWeight: '600',
//                 fontFamily: 'var(--font-inter)',
//                 textTransform: 'none',
//                 borderRadius: '6rem'
//               }}
//               className="primary-button rounded-lg mt-3"
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </Button>
//           </form>
//         </div>
//       </div>

//     </div>
//   );
// }
