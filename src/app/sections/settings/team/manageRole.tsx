'use client';

import { Box, Typography, IconButton, MenuItem, Select, Avatar } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Sidebar from '../../../components/sidebar/sidebar'
import { Button, Paper } from '@mui/material';
import Link from 'next/link';
import { useState, ChangeEvent, useCallback, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import BusinessIcon from '@mui/icons-material/Business';
import ProfileHeader from '@/app/components/profile/profileHeader';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Api from '@/app/service/api';
import Alert from '@/app/components/alert/alert';
import SkeletonLoading from '@/app/components/skeletonLoading/SkeletonLoading';

interface RolePermissions {
    [key: string]: number;
}

const defaultPermissions: RolePermissions = {
    dashboard: 1,
    floor_plan: 1,
    manage_tables: 1,
    reservations: 1,
    guest_list: 1,
    reports: 1,
    company_profile: 1,
    branches: 1,
    team: 1,
    manage_roles: 1,
    integrations: 1,
    payment_subscription: 1,
};

const permissionsList = [
    { label: 'Dashboard', key: 'dashboard' },
    { label: 'Floor Plans', key: 'floor_plan' },
    { label: 'Manage Tables', key: 'manage_tables' },
    { label: 'Reservations', key: 'reservations' },
    { label: 'Guest List', key: 'guest_list' },
    { label: 'Reports', key: 'reports' },
    { label: 'Company Profile', key: 'company_profile' },
    { label: 'Branches', key: 'branches' },
    { label: 'Team', key: 'team' },
    { label: 'Manage Roles', key: 'manage_roles' },
    { label: 'Integrations', key: 'integrations' },
    { label: 'Payment & Subscriptions', key: 'payment_subscription' },
];

const ManageRole = () => {

    const [roles, setRoles] = useState<string[]>([]);
    const [permissions, setPermissions] = useState<{ [role: string]: RolePermissions }>({});

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);

    // useEffect(() => {
    //     // Fetch current profile details and populate the form
    //     const fetchRoles = async () => {
    //         try {
    //             setLoading(true);
    //             const rolesData = await Api.getRoles();
    //             // console.log('rolesData', rolesData);
    //             setRoles(rolesData.roles || []);
    //             // console.log('roles', roles);
    //             const initialPermissions = rolesData.roles.reduce((acc: any, role: string) => {
    //                 acc[role] = { ...defaultPermissions };
    //                 return acc;
    //             }, {});
    //             setPermissions(initialPermissions);
    //             setLoading(false);
    //         } catch (error) {
    //             setError('Failed to fetch roles');
    //         }
    //         finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchRoles();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [rolesData, profileData] = await Promise.all([
                    Api.getRoles(),
                    Api.profile()
                ]);

                setRoles(rolesData.roles || []);
                setProfile(profileData);

                const permissionsMap: { [role: string]: RolePermissions } = {};

                // Step 1: Set default for all roles
                rolesData.roles.forEach((role: string) => {
                    permissionsMap[role] = { ...defaultPermissions };
                });

                // Step 2: Override current user's role with actual permission
                if (profileData?.role) {
                    // const permissionData = await Api.getPermission(profileData.role);
                    // // const permissionData = await Api.getPermission("manager");
                    // // console.log('permissionData', permissionData.permissions);
                    // // permissionsMap[profileData.role] = permissionData.permissions;

                    // const roleName = permissionData.permission?.name;
                    // const actualPermissions = permissionData.permission?.permissions;

                    // if (roleName && actualPermissions) {
                    //     permissionsMap[roleName] = actualPermissions;
                    // }
                    try {
                        const permissionData = await Api.getPermission(profileData.role);
                        const roleName = permissionData.permission?.name;
                        const actualPermissions = permissionData.permission?.permissions;
    
                        if (roleName && actualPermissions) {
                            permissionsMap[roleName] = actualPermissions;
                        }
                    } catch (error) {
                        // console.error("Error fetching permissions for role:", profileData.role);
                        // In case of an error (like "Invalid Role"), keep default permissions
                        permissionsMap[profileData.role] = { ...defaultPermissions };
                    }
                }

                setPermissions(permissionsMap);
            } catch (error) {
                console.error("Error loading profile or roles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // if (loading) {
    //     return <SkeletonLoading />; // Show a loading indicator while profile data is being fetched
    // }


    // const handleTogglePermission = useCallback((role: string, key: string) => {
    //     setPermissions((prev) => ({
    //         ...prev,
    //         [role]: {
    //             ...prev[role],
    //             [key]: prev[role][key] === 1 ? 0 : 1,
    //         },
    //     }));
    // }, []);


    // Fetch profile details on component load
    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         try {
    //             const profileData = await Api.profile();
    //             setProfile(profileData); // Save the profile details in state
    //         } catch (error) {
    //             console.error('Error fetching profile:', error);
    //         }
    //     };

    //     fetchProfile();  // Call the profile API
    // }, []);

    // useEffect(() => {
    //     const fetchProfileAndPermissions = async () => {
    //         try {
    //             const profileData = await Api.profile();
    //             setProfile(profileData); // Save profile

    //             if (profileData?.role) {
    //                 // const permissionData = await Api.getPermission(profileData.role);
    //                 const permissionData = await Api.getPermission("manager");
    //                 // setPermissions((prev) => ({
    //                 //     ...prev,
    //                 //     [profileData.role]: permissionData.permissions
    //                 // }));

    //                 const roleName = permissionData.permission?.name;
    //                 const actualPermissions = permissionData.permission?.permissions;

    //                 // if (roleName && actualPermissions) {
    //                 //     permissionsMap[roleName] = actualPermissions;
    //                 // }

    //                 setPermissions((prev) => ({
    //                     ...prev,
    //                     ["manager"]: actualPermissions
    //                     // [profileData.role]: permissionData.permissions
    //                   }));
    //             }
    //         } catch (error) {
    //             console.error('Error fetching profile or permissions:', error);
    //         }
    //     };

    //     fetchProfileAndPermissions();
    // }, []);


    const handleTogglePermission = useCallback(
        async (role: string, key: string) => {
            const updatedPermissions = {
                ...permissions,
                [role]: {
                    ...permissions[role],
                    [key]: permissions?.[role]?.[key] === 1 ? 0 : 1,
                },
            };

            setPermissions(updatedPermissions);

            try {
                // const id = profile.role
                const id = role
                // const permissions = updatedPermissions[role]
                const payload = {
                    // role,
                    ...updatedPermissions[role], // Directly spread the permissions without nesting them
                };
                // console.log('payload', payload);


                // await Api.updateRoles({ role, permissions: updatedPermissions[role] });
                await Api.updateRoles(id, payload);
                // console.log(`Permissions updated for role: ${role}`, updatedPermissions[role]);
            } catch (error) {
                // console.error('Failed to update permissions', error);
                setError('Failed to update permissions. Please try again.');
            }
        },
        [permissions]
    );

    // Handle closing Snackbar
    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false); // Hide Snackbar
    };

    return (
        <>
            {
                loading ?
                    (<div className='h-[69vh] w-full rounded-b-lg overflow-hidden'>
                        <SkeletonLoading />
                    </div>) :
                    (
                        <div style={{
                            scrollbarWidth: 'none', /* Firefox */
                            msOverflowStyle: 'none' /* IE and Edge */,
                        }} className="bg-[#FFFFFf] border border-[#AAADB1] rounded-b-lg overflow-hidden p-4 box-border flex flex-col gap-3 h-[70vh] overflow-y-auto">
                            {roles.length > 0 ? (
                                roles.map((role, index) => (
                                    <div key={index} className="bg-[#F6F7F8] rounded-lg ">
                                        <div className="p-3 box-border border-b-[1px] border-[#AAADB1] flex items-center justify-between">
                                            <h3 className='text-lg text-[#1F2122] font-semibold font-roboto text-center'>{role}</h3>
                                            <DeleteOutlineIcon />
                                        </div>
                                        <div className='flex flex-wrap justify-between gap-2 p-3 box-border'>
                                            {permissionsList.map(({ label, key }) => (
                                                <div key={key} className='flex items-center gap-2 p-1 box-border'>
                                                    <h4 className="text-base text-[#1F2122] font-medium">{label}</h4>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={permissions[role]?.[key] === 1}
                                                                onChange={() => handleTogglePermission(role, key)}
                                                            />
                                                        }
                                                        label=""
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <span className="text-center">
                                    No roles available.
                                </span>
                            )}

                        </div >
                    )
            }
        </>
    );
};

export default ManageRole;










// 'use client';

// import { Box, Typography, IconButton, MenuItem, Select, Avatar } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';




// import Sidebar from '../../../components/sidebar/sidebar'
// import { Button, Paper } from '@mui/material';
// import Link from 'next/link';
// import { useState, ChangeEvent, useCallback, useEffect } from 'react';
// import EditIcon from '@mui/icons-material/Edit';
// import BusinessIcon from '@mui/icons-material/Business';
// import ProfileHeader from '@/app/components/profile/profileHeader';
// import { useRouter } from 'next/navigation';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Api from '@/app/service/api';
// import Alert from '@/app/components/alert/alert';


// const ManageRole = () => {

//     const [input, setInput] = useState({
//         email: '',
//         name: '',
//         role: '',
//         // image: null as string | File | null,
//     });
//     const [roles, setRoles] = useState<any>(null);  // State to store details
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
//     const router = useRouter();

//     useEffect(() => {
//         // Fetch current profile details and populate the form
//         const fetchRoles = async () => {
//             try {
//                 const rolesData = await Api.getRoles();
//                 console.log('rolesData', rolesData);

//                 setRoles(rolesData)
//                 console.log('roles', roles);

//             } catch (error) {
//                 setError('Failed to fetch roles');
//             }
//         };

//         fetchRoles();
//     }, []);

//     // Handle input changes using useCallback to avoid unnecessary re-renders
//     const handleInputChange = useCallback(
//         (event: React.ChangeEvent<HTMLInputElement>) => {
//             const { name, value } = event.target;
//             setInput((prev) => ({
//                 ...prev,
//                 [name]: value
//             }));
//         },
//         []
//     );

//     const _onRoleChange = async () => {
//         setLoading(true);
//         setError(null);
//         // setSnackbarMessage('');
//         try {

//             const payload = {
//                 email: input.email,
//                 name: input.name,
//                 role: input.role,
//                 // image: image
//             };

//             // Check if `image` is a File before appending it to the FormData
//             const response = await Api.updateRoles(payload);

//             // Make the API call
//             // const response = await Api.updateUserProfile(formData);

//             // await Api.updateUserProfile(payload); // API call for profile update
//             setSnackbarMessage('Profile updated successfully!');
//             setSnackbarSeverity('success');
//             setOpenSnackbar(true);
//             router.push('/profile'); // Redirect to profile page
//         } catch (error: any) { // Add type `any` to error to handle it properly
//             setLoading(false);
//             const errorMessage = error?.message || 'Profile update failed. Please try again.'; // Get error message properly
//             setError(errorMessage);
//             setSnackbarMessage(errorMessage);
//             setSnackbarSeverity('error');
//             setOpenSnackbar(true);
//         }
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         _onRoleChange
//     };

//     // Handle closing Snackbar
//     const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setOpenSnackbar(false); // Hide Snackbar
//     };

//     return (
//         <div style={{
//             scrollbarWidth: 'none', /* Firefox */
//             msOverflowStyle: 'none' /* IE and Edge */,
//         }} className="bg-[#FFFFFf] border border-[#AAADB1] rounded-b-lg overflow-hidden p-4 box-border flex flex-col gap-3 h-[70vh] overflow-y-auto">
//             <div className="bg-[#F6F7F8] rounded-lg ">
//                 <div className="p-3 box-border border-b-[1px] border-[#AAADB1] flex items-center justify-between">
//                     <h3 className='text-lg text-[#1F2122] font-semibold font-roboto text-center'>Manager</h3>
//                     <DeleteOutlineIcon />
//                 </div>
//                 <div className='flex flex-col gap-2 p-3 box-border'>
//                     <div className="flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Dashboard</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Floor Plans</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Manage Tables</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Reservations</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Guest List</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Reports</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Company Profile</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Branches</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Team</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Manage Roles</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Team</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Integrations</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/3">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Payment and Subscriptions</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="" className="" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="bg-[#F6F7F8] rounded-lg">
//                 <div className="p-3 box-border border-b-[1px] border-[#AAADB1] flex items-center justify-between">
//                     <h3 className='text-lg text-[#1F2122] font-semibold font-roboto text-center'>Receptionist</h3>
//                     <DeleteOutlineIcon />
//                 </div>
//                 <div className='flex flex-col gap-2 p-3 box-border'>
//                     <div className="flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Dashboard</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Floor Plans</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Manage Tables</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Reservations</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Guest List</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Reports</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Company Profile</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Branches</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Team</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Manage Roles</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Team</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Integrations</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/3">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Payment and Subscriptions</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="" className="" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="bg-[#F6F7F8] rounded-lg">
//                 <div className="p-3 box-border border-b-[1px] border-[#AAADB1] flex items-center justify-between">
//                     <h3 className='text-lg text-[#1F2122] font-semibold font-roboto text-center'>Staff</h3>
//                     <DeleteOutlineIcon />
//                 </div>
//                 <div className='flex flex-col gap-2 p-3 box-border'>
//                     <div className="flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Dashboard</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Floor Plans</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Manage Tables</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Reservations</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Guest List</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Reports</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Company Profile</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Branches</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Team</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Manage Roles</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Team</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Integrations</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/3">
//                             <h4 className='text-base text-[#1F2122] font-medium font-roboto text-center'>Payment and Subscriptions</h4>
//                             <FormControlLabel control={<Switch defaultChecked />} label="" className="" />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* <div className="box2  py-2 mb-2 h-[28.5%] border-2 border-slate-100 mx-4 bg-gray-100 rounded-lg">
//                     <div className="row1 h-[22%] px-4  border-b-[2px] border-gray-300 flex items-center justify-between text-black font-bold">
//                         <h1>Receptionist</h1>
//                         <img src="delete.png" className="w-5" />
//                     </div>
//                     <div className="px-4 row2 mt-2 mb-1 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Dashboard</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Floor Plans</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Manage Tables</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Reservations</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Guest List</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="px-4 row3 mb-1 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Reports</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Company Profile</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Branches</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Team</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Manage Roles</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="px-4 row4 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Team</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Integrations</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/4">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Payment and Subscriptions</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="" className="" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="box3  py-2 mb-2 h-[28.5%] border-2 border-slate-100 mx-4 bg-gray-100 rounded-lg">
//                     <div className="row1 h-[22%] px-4  border-b-[2px] border-gray-300 flex items-center justify-between text-black font-bold">
//                         <h1>Staff</h1>
//                         <img src="delete.png" className="w-5" />
//                     </div>
//                     <div className="px-4 row2 mt-2 mb-1 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Dashboard</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Floor Plans</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Manage Tables</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Reservations</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Guest List</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="px-4 row3 mb-1 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Reports</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Company Profile</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Branches</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Team</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Manage Roles</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="px-4 row4 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Team</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Integrations</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/4">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Payment and Subscriptions</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="" className="" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="box3 px-4 flex justify-between items-center mx-4 mb-1 bg-gray-100 h-[9%] rounded-lg font-bold text-black">
//                     <h1>Staff</h1>
//                     <img src="delete.png" alt="" className="w-5" />
//                 </div> */}

//             {/* <body className="pt-2  bg-white mx-4 h-[90%] border border-t-0 border-2 border-l border-r border-t border-gray-300 border-solid">
//                 <div className="box1  py-2 mb-2 h-[28.5%] border-2 border-slate-100 mx-4 bg-slate-100 rounded-lg">
//                     <div className="row1 h-[22%] px-4  border-b-[2px] border-gray-300 flex items-center justify-between text-black font-bold">
//                         <h1>Manager</h1>
//                         <img src="delete.png" className="w-5" />
//                     </div>
//                     <div className="px-4 row2 mt-2 mb-1 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Dashboard</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Floor Plans</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Manage Tables</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Reservations</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Guest List</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="px-4 row3 mb-1 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Reports</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Company Profile</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Branches</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Team</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Manage Roles</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="px-4 row4 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Team</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Integrations</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/4">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Payment and Subscriptions</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="" className="" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="box2  py-2 mb-2 h-[28.5%] border-2 border-slate-100 mx-4 bg-gray-100 rounded-lg">
//                     <div className="row1 h-[22%] px-4  border-b-[2px] border-gray-300 flex items-center justify-between text-black font-bold">
//                         <h1>Receptionist</h1>
//                         <img src="delete.png" className="w-5" />
//                     </div>
//                     <div className="px-4 row2 mt-2 mb-1 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Dashboard</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Floor Plans</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Manage Tables</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Reservations</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Guest List</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="px-4 row3 mb-1 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Reports</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Company Profile</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Branches</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Team</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Manage Roles</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="px-4 row4 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Team</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Integrations</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/4">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Payment and Subscriptions</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="" className="" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="box3  py-2 mb-2 h-[28.5%] border-2 border-slate-100 mx-4 bg-gray-100 rounded-lg">
//                     <div className="row1 h-[22%] px-4  border-b-[2px] border-gray-300 flex items-center justify-between text-black font-bold">
//                         <h1>Staff</h1>
//                         <img src="delete.png" className="w-5" />
//                     </div>
//                     <div className="px-4 row2 mt-2 mb-1 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Dashboard</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Floor Plans</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Manage Tables</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Reservations</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Guest List</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="px-4 row3 mb-1 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Reports</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col1 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Company Profile</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Branches</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Team</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col4 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Manage Roles</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                     </div>
//                     <div className="px-4 row4 flex items-center ">
//                         <div className="col1 flex justify-between items-center w-1/6">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Team</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col2 flex justify-between items-center w-1/5">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Integrations</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="|" className="" />
//                         </div>
//                         <div className="col3 flex justify-between items-center w-1/4">
//                             <h1 className="text-base text-gray-600 font-medium text-vlack">Payment and Subscriptions</h1>
//                             <FormControlLabel control={<Switch defaultChecked />} label="" className="" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="box3 px-4 flex justify-between items-center mx-4 mb-1 bg-gray-100 h-[9%] rounded-lg font-bold text-black">
//                     <h1>Staff</h1>
//                     <img src="delete.png" alt="" className="w-5" />
//                 </div>

//             </body> */}
//         </div >
//     );
// };

// export default ManageRole;
