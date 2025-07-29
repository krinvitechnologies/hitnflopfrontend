'use client';

import { Box, Typography, IconButton, MenuItem, Select, Avatar } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Api from '@/app/service/api';
import Loading from '@/app/loading';
import EditMember from '../editMember';
import Alert from '@/app/components/alert/alert';
import AddMember from '../addMember';

interface Member {
    id: string;
    user_id: string;
    name: string;
    email: string;
    role: string;
    branch: string;
    mobile: string;
    restaurant_id: string;
    restaurant_name: string;
    created_at: string;
}

interface NewMembersProps {
    newMembers: any[];
}

const Teams: React.FC<NewMembersProps> = ({ newMembers }) => {
    // const Teams = ({ newMembers }) => {
    const [teamMembers, setTeamMembers] = useState<{ users: Array<{ user_id: string, name: string, role: string, email: string, mobile: string, restaurant_id: string, restaurant_name: string, created_at: string }> } | null>(null);
    const [editMemberOpen, setEditMemberOpen] = useState<boolean>(false);
    const [addMemberOpen, setAddMemberOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
    const router = useRouter();

    const [selectedMember, setSelectedMember] = useState<Member | null>(null);


    const handleAddUserSuccess = (newMembers: Member[]) => {
        console.log('newMembers newMembers newMembers', newMembers);

        setTeamMembers((prevState) => {
            if (!prevState) return null;
            return {
                ...prevState,
                users: [...prevState.users, ...newMembers], // Append all new members
            };
        });

        setSnackbarMessage('New members added successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };

    useEffect(() => {
        if (newMembers && newMembers.length > 0) {
            handleAddUserSuccess(newMembers); // Pass the entire array of new members
        }
    }, [newMembers]);

    // Fetch profile details on component load
    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const id = localStorage.getItem('restaurantId') || 'default-id';
                const teamsData = await Api.getMember(id);
                // console.log('teamsData', teamsData);
                setTeamMembers(teamsData);
                // console.log('teamMembers', teamMembers);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchTeamMembers();
    }, []);

    if (!teamMembers) {
        return <Loading />; // Show a loading indicator while profile data is being fetched
    }

    const handleDeleteMember = async (user_id: string) => {
        setLoading(true);
        setError(null);
        try {
            const id = localStorage.getItem('restaurantId') || 'default-id'; // or any default id you want to use

            const memberDetails = { user_id };
            // console.log('Member Details:', memberDetails);
            // Make the API request
            const response = await Api.addMember(id, memberDetails);
            // If the API response is successful, remove the user from the state
            if (response?.success) {
                setTeamMembers((prev) => {
                    if (!prev) return prev; // Ensure the current state exists
                    return {
                        ...prev,
                        users: prev.users.filter((user) => user.user_id !== user_id),
                    };
                });
                setSnackbarMessage(response?.message || 'User deleted successfully!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
            } else {
                setSnackbarMessage(response?.message || 'Failed to delete user');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
            setLoading(false);
        } catch (error) {
            // const errorMessage = error instanceof Error ? error.message : 'Failed to delete user';
            // setError(errorMessage);
            // setSnackbarMessage(errorMessage);
            // setSnackbarSeverity('error');
            // setOpenSnackbar(true);
            // setLoading(false);
            setLoading(false);
            setError(`${error}` || 'Failed to delete user');
            setSnackbarMessage(`${error}` || 'Failed to delete user');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleEditUserSuccess = (updatedMember: Member) => {
        console.log('Updated Member:', updatedMember);

        setTeamMembers((prevState) => {
            if (!prevState) return null; // Handle case where teamMembers is null
            return {
                ...prevState,
                users: prevState.users.map((user) =>
                    user.user_id === updatedMember.id
                        ? {
                            ...user,
                            name: updatedMember.name,
                            email: updatedMember.email,
                            mobile: updatedMember.mobile,
                            role: updatedMember.role,
                            // Update other fields if required
                            created_at: updatedMember.created_at,
                        }
                        : user
                ),
            };
        });

        setSnackbarMessage('Member details updated successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
    };


    // const handleAddUserSuccess = (newMember: Member) => {
    //     console.log('New Member:', newMember);

    //     setTeamMembers((prevState) => {
    //         if (!prevState) return null; // Handle case where teamMembers is null
    //         return {
    //             ...prevState,
    //             users: [...prevState.users, newMember], // Append new member to the existing array
    //         };
    //     });

    //     // setSnackbarMessage('New member added successfully!');
    //     // setSnackbarSeverity('success');
    //     // setOpenSnackbar(true);
    // };






    // Handle closing Snackbar
    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false); // Hide Snackbar
    };

    return (
        <Box className="bg-[#FFFFFf] border border-[#AAADB1] rounded-b-lg overflow-hidden h-[69vh] overflow-y-auto"
            style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none' /* IE and Edge */,
            }}>
            <table className="min-w-full bg-[#FFFFFF] rounded-none ">
                <thead >
                    <tr className="bg-[#FFFFFF] border-b border-[#E1E3E6]">
                        <th className="py-3 px-4 text-left text-sm font-semibold text-[#1F2122] font-inter">Name</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-[#1F2122] font-inter">Email Address</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-[#1F2122] font-inter">Contact Number</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-[#1F2122] font-inter">Role</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-[#1F2122] font-inter">Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {teamMembers.users.map((user) => (
                        <tr key={user.user_id} className="border-b">
                            <td className="py-2 px-4 flex items-center gap-3">
                                <Avatar
                                    //  src="/path-to-avatar.png"
                                    alt="User Avatar" className="w-8 h-8" />
                                <Typography className="text-[#1F2122] font-inter text-sm font-normal">{user?.name.charAt(0).toUpperCase() + user?.name.slice(1)}</Typography>
                            </td>
                            <td className="py-2 px-4">
                                <Typography className="text-[#1F2122] font-inter text-sm font-normal">{user?.email}</Typography>
                            </td>
                            <td className="py-2 px-4">
                                <Typography className="text-[#1F2122] font-inter text-sm font-normal">{user?.mobile}</Typography>
                            </td>
                            <td className="py-2 px-4">
                                <Select
                                    defaultValue="Button Label"
                                    variant="outlined"
                                    className="bg-[#FFFFFF] rounded-lg overflow-hidden h-[40px] border border-[#AAADB1] text-[#1F2122] font-inter text-sm font-semibold"
                                >
                                    <MenuItem value="Button Label" className="text-[#1F2122] font-inter text-sm font-normal">Button Label</MenuItem>
                                    <MenuItem value="admin" className="text-[#1F2122] font-inter text-sm font-normal">Admin</MenuItem>
                                    <MenuItem value="member" className="text-[#1F2122] font-inter text-sm font-normal">Member</MenuItem>
                                </Select>
                            </td>
                            <td className="py-2 px-4 flex gap-2">
                                <IconButton
                                    // onClick={() => {
                                    //     setSelectedMember(user);
                                    //     setEditMemberOpen(true);
                                    // }}
                                    onClick={() => {
                                        setSelectedMember({
                                            id: user.user_id, // Assign a unique identifier
                                            user_id: user.user_id,
                                            name: user.name,
                                            email: user.email,
                                            mobile: user.mobile,
                                            role: user?.role,
                                            branch: "default-branch",
                                            restaurant_id: user.restaurant_id,
                                            restaurant_name: user.restaurant_name,
                                            created_at: user.created_at,
                                        });
                                        setEditMemberOpen(true);
                                    }}
                                >
                                    <Edit className="text-[#1F2122] font-inter text-md font-normal" />
                                </IconButton>
                                {/* <EditMember open={editMemberOpen} setOpen={setEditMemberOpen} member={selectedMember} onEditUserSuccess={handleEditUserSuccess} /> */}
                                <IconButton onClick={() => handleDeleteMember(user.user_id)}>
                                    <Delete className="text-[#1F2122] font-inter text-md font-normal" />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Snackbar Alert */}
            <Alert open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} />

        </Box>
    );
};

export default Teams;
