"use client"; // Ensures the component is client-side rendered in Next.js 13 app directory

import { useState, FormEvent } from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import OTP from './OTP'; // Ensure this component is correctly imported and accepts setOtp as a prop

const VerifyCodePage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]); // Assuming OTP is an array of strings
  const router = useRouter();

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join(""); // Convert array of strings to a single string
    try {
      if (!otpCode) {
        alert("Please Enter OTP");
      } else if (otpCode.length < 4) {
        alert("Invalid OTP");
      } else {
        alert('OTP Verified Successfully');
        router.push('/new-password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen bg-[#E7E6F5]">
      {/* Left Side: Background and Logo */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/backgrounds/Rectangle 39589.png')" }}>
                <div className='flex gap-6 p-6 box-border items-center w-[100%]'>
                    <img src="/assets/logo/TH.svg" alt="" className='w-[50px]' />
                    <img src="/assets/logo/Table Host.png" alt="" className='w-[250px]' />
                </div>
                <img
                    src="/assets/images/forgot-password/Collaboration Project 1.png"
                    alt="Illustration"
                    className="max-w-full w-[80%] h-auto"
                />
            </div>

      {/* Right Side: OTP Input and Buttons */}
      <div className="w-1/2 flex flex-col justify-center items-start p-10">
        <h6 className="text-lg font-semibold text-gray-700 mb-4">
          An email with a verification code was just sent to pra•••••••••@gmail.com
        </h6>
        <div className="w-full flex justify-start gap-2 max-w-lg">
          <OTP /> {/* Adjust OTP component to accept otp and setOtp */}
        </div>
        <div className="mt-6 flex justify-end gap-4 w-full max-w-lg">
          <Button
            variant="outlined"
            sx={{ textTransform: 'none' }}
            className="capitalize first-letter:uppercase"
            onClick={() => router.push('/login')}
          >
            Return to Sign In
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#0265DC', textTransform: 'none' }}
            className="capitalize first-letter:uppercase"
            onClick={() => router.push('/new-password')}
            // onClick={handleForgotPassword} 
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodePage;
