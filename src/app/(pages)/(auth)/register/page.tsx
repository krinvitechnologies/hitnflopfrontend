'use client';

import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RestaurantDetails from '@/app/components/auth/register/restaurantDetails';
import CreateShifts from '@/app/components/auth/register/createShifts';
import AddTeam from '@/app/components/auth/register/addTeam';
import CreateFloorPlan from '@/app/components/auth/register/createFloorPlan';
import ContactInformation from '@/app/components/auth/register/contactInformation';
import { Chip, fabClasses } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import BusinessIcon from '@mui/icons-material/Business';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import DoneIcon from '@mui/icons-material/Done';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Alert from '@/app/components/alert/alert';
import { useRouter } from 'next/navigation';
import Api from '@/app/service/api';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';

const steps = [
    'Restaurant Details',
    'Create Shifts',
    'Add Team',
    'Create Floor Plan',
];

const Register = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [subStep, setSubStep] = useState(0); // Track sub-step for Restaurant Details only

    // Function to move to the next step
    // const handleNext = () => {
    //     if (activeStep === 0 && subStep === 0) {
    //         setSubStep(1); // Move from Restaurant Details to Contact Information
    //     } else {
    //         // Proceed to the next main step
    //         setActiveStep((prevActiveStep) => prevActiveStep s+ 1);
    //         setSubStep(0); // Reset subStep when moving to a new step
    //     }
    // };
    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            // router.push('/create-floor-plan?area');
            router.push('/payment');
        } else if (activeStep === 0 && subStep === 0) {
            setSubStep(1);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSubStep(0);
        }
    };

    // Function to handle back navigation
    const handleBack = () => {
        if (subStep > 0) {
            setSubStep(0); // Go back from Contact Information to Restaurant Details
        } else {
            // Move to the previous main step
            // setActiveStep((prevActiveStep) => prevActiveStep - 1);
            if (activeStep === 1) {
                setActiveStep((prevActiveStep) => prevActiveStep - 1);
                setSubStep(1); // Move from Contact Information to Restaurant Details
            } else {
                // Proceed to the back main step
                setActiveStep((prevActiveStep) => prevActiveStep - 1);
            }
        }
    };

    const handleSkip = () => {
        if (activeStep === steps.length - 1) {
            router.push('/payment');
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    // Define all shift options in an array
    const serviceOptions = [
        { key: 'breakfast', label: 'Breakfast' },
        { key: 'lunch', label: 'Lunch' },
        { key: 'dinner', label: 'Dinner' },
    ];

    const [input, setInput] = useState({
        name: '',
        description: '',
        is_google_listed: false,
        services: [] as string[],
        email: '',
        mobile: '',
        address_1: '',
        address_2: '',
        country: 'uk',
        state: '',
        city: '',
        zipcode: '',
    });
    const [image, setImage] = useState<string | File | null>(null);

    // State for service selections
    const [service, setService] = useState({
        // Food: false,
        // Pub: false,
        // pub: false,
        Breakfast: false,
        Lunch: false,
        Dinner: false,
    });
    // Text styling state
    const [fontWeight, setFontWeight] = useState<'font-normal' | 'font-bold'>('font-normal');
    const [fontStyle, setFontStyle] = useState<'not-italic' | 'italic'>('not-italic');
    const [textAlign, setTextAlign] = useState<'text-left' | 'text-center' | 'text-right'>('text-left');

    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
    const router = useRouter(); // Initialize the router

    const toggleServices = (serviceName: keyof typeof service) => {
        setService((prevService) => {
            const newService = {
                ...prevService,
                [serviceName]: !prevService[serviceName],
            };

            const selectedServices = Object.keys(newService).filter((key) => newService[key as keyof typeof newService]);

            // Update the services in the input state
            setInput((prev) => ({ ...prev, services: selectedServices }));

            return newService;
        });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput((prev) => ({ ...prev, description: e.target.value }));
    };

    // Text styling toggle functions
    const toggleBold = () => setFontWeight((prev) => (prev === 'font-bold' ? 'font-normal' : 'font-bold'));
    const toggleItalic = () => setFontStyle((prev) => (prev === 'italic' ? 'not-italic' : 'italic'));
    const handleTextAlign = (align: 'text-left' | 'text-center' | 'text-right') => setTextAlign(align);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const _onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handlePhoneChange = (value: string) => {
        setInput((prev) => ({ ...prev, mobile: value }));
    };


    // shift options
    const shiftOptions = [
        // { key: 'noshift', label: 'No Shifts' },
        { key: 'breakfast', label: 'Breakfast' },
        { key: 'lunch', label: 'Lunch' },
        { key: 'dinner', label: 'Dinner' },
        // { key: 'brunch', label: 'Brunch' }
    ];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // State for storing the active tab
    const [activeTab, setActiveTab] = useState<string | null>(null);
    // State for storing selected shifts to show after "Done" is clicked
    const [selectedShifts, setSelectedShifts] = useState<string[]>([]);

    // State for shift selections
    const [shifts, setShifts] = useState<Record<string, boolean>>(
        shiftOptions.reduce((acc, shift) => ({ ...acc, [shift.key]: false }), {})
    );

    // State for time inputs (start and end) for each shift and day
    const [shiftTimes, setShiftTimes] = useState<Record<string, Record<string, { startTime: string; endTime: string }>>>(
        shiftOptions.reduce((acc, shift) => {
            acc[shift.key] = days.reduce((dayAcc, day) => {
                dayAcc[day] = { startTime: '', endTime: '' };
                return dayAcc;
            }, {} as Record<string, { startTime: string; endTime: string }>);
            return acc;
        }, {} as Record<string, Record<string, { startTime: string; endTime: string }>>)
    );

    // Toggle function for shifts
    const toggleShift = (shiftName: string) => {
        setShifts((prevShifts) => ({
            ...prevShifts,
            [shiftName]: !prevShifts[shiftName],
        }));
    };

    // Handle input changes for shift times
    const handleShiftTimeChange = (shift: string, day: string, type: 'startTime' | 'endTime', value: string) => {
        setShiftTimes((prevTimes) => ({
            ...prevTimes,
            [shift]: {
                ...prevTimes[shift],
                [day]: {
                    ...prevTimes[shift]?.[day],
                    [type]: value,
                },
            },
        }));
    };

    // Function to handle "Done" click
    const handleDoneClick = () => {
        const selectedShifts = Object.keys(shifts).filter((shift) => shifts[shift]);
        setSelectedShifts(selectedShifts);
        if (selectedShifts.length > 0) {
            setActiveTab(selectedShifts[0]); // Set the first selected shift as active
        }
    };

    // Function to clear all selected shifts
    const handleClearClick = () => {
        setShifts(
            shiftOptions.reduce((acc, shift) => ({ ...acc, [shift.key]: false }), {})
        );
        setSelectedShifts([]);
        setActiveTab(null); // Reset active tab to hide the input fields

        // Reset the shift times for all shifts and days
        setShiftTimes(
            shiftOptions.reduce((acc, shift) => {
                acc[shift.key] = days.reduce((dayAcc, day) => {
                    dayAcc[day] = { startTime: '', endTime: '' };
                    return dayAcc;
                }, {} as Record<string, { startTime: string; endTime: string }>);
                return acc;
            }, {} as Record<string, Record<string, { startTime: string; endTime: string }>>)
        );
    };


    // Inside the component
    // const handleApplyToAll = () => {
    //     // Get the start and end times from the first day of the first selected shift
    //     const firstShiftKey = Object.keys(shifts).find((key) => shifts[key]);
    //     if (!firstShiftKey) return;

    //     const firstDay = days[0];
    //     const { startTime, endTime } = shiftTimes[firstShiftKey][firstDay];

    //     // Apply these times to all shifts and days
    //     const updatedShiftTimes = { ...shiftTimes };
    //     Object.keys(shifts).forEach((shiftKey) => {
    //         if (shifts[shiftKey]) {
    //             days.forEach((day) => {
    //                 updatedShiftTimes[shiftKey][day] = { startTime, endTime };
    //             });
    //         }
    //     });

    //     setShiftTimes(updatedShiftTimes);
    // };

    // const handleApplyToAll = () => {
    //     // Determine the currently active shift
    //     const currentShiftKey = activeTab; // Replace `activeShiftKey` with the state variable that tracks the active shift
    //     if (!currentShiftKey) return;

    //     // Get the start and end times from the first day of the current shift
    //     const firstDay = days[0];
    //     const { startTime, endTime } = shiftTimes[currentShiftKey][firstDay];

    //     // Apply these times to all days for the current shift
    //     const updatedShiftTimes = { ...shiftTimes };
    //     days.forEach((day) => {
    //         updatedShiftTimes[currentShiftKey][day] = { startTime, endTime };
    //     });

    //     setShiftTimes(updatedShiftTimes);
    // };

    // const [applyToAll, setApplyToAll] = useState(false);

    // const handleCheckboxChange = () => {
    //     setApplyToAll(true);
    //     handleApplyToAll();
    //     setTimeout(() => setApplyToAll(false), 0); // Reset the checkbox after the action
    // };



    // const [applyToAllState, setApplyToAllState] = useState<Record<string, boolean>>({});

    // const handleApplyToAll = () => {
    //     if (!activeTab) return;

    //     const firstDay = days[0];
    //     const { startTime, endTime } = shiftTimes[activeTab]?.[firstDay] || {};

    //     if (!startTime || !endTime) return;

    //     const updatedShiftTimes = { ...shiftTimes };
    //     days.forEach((day) => {
    //         updatedShiftTimes[activeTab][day] = { startTime, endTime };
    //     });

    //     setShiftTimes(updatedShiftTimes);

    //     setApplyToAllState((prevState) => ({
    //         ...prevState,
    //         [activeTab]: true,
    //     }));
    // };

    // const handleCheckboxChange = (shiftKey: string) => {
    //     if (applyToAllState[shiftKey]) {
    //         setApplyToAllState((prevState) => ({
    //             ...prevState,
    //             [shiftKey]: false,
    //         }));
    //     } else {
    //         handleApplyToAll();
    //     }
    // };


    const [applyToAllState, setApplyToAllState] = useState<Record<string, boolean>>({});


    const handleApplyToAll = () => {
        if (!activeTab) return;

        const firstDay = days[0];
        const { startTime, endTime } = shiftTimes[activeTab]?.[firstDay] || {};

        if (!startTime || !endTime) return;

        const updatedShiftTimes = { ...shiftTimes };
        days.forEach((day) => {
            updatedShiftTimes[activeTab][day] = { startTime, endTime };
        });

        setShiftTimes(updatedShiftTimes);

        setApplyToAllState((prevState) => ({
            ...prevState,
            [activeTab]: true,
        }));
    };

    const handleRemoveApplyToAll = () => {
        if (!activeTab) return;

        const updatedShiftTimes = { ...shiftTimes };
        days.forEach((day) => {
            // Reset the start and end times for all days except the first day
            if (day !== days[0]) {
                updatedShiftTimes[activeTab][day] = { startTime: "", endTime: "" };
            }
        });

        setShiftTimes(updatedShiftTimes);

        setApplyToAllState((prevState) => ({
            ...prevState,
            [activeTab]: false,
        }));
    };

    const handleCheckboxChange = (shiftKey: string) => {
        if (applyToAllState[shiftKey]) {
            // If checkbox is unchecked, remove applied times
            handleRemoveApplyToAll();
        } else {
            // If checkbox is checked, apply times to all days
            handleApplyToAll();
        }
    };


    const _onRestaurantDetails = async () => {
        try {
            if (!input.name || !input.description || !input.services.length) {
                setSnackbarMessage('Please fill in all required fields.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return;
            }

            if (!image) {
                setSnackbarMessage('Please upload a logo or an image');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return;
            }

            if (input.description.length <= 25) {
                setSnackbarMessage('Description must be more than 25 characters');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return;
            }

            // Check if image exists and its type is valid
            // if (image) {
            //     // Ensure that image is a File object
            //     if (image instanceof File) {
            //         const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

            //         // If the image type is not valid, show an error and return
            //         if (!validImageTypes.includes(image.type)) {
            //             setSnackbarMessage('Please upload a valid image (JPEG, PNG, or WebP, SVG).');
            //             setSnackbarSeverity('error');
            //             setOpenSnackbar(true);
            //             setLoading(false);
            //             return;
            //         }
            //     } else {
            //         // If image is not a File, show an error
            //         setSnackbarMessage('Invalid image format.');
            //         setSnackbarSeverity('error');
            //         setOpenSnackbar(true);
            //         setLoading(false);
            //         return;
            //     }
            // }

            if (image) {
                // Allow valid image URLs
                if (typeof image === "string") {
                    const isValidUrl = image.startsWith("http") || image.startsWith("https");
                    if (!isValidUrl) {
                        setSnackbarMessage("Invalid image format.");
                        setSnackbarSeverity("error");
                        setOpenSnackbar(true);
                        setLoading(false);
                        return;
                    }
                }
                // Ensure that image is a File object
                else if (image instanceof File) {
                    const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

                    // If the image type is not valid, show an error and return
                    if (!validImageTypes.includes(image.type)) {
                        setSnackbarMessage("Please upload a valid image (JPEG, PNG, WebP, or SVG).");
                        setSnackbarSeverity("error");
                        setOpenSnackbar(true);
                        setLoading(false);
                        return;
                    }
                }
                // If image is neither a URL nor a File, show an error
                else {
                    setSnackbarMessage("Invalid image format.");
                    setSnackbarSeverity("error");
                    setOpenSnackbar(true);
                    setLoading(false);
                    return;
                }
            }


            handleNext();
        } catch (error) {
            setError(`${error}` || 'Failed to register Restaurant. Please try again later.');
            setSnackbarMessage('Failed to register Restaurant. Please try again later.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const [restaurantDetail, setRestaurantDetail] = useState<any>(null);  // State to store profile details

    const _onRegister = async () => {
        setLoading(true);
        setError(null);

        try {
            // Frontend validation: Check if the name field is empty
            if (!input.email || !input.mobile || !input.address_1 || !input.country || !input.city || !input.state || !input.zipcode) {
                // Show snackbar error if the name is not filled in
                setSnackbarMessage('Please fill in all required fields.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.email)) {
                setSnackbarMessage('Enter a valid email address.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return;
            }

            // Validate mobile number length (must be at least 8 characters)
            if (input.mobile.length < 8) {
                setSnackbarMessage('Enter a valid mobile number');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return;
            }

            // Validate postal code length (must be at least 4 characters)
            // if (input.zipcode.length < 4) {
            //     setSnackbarMessage('Enter a valid postal code');
            //     setSnackbarSeverity('error');
            //     setOpenSnackbar(true);
            //     return;
            // }
            if (!/^\d{4,}$/.test(input.zipcode)) {
                setSnackbarMessage('Enter a valid postal code');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return;
            }


            // Prepare the data to send to the backend
            const requestData = {
                name: input.name,
                description: input.description,
                is_google_listed: input.is_google_listed ? '1' : '0',
                services: input.services.join(','),
                image: image,
                email: input.email,
                mobile: input.mobile,
                address_1: input.address_1,
                address_2: input.address_2,
                country: input?.country || 'uk',
                city: input.city,
                state: input.state,
                zipcode: input.zipcode,
            };

            // const response = await Api.createRestaurant(requestData);

            // if (response) {
            //     setSnackbarMessage(response?.message || 'Restaurant registered successfully');
            //     setSnackbarSeverity('success');
            //     setOpenSnackbar(true);
            //     handleNext();
            // } else {
            //     // throw new Error(response?.message || 'Failed to register Restaurant.');
            //     setSnackbarMessage(response?.message || 'Failed to register Restaurant.');
            //     setSnackbarSeverity('error');
            //     setOpenSnackbar(true);
            // }
            handleNext();
        } catch (error) {
            setLoading(false);
            setError(`${error}` || 'Failed to register Restaurant. Please try again later.');
            setSnackbarMessage(`${error}` || 'Failed to register Restaurant. Please try again later.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const _onCreateShift = async () => {
        setLoading(true);
        setError(null);
        try {
            // Frontend validation: Check if the name field is empty
            if (!input.email || !input.mobile || !input.address_1 || !input.country || !input.city || !input.state || !input.zipcode) {
                // Show snackbar error if the name is not filled in
                setSnackbarMessage('Please fill in all required fields.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return;
            }

            // const shiftData = Object.entries(shiftTimes).reduce((acc, [shift, daysData]) => {
            //     if (shifts[shift]) {
            //         acc[shift] = Object.entries(daysData).reduce((dayAcc, [day, times]) => {
            //             if (times.startTime && times.endTime) {
            //                 dayAcc[day.toLowerCase()] = `${times.startTime}-${times.endTime}`;
            //             }
            //             return dayAcc;
            //         }, {} as Record<string, string>);
            //     }
            //     return acc;
            // }, {} as Record<string, Record<string, string>>);


            const shiftData = Object.entries(shiftTimes).reduce((acc, [shift, daysData]) => {
                if (shifts[shift]) { // Check if the shift is selected
                    acc[shift] = Object.entries(daysData).reduce((dayAcc, [day, times]) => {
                        if (typeof times.startTime === "string" && typeof times.endTime === "string" && times.startTime && times.endTime) {
                            // Format the time as "startTime-endTime"
                            dayAcc[day.toLowerCase()] = `${times.startTime}-${times.endTime}`;
                        }
                        return dayAcc;
                    }, {} as Record<string, string>);
                }
                return acc;
            }, {} as Record<string, Record<string, string>>);

            // Validation: Ensure at least one shift is created
            if (Object.keys(shiftData).length === 0) {
                setSnackbarMessage('Please create at least one shift with valid times.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return; // Stop execution if no shift is created
            }

            // Convert `shiftData` to JSON
            const jsonShiftData = JSON.stringify(shiftData);

            let imageToSend = image;
            if (typeof image === 'string' && image.startsWith('http')) {
                // Extract the filename from the URL
                const urlParts = image.split('/');
                imageToSend = urlParts[urlParts.length - 1]; // Filename
            }

            // Prepare the data to send to the backend
            const requestData = {
                name: input.name.trim().toLowerCase(),
                description: input.description.trim(),
                is_google_listed: input.is_google_listed ? '1' : '0',
                services: input.services.join(','),
                // image: image,
                image: imageToSend,
                email: input.email.trim().toLowerCase(),
                mobile: input.mobile,
                address_1: input.address_1,
                address_2: input.address_2,
                country: input?.country || 'uk',
                city: input.city,
                state: input.state,
                zipcode: input.zipcode,
                shifts: jsonShiftData
                // shifts: shiftData
            };
            // console.log('requestData', requestData);

            // ✅ Store the restaurant data in `sessionStorage`
            //  sessionStorage.setItem('restaurantImage', JSON.stringify(requestData.image));

            const response = await Api.createRestaurant(requestData);
            // console.log('response', response);
            // console.log('response error', `${response.error}`);
            if (response?.id) {
                // Save the restaurant ID from the response
                localStorage.setItem('restaurantId', response.id);
                localStorage.setItem('restaurant_id', response.id);
                setRestaurantDetail(response);

                // // ✅ Store the restaurant data in `sessionStorage`
                sessionStorage.setItem('restaurantData', JSON.stringify(response));

                setSnackbarMessage(response?.message || 'Restaurant created successfully');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                handleNext();
            } else {
                // console.log('response error else', `${response?.error}`);
                // throw new Error(response?.message || 'Failed to register Restaurant.');
                setSnackbarMessage(response.error || `${response?.error}` || 'Failed to register Restaurant.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        } catch (error: any) {
            // console.log('error 1', error?.response?.data);
            // console.log('error 2', `${error?.response?.data}`);
            // console.log('error 3', error?.data);
            // console.log('error 4', `${error?.data}`);
            // console.log('error 6', `${error}`);
            // console.log('error 7', error?.response);
            // console.log('error 5', error);
            setLoading(false);
            // setError(`${error}` || 'Failed to register Restaurant. Please try again later.');
            let errorMessage = 'Failed to register Restaurant. Please try again later.';

            // Extract detailed error messages
            // if (error && typeof error === 'object') {
            //     const errorMessages: string[] = [];

            //     Object.keys(error).forEach((key) => {
            //         if (Array.isArray(error[key])) {
            //             // Extract the "message" field from each error
            //             error[key].forEach((err: any) => {
            //                 if (err?.message) {
            //                     errorMessages.push(`${key}: ${err.message}`);
            //                 }
            //             });
            //         }
            //     });

            //     if (errorMessages.length > 0) {
            //         errorMessage = errorMessages.join('\n'); // Combine messages
            //     }
            // } else if (typeof error === 'string') {
            //     errorMessage = error;
            // }

            // Extract only the first error message
            // if (error && typeof error === 'object') {
            //     for (const key of Object.keys(error)) {
            //         if (Array.isArray(error[key]) && error[key].length > 0) {
            //             const firstError = error[key][0]?.message || 'Invalid input';
            //             errorMessage = `${key}: ${firstError}`;
            //             break; // Exit after the first error
            //         }
            //     }
            // } else if (typeof error === 'string') {
            //     errorMessage = error;
            // }

            // Helper function to recursively extract the first error message
            const extractFirstError = (error: any, parentKey = ''): string | null => {
                if (typeof error === 'object' && error !== null) {
                    for (const key of Object.keys(error)) {
                        const currentKey = parentKey ? `${parentKey}.${key}` : key;

                        // Check if the value is an array with an error message
                        if (Array.isArray(error[key]) && error[key].length > 0) {
                            const firstError = error[key][0]?.message || 'Invalid input';
                            return `${currentKey}: ${firstError}`; // Return the first error with its full path
                        }

                        // If the value is a nested object, recursively call the function
                        if (typeof error[key] === 'object') {
                            const nestedError = extractFirstError(error[key], currentKey);
                            if (nestedError) return nestedError; // Return the first nested error
                        }
                    }
                } else if (Array.isArray(error) && error.length > 0) {
                    // Handle if error is a simple array of error messages
                    return error[0]?.message || 'Failed to register Restaurant.';
                } else if (typeof error === 'string') {
                    // Handle if error is already a string
                    return error;
                }
                return null;
            };

            if (error) {
                if (typeof error === 'object') {
                    const extractedError = extractFirstError(error);
                    if (extractedError) errorMessage = extractedError;
                } else if (Array.isArray(error) && error.length > 0) {
                    // Handle direct array errors
                    errorMessage = error[0]?.message || 'Failed to register Restaurant.';
                } else if (typeof error === 'string') {
                    // Handle string errors
                    errorMessage = error;
                } else {
                    // Fallback for unknown error types
                    errorMessage = 'Failed to register Restaurant.';
                }
            }
            setSnackbarMessage(errorMessage);
            // setSnackbarMessage(`${error}` || 'Failed to register Restaurant. Please try again later.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };


    // const _onCreateShift = async () => {
    //     setLoading(true);
    //     setError(null);

    //     try {
    //               // Get token from cookies (using document.cookie)
    //     const getTokenFromCookies = (cookieName: string) => {
    //         const name = cookieName + "=";
    //         const decodedCookie = decodeURIComponent(document.cookie);
    //         const ca = decodedCookie.split(';');
    //         for (let i = 0; i < ca.length; i++) {
    //             let c = ca[i];
    //             while (c.charAt(0) === ' ') {
    //                 c = c.substring(1);
    //             }
    //             if (c.indexOf(name) === 0) {
    //                 return c.substring(name.length, c.length);
    //             }
    //         }
    //         return "";
    //     };

    //     const token = getTokenFromCookies('th_token');

    //         // Prepare the `shiftData`
    //         const shiftData = Object.entries(shiftTimes).reduce((acc, [shift, daysData]) => {
    //             if (shifts[shift]) { // Check if the shift is selected
    //                 acc[shift] = Object.entries(daysData).reduce((dayAcc, [day, times]) => {
    //                     if (typeof times.startTime === "string" && typeof times.endTime === "string" && times.startTime && times.endTime) {
    //                         // Format the time as "startTime-endTime"
    //                         dayAcc[day.toLowerCase()] = `${times.startTime}-${times.endTime}`;
    //                     }
    //                     return dayAcc;
    //                 }, {} as Record<string, string>);
    //             }
    //             return acc;
    //         }, {} as Record<string, Record<string, string>>);

    //         const jsonShiftData = JSON.stringify(shiftData);

    //         // Prepare the request data
    //         const requestData = {
    //             name: input.name,
    //             description: input.description,
    //             is_google_listed: input.is_google_listed ? '1' : '0',
    //             services: input.services.join(','),
    //             image: image,
    //             email: input.email,
    //             mobile: input.mobile,
    //             address_1: input.address_1,
    //             address_2: input.address_2,
    //             country: input.country,
    //             city: input.city,
    //             state: input.state,
    //             zipcode: input.zipcode,
    //             shifts: jsonShiftData
    //         };

    //         console.log('requestData', requestData);

    //         // Make the direct API call using fetch
    //         const response = await fetch('https://api.tablehost.co.uk/api/restaurant/create', {
    //             method: 'POST',
    //             headers: {
    //                 // 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify(requestData)
    //         });

    //         const responseData = await response.json(); // Parse the JSON response
    //         console.log('API Response:', responseData);

    //         if (responseData?.id) {
    //             // Save the restaurant ID from the response
    //             localStorage.setItem('restaurantId', responseData.id);
    //             localStorage.setItem('restaurant_id', responseData.id);
    //             setRestaurantDetail(responseData);
    //             setSnackbarMessage(responseData?.message || 'Restaurant created successfully');
    //             setSnackbarSeverity('success');
    //             setOpenSnackbar(true);
    //             handleNext();
    //         } else {
    //             // Handle API errors
    //             const errorMessage = responseData?.error || 'Failed to register Restaurant.';
    //             setSnackbarMessage(errorMessage);
    //             setSnackbarSeverity('error');
    //             setOpenSnackbar(true);
    //         }
    //     } catch (error: any) {
    //         console.error('Error:', error);

    //         // Handle unexpected errors
    //         const errorMessage = error.message || 'Failed to register Restaurant. Please try again later.';
    //         setSnackbarMessage(errorMessage);
    //         setSnackbarSeverity('error');
    //         setOpenSnackbar(true);
    //     } finally {
    //         setLoading(false);
    //     }
    // };





    // useEffect(() => {
    //     const savedRestaurant = sessionStorage.getItem('restaurantData');
    //     if (savedRestaurant) {
    //         const restaurantData = JSON.parse(savedRestaurant);
    //         setInput({
    //             name: restaurantData.name || '',
    //             description: restaurantData.description || '',
    //             email: restaurantData.email || '',
    //             mobile: restaurantData.mobile || '',
    //             address_1: restaurantData.address.address_1 || '',
    //             address_2: restaurantData.address.address_2 || '',
    //             country: restaurantData.country || 'uk',
    //             city: restaurantData.address.city || '',
    //             state: restaurantData.address.state || '',
    //             zipcode: restaurantData.address.zipcode || '',
    //             // address_1: restaurantData.address_1 || '',
    //             // address_2: restaurantData.address_2 || '',
    //             // city: restaurantData.city || '',
    //             // state: restaurantData.state || '',
    //             // zipcode: restaurantData.zipcode || '',
    //             is_google_listed: restaurantData.is_google_listed === '1',
    //             services: Array.isArray(restaurantData.services) ? restaurantData.services : [], // Fix here
    //             // services: restaurantData.services ? restaurantData.services.split(',') : [],
    //             // image: restaurantData?.image || ''
    //         });

    //         if (restaurantData.shifts) {
    //             setShifts(restaurantData.shifts);
    //         }
    //     }
    // }, []);

    useEffect(() => {
        const savedRestaurant = sessionStorage.getItem('restaurantData');
        if (savedRestaurant) {
            const restaurantData = JSON.parse(savedRestaurant);

            // ✅ Check if restaurant ID exists and navigate to step 4
            if (restaurantData.id) {
                setActiveStep(3); // Replace with your actual step 4 route
            }

            setInput({
                name: restaurantData?.name || '',
                description: restaurantData?.description || '',
                email: restaurantData?.email || '',
                mobile: restaurantData?.mobile || '',
                address_1: restaurantData?.address?.address_1 || '',
                address_2: restaurantData?.address?.address_2 || '',
                country: restaurantData?.country || 'uk',
                city: restaurantData?.address?.city || '',
                state: restaurantData?.address?.state || '',
                zipcode: restaurantData?.address?.zipcode || '',
                // is_google_listed: restaurantData.is_google_listed === '1',
                is_google_listed: restaurantData?.is_google_listed === true,
                // services: Array.isArray(restaurantData.services) ? restaurantData.services : [], // Fix here
                services: restaurantData?.services || [],
                // services: restaurantData.services ? restaurantData.services.split(',') : [],
                // image: restaurantData?.image || ''
            });
            setImage(`https://d1f1d9ui7un52o.cloudfront.net/restaurant-profiles/${restaurantData?.image}` || null);

            // Update services
            // if (restaurantData?.services && Array.isArray(restaurantData.services)) {
            //     const updatedServices = serviceOptions.reduce((acc, service) => {
            //         acc[service.key as keyof typeof service] = restaurantData.services.includes(service.key);
            //         return acc;
            //     }, {} as typeof service);

            //     setService(updatedServices);
            // }

            if (restaurantData?.services && Array.isArray(restaurantData?.services)) {
                const updatedServices = serviceOptions.reduce((acc, serviceItem) => {
                    return {
                        ...acc,
                        [serviceItem.key]: restaurantData?.services.includes(serviceItem.key),
                    };
                }, {} as Partial<typeof service>); // ✅ Type Assertion

                setService((prev) => ({
                    ...prev,
                    ...updatedServices,
                })); // ✅ Merge previous state with updatedServices
            }

            setShifts(restaurantData?.shifts || [])
            setSelectedShifts(restaurantData?.shifts || [])

            // setActiveTab(profileData?.shifts || [])
            // Process shifts into the state structure
            const parsedShifts = Object.keys(restaurantData?.shifts).reduce((acc, shiftKey) => {
                acc[shiftKey] = Object.entries(restaurantData?.shifts[shiftKey]).reduce(
                    (dayAcc, [day, time]) => {
                        if (typeof time !== "string") {
                            throw new Error("Unexpected time format");
                        }
                        const [startTime, endTime] = time.split("-");
                        dayAcc[day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()] = {
                            startTime,
                            endTime,
                        }; // Capitalize day
                        return dayAcc;
                    },
                    {} as Record<string, { startTime: string; endTime: string }>
                );
                return acc;
            }, {} as Record<string, Record<string, { startTime: string; endTime: string }>>);

            setShiftTimes(parsedShifts);
            setActiveTab(Object.keys(parsedShifts)[0] || null);
            // handleDoneClick();
            // if (restaurantData.shifts) {
            //     setShifts(restaurantData.shifts);
            // }
        }
    }, []);



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // console.log('handle submit call');

        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const shiftData = Object.entries(shiftTimes).reduce((acc, [shift, daysData]) => {
                if (shifts[shift]) { // Check if the shift is selected
                    acc[shift] = Object.entries(daysData).reduce((dayAcc, [day, times]) => {
                        if (typeof times.startTime === "string" && typeof times.endTime === "string" && times.startTime && times.endTime) {
                            // Format the time as "startTime-endTime"
                            dayAcc[day.toLowerCase()] = `${times.startTime}-${times.endTime}`;
                        }
                        return dayAcc;
                    }, {} as Record<string, string>);
                }
                return acc;
            }, {} as Record<string, Record<string, string>>);

            // Convert `shiftData` to JSON
            const jsonShiftData = JSON.stringify(shiftData);

            // Prepare the data to send to the backend
            const requestData = {
                name: input.name,
                description: input.description,
                is_google_listed: input.is_google_listed ? '1' : '0',
                services: input.services.join(','),
                image: image,
                email: input.email,
                mobile: input.mobile,
                address_1: input.address_1,
                address_2: input.address_2,
                country: input.country,
                city: input.city,
                state: input.state,
                zipcode: input.zipcode,
                shifts: jsonShiftData
                // shifts: shiftData
            };
            // console.log('requestData', requestData);

            const response = await Api.createRestaurant(requestData);
            // console.log('response', response);
            // console.log('error', `${response.error}`);
            if (response) {
                // Save the restaurant ID from the response
                localStorage.setItem('restaurantId', response.id);
                localStorage.setItem('restaurant_id', response.id);
                setRestaurantDetail(response);
                setSnackbarMessage(response?.message || 'Restaurant created successfully');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                handleNext();
            } else {
                // throw new Error(response?.message || 'Failed to register Restaurant.');
                setSnackbarMessage(response?.message || 'Failed to register Restaurant.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        } catch (error: any) {
            console.log('error', error?.response?.data);
            console.log('error', `${error?.response?.data}`);
            console.log('error', error?.data);
            console.log('error', `${error?.data}`);
            console.log('error', error);
            console.log('error', `${error}`);
            console.log('error', error.response);

            const errorMessage = typeof error === 'string' ? error : error.message || 'Failed to register Restaurant.';
            console.log('error', errorMessage);
            setLoading(false);
            setError(`${error}` || 'Failed to register Restaurant. Please try again later.');
            // const errorMessage = `${error}` || error || `${error?.name?.message}` || error?.name?.message || 'Profile update failed. Please try again.'; // Get error message properly
            // setError(errorMessage);
            // setSnackbarMessage(errorMessage);

            setSnackbarMessage(`${error}` || 'Failed to register Restaurant. Please try again later.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } finally {
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

    // add team member form
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        role: '',
        permissions: true,
    });

    const handleFormChange = (updatedData: any) => {
        setFormData((prevData) => ({
            ...prevData,
            ...updatedData,
        }));
    };

    const _onAddTeam = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!formData.name || !formData.email || !formData.phone || !formData.role) {
                setSnackbarMessage('Please fill in all required fields.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                return;
            }

            // Retrieve the restaurantId from localStorage
            // const id = localStorage.getItem('restaurantId');
            // const id = localStorage.getItem('restaurantId') || 'default-id'; // or any default id you want to use
            const id = localStorage.getItem('restaurant_id') || 'id'; // or any default id you want to use

            // Prepare the data to send to the backend
            const addTeamMemberData = {
                name: formData.name.trim().toLowerCase(),
                email: formData.email.trim().toLowerCase(),
                mobile: formData.phone,
                role: formData.role.trim().toLowerCase(),
                permissions: formData.permissions,
                restaurant_id: id
            };

            const response = await Api.addMember(id, addTeamMemberData);

            if (response) {
                // ✅ Store the restaurant member data in `sessionStorage`
                sessionStorage.setItem('memberData', JSON.stringify(response));

                // const existingData = JSON.parse(sessionStorage.getItem("restaurantData") || "{}");
                // existingData.memberData = response;
                // sessionStorage.setItem("restaurantData", JSON.stringify(existingData));

                setSnackbarMessage(response?.message || 'Add members successfully');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                handleNext();
            }
            // else {
            //     // throw new Error(response?.message || 'Failed to add members');
            //     setSnackbarMessage(response?.message || 'Failed to add members');
            //     setSnackbarSeverity('error');
            //     setOpenSnackbar(true);
            // }
            // handleNext();
        } catch (error) {
            setLoading(false);
            // setError(`${error}` || 'Failed to add members. Please try again later.');
            // setSnackbarMessage(`${error}` || 'Failed to add members. Please try again later.');

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
        } finally {
            setLoading(false);
        }
    };

    // ✅ Retrieve saved member data from sessionStorage on component mount
    useEffect(() => {
        const savedMember = sessionStorage.getItem('memberData');

        if (savedMember) {
            const memberData = JSON.parse(savedMember);

            setFormData({
                name: memberData?.name || '',
                email: memberData?.email || '',
                phone: memberData?.mobile || '',
                role: memberData?.role || '',
                permissions: memberData?.permissions || [],
            });
        }
    }, []);

    // Function to render the content based on the current step
    const renderStepContent = (step: number, subStep: number) => {
        if (step === 0) {
            return subStep === 0 ? (
                <div className='w-full max-w-lg'>

                    <div className="w-full">
                        <h1 className='mb-4 flex text-3xl max-md:text-2xl text-[#1F2122] font-semibold font-roboto text-center'>Lets set up your Restaurant</h1>
                        <form className="bg-[#FFFFFF] rounded-xl p-3 box-border">
                            <div className='flex justify-between items-center w-full gap-4 max-md:flex-col-reverse'>
                                <div className='flex flex-col gap-2 w-[100%] max-w-lg'>
                                    <label htmlFor="" className='flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
                                        <span className="required">Name</span>
                                        <input type="text" placeholder='Restaurant name' name="name" value={input.name} onChange={_onChange} className='px-3 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
                                    </label>
                                    <label htmlFor="" className='flex items-center text-base text-[#3C3C4399] font-normal font-roboto gap-2'>
                                        <input
                                            type="checkbox"
                                            name="is_google_listed"
                                            checked={input.is_google_listed}
                                            onChange={() => setInput((prev) => ({ ...prev, is_google_listed: !prev.is_google_listed }))}
                                            className='px-3 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
                                        My venue is not on google
                                    </label>
                                    <label className='flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
                                        <span className="required">Services</span>
                                    </label>
                                    <div className="mb-2 flex flex-wrap gap-4">
                                        {serviceOptions.map((option) => (
                                            <Chip
                                                key={option.key}
                                                label={service[option.key as keyof typeof service] ? `${option.label}` : option.label}
                                                icon={service[option.key as keyof typeof service] ? (
                                                    <DoneIcon sx={{ color: '#0265DC !important' }} />
                                                ) : (
                                                    <AddIcon sx={{ color: '#1F2122 !important' }} />
                                                )}
                                                onClick={() => toggleServices(option.key as keyof typeof service)}
                                                sx={{
                                                    backgroundColor: service[option.key as keyof typeof service] ? '#0035711F' : '#FFFFFF',
                                                    color: service[option.key as keyof typeof service] ? '#0265DC' : '#414346',
                                                    border: service[option.key as keyof typeof service] ? 'none' : '1px solid #AAADB1',
                                                    fontSize: 16,
                                                    fontFamily: 'var(--font-inter)',
                                                    fontWeight: 600
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="relative w-28 h-28 flex items-center justify-center bg-[#E1E3E6] rounded-full">
                                    <div className="w-28 h-28 flex items-center justify-center bg-[#E1E3E6] rounded-full overflow-hidden">
                                        {image ? (
                                            <img src={image instanceof File ? URL.createObjectURL(image) : image} alt="Profile" className='object-cover rounded-lg border-[1px] border-[#AAADB1] w-32 h-32' />
                                        ) : (
                                            <div className="flex items-center justify-center w-10 h-10 bg-[#E1E3E6] rounded-lg">
                                                <BusinessIcon sx={{ fontSize: '2rem' }} />
                                            </div>
                                        )}
                                    </div>

                                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#F6F7F8] text-[#1F2122] rounded-full p-1 box-border cursor-pointer">
                                        <EditIcon />
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="w-full max-w-lg mt-2">
                                <label htmlFor="" className='flex flex-col gap-1 text-base text-[#1F2122] font-semibold font-inter'>
                                    <span className="required">About Restaurant</span>
                                    <div className="border-[1px] border-[#AAADB1] rounded-lg overflow-hidden">
                                        <textarea
                                            id="about-restaurant"
                                            className={`px-3 py-2 box-border text-base text-[#414346] font-inter outline-none w-full h-40 ${fontWeight} ${fontStyle} ${textAlign} resize-none`}
                                            onChange={handleTextChange}
                                            value={input.description}
                                            placeholder="Write about your restaurant"
                                        />
                                        <div className="bg-[#F6F7F8] flex gap-5 border-t-[1px] border-[#AAADB1] px-3 py-2 box-border">
                                            <button
                                                onClick={toggleBold}
                                                className={`${fontWeight === 'font-bold' ? '' : ''}`}
                                            >
                                                <FormatBoldIcon sx={{ color: '#66696D', fontSize: '1.2rem' }} />
                                            </button>
                                            <button
                                                onClick={toggleItalic}
                                                className={`${fontStyle === 'italic' ? '' : ''}`}
                                            >
                                                <FormatItalicIcon sx={{ color: '#66696D', fontSize: '1.2rem' }} />
                                            </button>
                                            <button
                                                onClick={() => handleTextAlign('text-left')}
                                                className={`${textAlign === 'text-left' ? '' : ''}`}
                                            >
                                                <FormatAlignLeftIcon sx={{ color: '#66696D', fontSize: '1.2rem' }} />
                                            </button>
                                            <button
                                                onClick={() => handleTextAlign('text-center')}
                                                className={`${textAlign === 'text-center' ? '' : ''}`}
                                            >
                                                <FormatAlignJustifyIcon sx={{ color: '#66696D', fontSize: '1.2rem' }} />
                                            </button>
                                            <button
                                                onClick={() => handleTextAlign('text-right')}
                                                className={`${textAlign === 'text-right' ? '' : ''}`}
                                            >
                                                <FormatAlignRightIcon sx={{ color: '#66696D', fontSize: '1.2rem' }} />
                                            </button>
                                        </div>
                                    </div>
                                </label>
                            </div>

                        </form>
                    </div>

                </div>
            ) : (
                <div className='w-full max-w-lg'>
                    <form className="w-full" >
                        <h1 className='mb-4 flex text-3xl max-md:text-2xl text-[#1F2122] font-semibold font-roboto text-start'>
                            Lets set up your Restaurant
                        </h1>
                        <section className='bg-[#FFFFFF] rounded-xl p-3 box-border flex flex-col justify-between items-center w-full gap-3 '>
                            <fieldset className='bg-[#FFFFFF] flex flex-col justify-between items-center w-full '>
                                <legend className='flex text-xl max-md:text-lg text-[#1F2122] font-normal font-inter text-start w-full'>Contact Information</legend>
                                <div className='flex max-md:flex-col gap-2 w-[100%] max-w-lg'>
                                    <label htmlFor="" className='flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
                                        <span className="required">Email</span>
                                        <input
                                            type="email"
                                            placeholder='Enter email'
                                            name="email"
                                            value={input.email}
                                            onChange={_onChange}
                                            className='px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none'
                                            required
                                        />
                                    </label>
                                    <label htmlFor="" className='max-w-lg flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
                                        <span className="required">Landline/Phone</span>
                                        <PhoneInput
                                            country="gb" // Set default country to United Kingdom
                                            countryCodeEditable={false} // Prevent changing the country code manually
                                            // value={phone}
                                            value={input.mobile}
                                            onChange={handlePhoneChange}
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
                                </div>
                            </fieldset>

                            <fieldset className='bg-[#FFFFFF] flex flex-col justify-between items-center w-full '>
                                <legend className='flex text-xl max-md:text-lg text-[#1F2122] font-normal font-inter text-start w-full'>Address</legend>
                                <div className='flex flex-col gap-2 w-[100%] max-w-lg'>
                                    <label htmlFor="" className='flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
                                        <span className="required">Address Line 1 </span>
                                        <input type="text" placeholder='Enter address'
                                            name="address_1"
                                            value={input.address_1}
                                            onChange={_onChange}
                                            className='px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
                                    </label>
                                    <label htmlFor="" className='flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
                                        Address Line 2
                                        <input type="text" placeholder='Enter address'
                                            name="address_2"
                                            value={input.address_2}
                                            onChange={_onChange}
                                            className='px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
                                    </label>
                                    <div className='flex items-center w-full gap-2 max-md:flex-col'>
                                        {/* <label htmlFor="country" className='w-full flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
                                            Country
                                            <input type="text" placeholder='Enter'
                                                name="country"
                                                value={input.country}
                                                onChange={_onChange}
                                                className='w-full px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
                                        </label> */}
                                        <label htmlFor="state" className='w-full flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
                                            <span className="required">County</span>
                                            <input type="text" placeholder='Enter county'
                                                name="state"
                                                value={input.state}
                                                onChange={_onChange}
                                                className='w-full px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
                                        </label>
                                    </div>
                                    <div className='flex items-center w-full gap-2 max-md:flex-col'>
                                        <label htmlFor="" className='w-full flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
                                            <span className="required">City</span>
                                            <input type="text" placeholder='Enter city'
                                                name="city"
                                                value={input.city}
                                                onChange={_onChange}
                                                className='w-full px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
                                        </label>
                                        <label htmlFor="" className='w-full flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
                                            <span className="required">Post Code</span>
                                            <input type="text" placeholder='Enter post code'
                                                name="zipcode"
                                                value={input.zipcode}
                                                onChange={_onChange}
                                                className='w-full px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                            {/* <button type="submit" className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button> */}
                        </section>

                    </form>
                </div>
            );
        }
        switch (step) {
            case 1:
                return <div className='w-full max-w-lg'>
                    <>
                        <h1 className='mb-4 flex text-3xl max-md:text-2xl text-[#1F2122] font-semibold font-roboto text-start'>Create Shifts</h1>
                        <form className="bg-[#FFFFFF] p-3 box-border border border-[#E1E3E6] rounded-lg flex flex-col gap-2">
                            <h3 className='text-xl font-bold text-[#1F2122] font-inter'>Service Hour</h3>
                            <h4 className='text-center text-[#414346] text-base font-normal font-roboto'>Add Shifts or Select no of shifts add service hour</h4>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="" className='flex flex-col text-base text-[#1F2122] font-semibold font-Inter gap-1'>
                                    <span className="required">Shift Times</span>
                                    <div className="mb-2 flex flex-wrap gap-4">
                                        {shiftOptions.map((shift) => (
                                            <Chip
                                                key={shift.key}
                                                label={shifts[shift.key as keyof typeof shifts] ? `${shift.label}` : shift.label}
                                                // icon={
                                                //     shifts[shift.key as keyof typeof shifts] ? (
                                                //         <DoneIcon sx={{ color: '#0265DC' }} />
                                                //     ) : (
                                                //         <AddIcon sx={{ color: '#1F2122' }}/>
                                                //     )
                                                // }
                                                icon={shifts[shift.key as keyof typeof shifts] ? (
                                                    <DoneIcon sx={{ color: '#0265DC !important' }} />
                                                ) : (
                                                    <AddIcon sx={{ color: '#1F2122 !important' }} />
                                                )}
                                                onClick={() => toggleShift(shift.key as keyof typeof shifts)}
                                                sx={{
                                                    backgroundColor: shifts[shift.key as keyof typeof shifts] ? '#0035711F' : '#FFFFFF',
                                                    color: shifts[shift.key as keyof typeof shifts] ? '#0265DC' : '#414346',
                                                    border: shifts[shift.key as keyof typeof shifts] ? 'none' : '1px solid #AAADB1',
                                                    // '&:hover': {
                                                    //     backgroundColor: shifts[shift.key as keyof typeof shifts]
                                                    //         ? '#1565c0'
                                                    //         : '#f5f5f5',
                                                    // },
                                                    fontSize: 16,
                                                    fontFamily: 'var(--font-inter)',
                                                    fontWeight: 600
                                                    // border: '1px solid #AAADB1',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </label>
                            </div>
                            <div className="flex gap-4 justify-end items-center">
                                <IconButton onClick={handleDoneClick} sx={{ color: '#66696D', backgroundColor: '#0035711F', padding: 0.5, borderRadius: "7px" }}>
                                    <CheckIcon />
                                </IconButton>
                                <IconButton onClick={handleClearClick} sx={{ color: '#66696D', backgroundColor: '#0035711F', padding: 0.5, borderRadius: "7px" }}>
                                    <CloseIcon />
                                </IconButton>
                            </div>


                            {/* Render selected shifts as tabs below the buttons */}
                            {/* {selectedShifts.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-3 border-y border-[#E1E3E6]">
                                    {selectedShifts.map((shift) => (
                                        <Button
                                            key={shift}
                                            onClick={() => setActiveTab(shift)} // Set the active tab
                                            sx={{
                                                color: activeTab === shift ? '#1F2122' : '#66696D',
                                                // backgroundColor: activeTab === shift ? '#003571' : 'transparent',
                                                borderBottom: activeTab === shift ? '2px solid #0265DC' : '',
                                                fontWeight: 600,
                                                fontSize: 16,
                                                textTransform: 'none',
                                                fontFamily: 'var(--font-inter)',
                                                // borderBottom: '2px solid #0265DC',
                                                borderRadius: '0'
                                                // '&:hover': {
                                                //     backgroundColor: '#0035711F',
                                                //     color: '#003571',
                                                // }
                                            }}
                                        >
                                            {shiftOptions.find((option) => option.key === shift)?.label}
                                        </Button>
                                    ))}
                                </div>
                            )} */}
                            <div className="mt-4 flex flex-wrap gap-3 border-y border-[#E1E3E6]">
                                {selectedShifts && (
                                    Array.isArray(selectedShifts) ? (
                                        selectedShifts.map((shift) => (
                                            <Button
                                                key={shift}
                                                onClick={() => setActiveTab(shift)} // Set the active tab
                                                sx={{
                                                    color: activeTab === shift ? '#1F2122' : '#66696D',
                                                    // backgroundColor: activeTab === shift ? '#003571' : 'transparent',
                                                    borderBottom: activeTab === shift ? '2px solid #0265DC' : '',
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    textTransform: 'none',
                                                    fontFamily: 'var(--font-inter)',
                                                    // borderBottom: '2px solid #0265DC',
                                                    borderRadius: '0'
                                                    // '&:hover': {
                                                    //     backgroundColor: '#0035711F',
                                                    //     color: '#003571',
                                                    // }
                                                }}
                                            >
                                                {shiftOptions.find((option) => option.key === shift)?.label || `Shift ${shift}`}
                                            </Button>
                                        ))
                                    ) : (
                                        Object.entries(selectedShifts).map(([shiftKey, shiftValue]) => (
                                            <Button
                                                key={shiftKey}
                                                onClick={() => setActiveTab(shiftKey)} // Set the active tab
                                                sx={{
                                                    color: activeTab === shiftKey ? '#1F2122' : '#66696D',
                                                    borderBottom: activeTab === shiftKey ? '2px solid #0265DC' : '',
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    textTransform: 'none',
                                                    fontFamily: 'var(--font-inter)',
                                                    borderRadius: '0',
                                                }}
                                            >
                                                {shiftOptions.find((option) => option.key === shiftKey)?.label || `Shift ${shiftKey}`}
                                            </Button>
                                        ))
                                    )
                                )}
                            </div>


                            {/* Show the weekly data based on active tab */}
                            {activeTab && (
                                <div className="mt-4">
                                    {/* <h4 className="text-lg font-bold">Weekly Data for {shiftOptions.find((option) => option.key === activeTab)?.label}:</h4> */}
                                    <label htmlFor="applyToAll" className='flex justify-end text-base text-[#1F2122] font-semibold font-inter gap-1'>
                                        {/* <input
                                            type="checkbox"
                                            id="applyToAll"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    handleApplyToAll();
                                                }
                                            }}
                                        /> */}
                                        {/* <input
                                            type="checkbox"
                                            id="applyToAll"
                                            checked={!!applyToAllState[activeTab]}
                                            onChange={() => handleCheckboxChange(activeTab)}
                                        /> */}
                                        <input
                                            type="checkbox"
                                            id="applyToAll"
                                            checked={!!applyToAllState[activeTab]}
                                            onChange={() => handleCheckboxChange(activeTab)}
                                        />

                                        Apply to all
                                    </label>
                                    {/* <Button onClick={handleApplyToAll} variant="contained" color="primary">
                                        Apply to All
                                    </Button> */}

                                    {days.map((day) => (
                                        <div key={day} className="flex flex-col items-start gap-1 mb-2">
                                            <span className="w-24 font-medium">{day}</span>
                                            <div className='flex gap-3'>
                                                <TextField
                                                    type="time"
                                                    // label="Start Time"
                                                    value={shiftTimes[activeTab]?.[day]?.startTime}
                                                    onChange={(e) =>
                                                        handleShiftTimeChange(activeTab, day, 'startTime', e.target.value)
                                                    }
                                                    size="small"
                                                    sx={{
                                                        width: '100%', maxWidth: '140px', background: '#F6F7F8', border: 'none', borderRadius: '8px',
                                                        fontSize: '0.9rem', fontWeight: '400', fontFamily: 'var(--font-inter)', color: '#1F2122',
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                border: 'none',
                                                            },
                                                            fontSize: '0.9rem',
                                                            fontWeight: '400',
                                                            fontFamily: 'var(--font-inter)',
                                                            color: '#1F2122',
                                                        },
                                                        '& input': {
                                                            fontFamily: 'var(--font-inter)',
                                                            fontSize: '0.9rem',
                                                            color: '#1F2122',
                                                        },
                                                    }}
                                                />
                                                <span className="font-inter font-normal text-sm text-[#000000] text-center flex justify-center items-center" >
                                                    to
                                                </span>
                                                <TextField
                                                    type="time"
                                                    // label="End Time"
                                                    value={shiftTimes[activeTab]?.[day]?.endTime}
                                                    onChange={(e) =>
                                                        handleShiftTimeChange(activeTab, day, 'endTime', e.target.value)
                                                    }
                                                    size="small"
                                                    sx={{
                                                        width: '100%', maxWidth: '140px', background: '#F6F7F8', border: 'none', borderRadius: '8px',
                                                        fontSize: '0.9rem', fontWeight: '400', fontFamily: 'var(--font-inter)', color: '#1F2122',
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                border: 'none',
                                                            },
                                                            fontSize: '0.9rem',
                                                            fontWeight: '400',
                                                            fontFamily: 'var(--font-inter)',
                                                            color: '#1F2122',
                                                        },
                                                        '& input': {
                                                            fontFamily: 'var(--font-inter)',
                                                            fontSize: '0.9rem',
                                                            color: '#1F2122',
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </form>
                    </>
                </div>;
            case 2:
                return <div className='w-full max-w-lg'><AddTeam formData={formData} onFormChange={handleFormChange} /></div>;
            case 3:
                return <div className='w-full max-w-lg'><CreateFloorPlan restaurantDetail={restaurantDetail} /></div>;
            default:
                return <div>Unknown Step</div>;
        }
    };

    return (
        <div className="bg-[linear-gradient(148.67deg,_rgba(255,193,7,0.62)_7.66%,_rgba(2,101,220,0.69)_92.99%)] w-full min-h-screen flex justify-center items-center">
            <main className="bg-[#FFFFFF] w-full max-w-xl flex flex-col items-center p-4 box-border rounded-lg max-md:bg-transparent">
                <Stepper activeStep={activeStep} alternativeLabel className="mb-6 w-full">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel
                                sx={{
                                    '& .MuiStepLabel-label': {
                                        color: activeStep === index ? '#0265DC' : '#AAADB1', // Active and inactive label color
                                        fontWeight: activeStep === index ? 'bold' : 'normal',
                                        fontFamily: 'var(--font-inter)',
                                    },
                                    '& .MuiStepIcon-root': {
                                        color: activeStep === index ? '#0265DC' : '#AAADB1', // Active and inactive icon color
                                    },
                                    '& .MuiStepIcon-text': {
                                        fill: activeStep === index ? '#FFFFFF' : '#FFFFFF', // Customize step number text color
                                    },
                                    '& .MuiStepLabel-label.Mui-completed': {
                                        color: '#414346', // Customize the color of the completed label
                                    },
                                    '& .MuiStepIcon-root.Mui-completed': {
                                        color: '#0265DC', // Customize the color of the completed icon
                                    },
                                }}
                            >{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Render the content of the current step */}
                <Box className="w-full max-w-xl flex justify-center items-center">
                    {renderStepContent(activeStep, subStep)}
                </Box>

                {/* Navigation buttons */}
                <div className="flex items-center w-full justify-between gap-4 mt-2">
                    <div>
                        <Button
                            disabled={activeStep === 0 && subStep === 0}
                            onClick={handleBack}
                            variant="outlined"
                            className="text-[#0265DC] border border-[#0265DC] text-base font-semibold font-inter normal-case"
                            sx={{ textTransform: 'none', color: '#0265DC', fontSize: '1rem', fontWeight: '600', border: '1px solid #0265DC' }}
                        >
                            Back
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        {activeStep !== 0 && activeStep !== 1 && (
                            <Button
                                variant="outlined"
                                onClick={handleSkip}
                                className="text-[#0265DC] border border-[#0265DC] text-base font-semibold font-inter normal-case"
                                sx={{ textTransform: 'none', color: '#0265DC', fontSize: '1rem', fontWeight: '600', border: '1px solid #0265DC' }}
                            >
                                Skip
                            </Button>
                        )}
                        <Button
                            onClick={(e) => {
                                if (activeStep === 0 && subStep === 0) {
                                    _onRestaurantDetails();
                                } else if (activeStep === 0 && subStep === 1) {
                                    _onRegister();
                                } else if (activeStep === 1) {
                                    _onCreateShift();
                                } else if (activeStep === 2) {
                                    _onAddTeam();
                                } else {
                                    handleNext();
                                }
                            }}
                            type="button"
                            // type="submit"
                            disabled={activeStep === steps.length - 1 && subStep === 1}
                            className="text-[#FFFFFF] bg-[#0265DC] text-base font-semibold font-inter normal-case"
                            sx={{ background: '#0265DC', color: '#FFFFFF', textTransform: 'none', fontSize: '1rem', fontWeight: '600' }}
                        >
                            {activeStep === steps.length - 1 && subStep === 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
            </main >
            {/* Snackbar Alert */}
            < Alert open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} />
        </div >
    );
};

export default Register;