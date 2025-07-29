import React, { useState, ChangeEvent, FormEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button } from '@mui/material';
import Api from '@/app/service/api';
import Alert from '@/app/components/alert/alert';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface AddMemberProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    // id: string | number;
    onAddUserSuccess?: (newMember: any) => void;
    branches: Branch[];
}

interface Branch {
    id: string | number;
    name: string;
}

const AddMember: React.FC<AddMemberProps> = ({ open, setOpen, onAddUserSuccess, branches }) => {

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

    // Handle input changes
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    // const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => setMobile(e.target.value);
    // const handleMobileChange = (value: string, data: {} | CountryData, event: ChangeEvent<HTMLInputElement>, formattedValue: string) => {
    //     setMobile(value); // Update the state with the `value` parameter
    // };
    const handleMobileChange = (value: string) => {
        setMobile(value);
        // setInput((prev) => ({
        //     ...prev,
        //     mobile: value,
        // }));
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value);
    const handleBranchChange = (e: ChangeEvent<HTMLSelectElement>) => setBranch(e.target.value);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // const id = localStorage.getItem('restaurantId') || 'default-id'; // or any default id you want to use
            const id = localStorage.getItem('restaurantId'); // or any default id you want to use
            if (!id) {
                setError('Failed to add user.');
                setSnackbarMessage('Failed to add user.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                setLoading(false);
                return;
            }
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

            const memberDetails = { name, mobile, email: email.trim().toLowerCase(), role, restaurant_id: branch };
            // Make the API request
            // const response = await Api.addMember(id, memberDetails);
            const response = await Api.addMember(branch, memberDetails);

            if (response) {
                // Only call onEditSuccess if it is defined
                if (onAddUserSuccess) {
                    onAddUserSuccess(response);
                }
                // Display success message
                setSnackbarMessage(response?.message || `User added successfully!`);
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
            } else {
                setSnackbarMessage(response?.message || response?.error || 'Failed to add user');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
            setLoading(false);
            setOpen(false);
            // Clear the form
            setName('');
            setMobile('');
            setEmail('');
            setRole('');
            setBranch('');
        } catch (error: any) {
            setLoading(false);
            // const errorMessage = error instanceof Error ? error.message : 'Failed to add user';
            // setError(`${error?.message}` || 'Failed to add user');
            // setSnackbarMessage(`${error}` || `${error?.message}` || 'Failed to add user');

            let errorMessage: string;

            if (typeof error === 'string') {
                // If the error is a string
                errorMessage = error;
            } else if (error instanceof Error) {
                // If the error is an Error object
                errorMessage = error.message;
            } else if (Array.isArray(error) && error[0]?.message) {
                // If the error is an array of objects with "message" key
                errorMessage = error.map((err) => err.message).join(', ');
            } else if (typeof error === 'object' && error !== null) {
                // If the error is a generic object, stringify it
                errorMessage = JSON.stringify(error);
            } else {
                // Default fallback for unknown error structures
                errorMessage = 'Failed to add user.';
            }

            setError(errorMessage);
            setSnackbarMessage(errorMessage);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
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
                                    onChange={handleNameChange}
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
                                    onChange={handleMobileChange}
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
                                    onChange={handleEmailChange}
                                    placeholder="Email address"
                                    className="px-3 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none"
                                    required
                                />
                            </label>
                            <label className="flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1">
                                Role
                                <select
                                    value={role}
                                    onChange={handleRoleChange}
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
                                    onChange={handleBranchChange}
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
                                    variant="contained"
                                    sx={{ background: '#0265DC', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-inter)', textTransform: 'none' }}
                                    className="bg-[#0265DC] font-inter font-semibold text-base text-[#FFFFFF] transform-none"
                                    disabled={loading}
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

export default AddMember;
