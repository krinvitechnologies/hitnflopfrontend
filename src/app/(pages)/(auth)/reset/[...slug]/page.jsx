'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword } from '@/src/app/lib/store/features/user/userSlice';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const NewPasswordPage = () => {
  const [input, setInput] = useState({ password: '', confirm_password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [id, setId] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const extractedId = pathname?.split('/reset/')[1];
    setId(extractedId || null);
  }, [pathname]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirm_password } = input;

    if (!password || !confirm_password) {
      return toast.error("Please fill in all required fields.");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long.");
    }

    if (password !== confirm_password) {
      return toast.error("The passwords you entered do not match.");
    }

    try {
      setLoading(true);
      const result = await dispatch(resetPassword({ password, token: id }));

      if (resetPassword.fulfilled.match(result)) {
        toast.success("Your password has been successfully updated.");
        router.push('/login');
      } else {
        toast.error(
          result.payload?.message ||
          result.payload?.error ||
          "Something went wrong while resetting your password."
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#0F1014]">
      {/* Left Side */}
      <div className="w-full min-h-screen bg-[#164A96] flex justify-center items-center max-md:hidden">
        <figcaption className="w-full h-auto min-h-screen">
          <Image
            src="/assets/auth/new_password.webp"
            alt="New Password"
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
            <h4 className="text-[#FFFFFF] font-semibold mb-4 font-[family-name:var(--font-roboto)]">Please, enter new password to continue.</h4> </nav>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-screen-sm flex flex-col gap-6"
          >

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
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full outline-none text-[#FFFFFF] font-normal font-[family-name:var(--font-roboto)] pl-2 box-border"
                />
                <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-[#FFFFFF]">
                  {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </span>
              </div>
            </label>

            <label className="text-base font-semibold text-[#FFFFFF] flex flex-col font-[family-name:var(--font-roboto)]">
              Password
              <div className="flex items-center border-0 border-b-2 border-[#FFFFFF] py-2 box-border">
                <span className="cursor-pointer text-[#FFFFFF] font-normal">
                  <HttpsOutlinedIcon />
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirm_password"
                  value={input.confirm_password}
                  onChange={handleChange}
                  placeholder="Enter confirm password"
                  className="w-full outline-none text-[#FFFFFF] font-normal font-[family-name:var(--font-roboto)] pl-2 box-border"
                />
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer">
                  {showConfirmPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </span>
              </div>
            </label>

            <div className="mt-6 flex justify-end gap-4 w-full max-w-screen-sm">
              <Button
                variant="outlined"
                onClick={() => router.push('/login')}
                sx={{ color: '#0265DC', fontSize: '1rem', fontWeight: '600', textTransform: 'none', borderRadius: '6rem' }}
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
                {loading ? 'Processing...' : 'Reset'}
              </Button>
            </div>


          </form>
        </div>
      </div>

    </div>
  );
};

export default NewPasswordPage;








{/* // 'use client';

// import { useCallback, useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { Button } from '@mui/material';
// import Image from 'next/image';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import { VisibilityOffOutlined } from '@mui/icons-material';
// import { resetPassword } from '@/src/app/lib/store/features/user/userSlice';

// const NewPasswordPage = () => {
//   const [input, setInput] = useState({ password: '', confirm_password: '' });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [id, setId] = useState(null);

//   const router = useRouter();
//   const pathname = usePathname();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const extractedId = pathname?.split('/reset/')[1];
//     setId(extractedId || null);
//   }, [pathname]);

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setInput((prev) => ({ ...prev, [name]: value }));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { password, confirm_password } = input;

//     if (!password || !confirm_password) {
//       return toast.error("Please fill in all required fields.");
//     }

//     if (password.length < 8) {
//       return toast.error("Password must be at least 8 characters long.");
//     }

//     if (password !== confirm_password) {
//       return toast.error("The passwords you entered do not match.");
//     }

//     try {
//       setLoading(true);
//       const result = await dispatch(resetPassword({ password, token: id }));

//       if (resetPassword.fulfilled.match(result)) {
//         toast.success("Your password has been successfully updated.");
//         router.push('/login');
//       } else {
//         toast.error(
//           result.payload?.message ||
//           result.payload?.error ||
//           "Something went wrong while resetting your password."
//         );
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='flex max-sm:flex-col bg-[#E7E6F5] min-h-screen'>
//       {/* Left Section */}
//       <div
//         className="w-1/2 max-sm:w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: "url('/assets/backgrounds/Rectangle 39589.png')" }}
//       >
//         <nav className="w-full px-4 py-4 mb-6">
//           <Image
//             src="/assets/logo/Table Host Blue.svg"
//             width={100}
//             height={100}
//             alt="Table Host"
//             priority
//             style={{ objectFit: 'contain', width: '80%', height: 'auto', maxWidth: '340px', minWidth: '160px' }}
//           />
//         </nav>
//         <figcaption className='w-[70%] h-auto'>
//           <Image
//             src="/assets/images/forgot-password/Collaboration Project 1.png"
//             alt="Illustration"
//             width={100}
//             height={100}
//             layout="responsive"
//             priority
//           />
//         </figcaption>
//       </div>

//       {/* Form Section */}
//       <form onSubmit={handleSubmit} className="w-1/2 max-sm:w-full flex flex-col justify-center items-start p-10">
//         <h6 className="text-lg font-semibold text-[#1F2122] font-inter mb-4">
//           Please, enter new password to continue.
//         </h6>

//         {/* Password Field */}
//         <label className="mb-4 w-full max-w-screen-sm text-base font-semibold font-inter text-[#1F2122]">
//           Password
//           <div className="flex items-center border border-[#AAADB1] rounded-[12px] bg-white p-2 mt-1">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               placeholder="Password"
//               value={input.password}
//               onChange={handleChange}
//               className="w-full border-none outline-none bg-transparent text-[#414346]"
//             />
//             <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
//               {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlined />}
//             </span>
//           </div>
//         </label>

//         {/* Confirm Password Field */}
//         <label className="w-full max-w-screen-sm text-base font-semibold font-inter text-[#1F2122]">
//           Re-Enter Password
//           <div className="flex items-center border border-[#AAADB1] rounded-[12px] bg-white p-2 mt-1">
//             <input
//               type={showConfirmPassword ? 'text' : 'password'}
//               name="confirm_password"
//               placeholder="Confirm Password"
//               value={input.confirm_password}
//               onChange={handleChange}
//               className="w-full border-none outline-none bg-transparent text-[#414346]"
//             />
//             <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer">
//               {showConfirmPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlined />}
//             </span>
//           </div>
//         </label>

//         {/* Buttons */}
//         <div className="mt-6 flex justify-end gap-4 w-full max-w-screen-sm">
//           <Button
//             variant="outlined"
//             onClick={() => router.push('/login')}
//             sx={{
//               color: '#0265DC',
//               fontSize: '1rem',
//               fontWeight: '600',
//               fontFamily: 'var(--font-inter)',
//               textTransform: 'none',
//             }}
//           >
//             Return to Sign In
//           </Button>
//           <Button
//             variant="contained"
//             type="submit"
//             disabled={loading}
//             sx={{
//               background: '#0265DC',
//               fontSize: '1rem',
//               fontWeight: '600',
//               fontFamily: 'var(--font-inter)',
//               textTransform: 'none',
//             }}
//           >
//             {loading ? 'Processing...' : 'Reset'}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewPasswordPage; */}











// 'use client';

// import { useCallback, useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { Button } from '@mui/material';
// import Api from '@/app/service/api';
// import { useRouter, usePathname } from 'next/navigation';

// const NewPasswordPage = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };

//   const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//   };

//   const [input, setInput] = useState({
//     password: '',
//     confirm_password: '',
//   });
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
//   const [id, setId] = useState<string | null>(null);
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

//   const pathname = usePathname();

//   useEffect(() => {
//     // Extract the last segment of the URL
//     const extractedId = pathname?.split('/reset/')[1];
//     setId(extractedId || null);
//   }, [pathname]);

//   const _onVerifyPassword = async () => {
//     setLoading(true);
//     setError(null); // Clear previous error
//     // setSnackbarMessage('');

//     try {
//       const payload = {
//         password: input.password
//       }
//       const response = await Api.newPassword(id ?? '', payload);

//       if (response || response.success) {
//         setSnackbarMessage('Password update successful.');
//         setSnackbarSeverity('success');
//         setOpenSnackbar(true);

//         // Navigate to a login page
//         router.push('/login');
//       } else {
//         setError(`${response?.message}` || 'Failed to update password.');
//         setSnackbarMessage(`${response?.message}` || 'Failed to update password.');
//         setSnackbarSeverity('error');
//       }
//       setLoading(false);
//     } catch (error) {
//       setError(`${error}` || 'Failed to update password.');
//       setSnackbarMessage(`${error}` || 'Failed to update password.');
//       setSnackbarSeverity('error');
//       setOpenSnackbar(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!input.password) {
//       setError('Please enter a password.');
//       setSnackbarMessage('Please enter a password.');
//       setSnackbarSeverity('warning');
//       setOpenSnackbar(true);
//       return;
//     }

//     if (!input.confirm_password) {
//       setError('Please enter a confirm password.');
//       setSnackbarMessage('Please enter a confirm password.');
//       setSnackbarSeverity('warning');
//       setOpenSnackbar(true);
//       return;
//     }

//     if (input.password !== input.confirm_password) {
//       setError('Password and confirm password do not match.');
//       setSnackbarMessage('Password and confirm password do not match.');
//       setSnackbarSeverity('error');
//       return;
//     }

//     _onVerifyPassword(); // Call the login function when form is submitted
//   };

//   // Handle closing Snackbar
//   const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpenSnackbar(false); // Hide Snackbar
//   };

//   return (
//     <div className="flex h-screen bg-[#E7E6F5]">
//       <div className="w-1/2 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/backgrounds/Rectangle 39589.png')" }}>
//         <div className='flex gap-6 p-6 box-border items-center w-[100%]'>
//           <img src="/assets/logo/TH.svg" alt="" className='w-[50px]' />
//           <img src="/assets/logo/Table Host.png" alt="" className='w-[250px]' />
//         </div>
//         <img
//           src="/assets/images/forgot-password/Collaboration Project 1.png"
//           alt="Illustration"
//           className="max-w-full w-[80%] h-auto"
//         />
//       </div>
//       <form onSubmit={handleSubmit} className="w-1/2 flex flex-col justify-center items-start p-10">
//         <h6 className="text-lg font-semibold text-gray-700 mb-4">Please, enter new password to continue.</h6>
//         {/* <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
//           <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//           <OutlinedInput
//             id="outlined-adornment-password"
//             sx={{ background: '#FFFFFF' }}
//             type={showPassword ? 'text' : 'password'}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//           />
//         </FormControl>
//         <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
//           <InputLabel htmlFor="outlined-adornment-password">Re-Enter</InputLabel>
//           <OutlinedInput
//             id="outlined-adornment-password"
//             sx={{ background: '#FFFFFF' }}
//             type={showPassword ? 'text' : 'password'}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//           />
//         </FormControl> */}
//         <label htmlFor="password" className="w-full max-w-screen-sm text-[#1F2122] flex flex-col text-base font-semibold font-inter">
//           Password
//           <input
//             type="password"
//             name="password"
//             id=""
//             placeholder="Password"
//             value={input.password}
//             onChange={_onChange}
//             className="w-full max-w-screen-sm border border-[#AAADB1] rounded-[12px] bg-[#FFFFFF] p-2 box-border outline-none text-[#414346] font-normal font-inter"
//           />
//         </label>
//         <label htmlFor="confirm_password" className="w-full max-w-screen-sm text-[#1F2122] flex flex-col text-base font-semibold font-inter">
//           Re-Enter
//           <input
//             type="password"
//             name="confirm_password"
//             id=""
//             placeholder="Confirm password"
//             value={input.confirm_password}
//             onChange={_onChange}
//             className="w-full max-w-screen-sm border border-[#AAADB1] rounded-[12px] bg-[#FFFFFF] p-2 box-border outline-none text-[#414346] font-normal font-inter"
//           />
//         </label>
//         <div className="mt-6 flex justify-end gap-4 w-full">
//           <Button
//             variant="outlined" onClick={() => router.push('/login')}
//             sx={{ color: '#0265DC', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-inter)', textTransform: 'none' }}
//             className="text-[#0265DC] border border-[#0265DC] text-base font-semibold font-inter rounded-lg normal-case">
//             Return to Sign In
//           </Button>
//           <Button variant="contained"
//             sx={{ background: '#0265DC', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-inter)', textTransform: 'none' }}
//             className="bg-[#0265DC] text-base font-semibold font-inter rounded-lg normal-case"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? 'Processing...' : 'Reset'}
//           </Button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default NewPasswordPage