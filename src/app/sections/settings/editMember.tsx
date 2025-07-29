'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button } from '@mui/material';
import Api from '@/app/service/api';
import Alert from '@/app/components/alert/alert';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface Member {
    id: string;
    name: string;
    mobile: string;
    email: string;
    role: string;
    branch: string;
    restaurant_id: string;
    restaurant_name: string;
}

interface EditMemberProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    member: Member | null;
    // id: string | number;
    onEditUserSuccess?: (updatedMember: any) => void;
    branches: Branch[];
}

interface Branch {
    id: string | number;
    name: string;
}

const EditMember: React.FC<EditMemberProps> = ({ open, setOpen, member, onEditUserSuccess, branches }) => {

    const [name, setName] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [branch, setBranch] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');

    // Populate the form with the selected member's details when the dialog opens
    useEffect(() => {
        if (member) {
            setName(member.name || '');
            setMobile(member.mobile || '');
            setEmail(member.email || '');
            setRole(member.role || '');
            setBranch(member.restaurant_id || '');
        }
    }, [member]);

    const handleMobileChange = (value: string) => {
        setMobile(value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if (!member?.id) {
            setError('Invalid member ID.');
            setLoading(false);
            return;
        }
        try {
            if (!name || !mobile || !email || !role || !branch) {
                setError('Please fill in all required fields.');
                setSnackbarMessage('Please fill in all required fields.');
                setSnackbarSeverity('warning');
                setOpenSnackbar(true);
                setLoading(false);
                return;
            }
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                setError('Please enter a valid email');
                setSnackbarMessage('Please enter a valid email');
                setSnackbarSeverity('warning');
                setOpenSnackbar(true);
                setLoading(false);
                return;
            }

            const memberDetails = { user_id: member.id, name, mobile, email: email.trim().toLowerCase(), role, restaurant_id: branch };
            // console.log('Member Details:', memberDetails);
            // Make the API request
            const response = await Api.updateMember(member.restaurant_id, memberDetails);
            // // console.log('response', response);
            if (response?.id) {
                // Only call onEditSuccess if it is defined
                if (onEditUserSuccess) {
                    onEditUserSuccess(response);
                }
                // Display success message
                setSnackbarMessage(response?.message || `User details updated successfully!`);
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
            } else {
                setSnackbarMessage(response?.message || response?.error || 'Failed to update user details');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
            setLoading(false);
            setOpen(false);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error creating reservation.';
            setError(errorMessage);
            setSnackbarMessage(errorMessage);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            setLoading(false);
        }
    };

    // Handle closing Snackbar
    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false); // Hide Snackbar
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    style: {
                        backgroundColor: '#FFFFFF',
                        maxWidth: '420px',
                        borderRadius: '20px',
                        overflow: 'hidden',
                    },
                }}
            >
                <form className="send-enquiry-form" onSubmit={handleSubmit}>
                    <h4 className="bg-[#0265DC] p-4 box-border flex gap-2 text-xl text-[#FFFFFF] font-bold font-inter text-center">
                        Add Member
                    </h4>
                    <DialogContent>
                        <div className='flex flex-col gap-2'>
                            <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
                                Member Name
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Member name"
                                    className="px-3 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none"
                                    required
                                />
                            </label>
                            <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
                                Phone Number
                                {/* <input
                                    type="tel"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="Phone number"
                                    className="px-3 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none"
                                    required
                                /> */}
                                <PhoneInput
                                    country="gb" // Set default country to United Kingdom
                                    countryCodeEditable={false} // Prevent changing the country code manually
                                    // value={phone}
                                    value={mobile}
                                    onChange={handleMobileChange}
                                    // Container styles for the complete phone input
                                    containerStyle={{
                                        display: 'flex',
                                        gap: '10px',
                                        width: '100%',
                                        borderRadius: '8px',
                                        // border: '1px solid #AAADB1',
                                        // padding: '8px',
                                        boxSizing: 'border-box',
                                    }}
                                    // Styles for the input field inside PhoneInput
                                    inputStyle={{
                                        width: '100%',
                                        borderRadius: '8px',
                                        // border: 'none',
                                        border: '1px solid #AAADB1',
                                        padding: '20px 12px',
                                        boxSizing: 'border-box',
                                        fontSize: '1rem',
                                        color: '#414346',
                                        fontWeight: '400',
                                        outline: 'none',
                                        marginLeft: '50px',
                                        fontFamily: 'var(--font-inter)'
                                    }}
                                    // Styles for the dropdown button in the PhoneInput
                                    buttonStyle={{
                                        borderRadius: '8px',
                                        // border: 'none',
                                        border: '1px solid #AAADB1',
                                        fontSize: '1rem',
                                        color: '#414346',
                                        fontWeight: '400',
                                        outline: 'none',
                                        backgroundColor: 'transparent',
                                        fontFamily: 'var(--font-inter)'
                                        // overflow: 'hidden'
                                        // marginRight:'20px'
                                    }}
                                />
                            </label>
                            <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
                                Email
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    className="px-3 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none"
                                    required
                                />
                            </label>
                            <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
                                Role
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="px-3 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="manager">Manager</option>
                                    <option value="staff">Staff</option>
                                    <option value="receptionist">Receptionist</option>
                                </select>
                            </label>
                            <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
                                Branch
                                <select
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    className="px-3 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none"
                                    required
                                >
                                    <option value="">Select</option>
                                    {branches?.map((branch) => (
                                        <option key={branch.id} value={branch.id}>
                                            {branch.name}
                                        </option>
                                    ))}
                                    {/* <option value="New York">New York</option>
                                    <option value="San Francisco">San Francisco</option>
                                    <option value="Chicago">Chicago</option> */}
                                </select>
                            </label>
                            <div className="flex justify-end gap-4 mt-4">
                                <Button
                                    variant="outlined"
                                    onClick={() => setOpen(false)}
                                    sx={{ color: '#1F2122', border: '1px solid #AAADB1', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-inter)', textTransform: 'none' }}
                                    className="bg-transparent text-[#1F2122] font-inter font-semibold border-[#AAADB1] transform-none "
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    variant="contained"
                                    sx={{ background: '#0265DC', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-inter)', textTransform: 'none' }}
                                    className="bg-[#0265DC] font-inter font-semibold text-base text-[#FFFFFF] transform-none"
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
            {/* Snackbar Alert */}
            <Alert open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} />
        </>
    );
};

export default EditMember;
