'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Api from '@/app/service/api';
import { Cookie, Storage } from '@/app/utils/common';
import Image from 'next/image';
import Alert from '@/app/components/alert/alert';
import { useCallback, useState } from 'react';

const ResetPasswordPage = () => {

    const [input, setInput] = useState({
        email: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
    const router = useRouter(); // Initialize the router

    // Handle input changes using useCallback to avoid unnecessary re-renders
    const _onChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setInput((prev) => ({
                ...prev,
                [name]: value,
            }));
        },
        []
    );

    const _onVerifyEmail = async () => {
        setLoading(true);
        setError(null); // Clear previous error
        // setSnackbarMessage('');

        try {
            const response = await Api.resetPassword({
                email: input.email,
            });

            if (response && response.success) {
                setSnackbarMessage('Reset password email sent! Please check your email.');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);

                // Navigate to a verify or check email page after email is sent
                // router.push('/verify');
            } else {
                setError(`${response?.message}` || 'Failed to send reset email.');
                setSnackbarMessage(`${response?.message}` || 'Failed to send reset email.');
                setSnackbarSeverity('error');
            }
            setLoading(false);
        } catch (error) {
            setError(`${error}` || 'Failed to send reset email.');
            setSnackbarMessage(`${error}` || 'Failed to send reset email.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!input.email) {
            setError('Please fill in both email and password.');
            setSnackbarMessage('Please fill in both email and password.');
            setSnackbarSeverity('warning');
            setOpenSnackbar(true);
            return;
        }

        _onVerifyEmail(); // Call the login function when form is submitted
    };

    // Handle closing Snackbar
    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false); // Hide Snackbar
    };

    return (
        <div className='flex max-sm:flex-col bg-[#E7E6F5] min-h-screen'>
            <div className="w-1/2 max-sm:w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/backgrounds/Rectangle 39589.png')" }}>
                {/* <div className='flex gap-6 p-6 box-border items-center w-[100%]'>
                    <img src="/assets/logo/TH.svg" alt="" className='w-[50px]' />
                    <img src="/assets/logo/Table Host.png" alt="" className='w-[250px]' />
                </div> */}
                <nav className="w-[100%] px-4 py-4 box-border mb-6 ">
                    {/* <Image src="/assets/logo/Table Host Blue.svg" width={100} height={100} layout="responsive" alt="Table Host" /> */}
                    <Image
                        src="/assets/logo/Table Host Blue.svg"
                        width={100}
                        height={100}
                        alt="Table Host"
                        priority
                        style={{ objectFit: 'contain', width: '80%', height: 'auto', maxWidth: '340px', minWidth: '160px' }}
                    />
                </nav>
                <figcaption className='w-[70%] h-auto'>
                    <Image
                        src="/assets/images/forgot-password/Collaboration Project 1.png"
                        alt="Illustration"
                        width={100}
                        height={100}
                        layout="responsive"
                        priority
                    />
                </figcaption>
                {/* <img
                    src="/assets/images/forgot-password/Collaboration Project 1.png"
                    alt="Illustration"
                    className="max-w-full w-[80%] h-auto"
                /> */}
            </div>

            <form onSubmit={handleSubmit} className="w-1/2 max-sm:w-full flex flex-col justify-center items-start p-10 box-border">
                <h6 className="text-xl font-semibold text-[#000000] font-roboto mb-4 max-w-lg">
                    To reset your password, please enter your email address
                    you may have used with TableHost.
                </h6>
                <label htmlFor="email" className="w-full max-w-screen-sm text-[#1F2122] flex flex-col text-base font-semibold font-inter">
                    Email
                    <input
                        type="email"
                        name="email"
                        id=""
                        placeholder="Email Id"
                        value={input.email}
                        onChange={_onChange}
                        className="w-full max-w-screen-sm border border-[#AAADB1] rounded-[12px] bg-[#FFFFFF] p-2 box-border outline-none text-[#414346] font-normal font-inter"
                    />
                </label>

                <div className="mt-6 flex justify-end gap-4 w-full max-w-screen-sm">
                    <Button variant="outlined" onClick={() => router.push('/login')}
                        sx={{ color: '#0265DC', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-inter)', textTransform: 'none' }}
                        className="text-[#0265DC] border border-[#0265DC] text-base font-semibold font-inter rounded-lg normal-case">
                        Return to Sign In
                    </Button>
                    <Button variant="contained"
                        sx={{ background: '#0265DC', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-inter)', textTransform: 'none' }}
                        className="bg-[#0265DC] text-base font-semibold font-inter rounded-lg normal-case"
                        // onClick={() => router.push('/verify')}
                        type="submit"
                        disabled={loading}>
                        {loading ? 'Sending...' : 'Next'}
                    </Button>
                </div>
            </form>
            {/* Snackbar Alert */}
            <Alert open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} />
        </div>
    )
}

export default ResetPasswordPage