'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@/app/components/alert/alert';
import { useRouter } from 'next/navigation';
import Api from '@/app/service/api';
import Sidebar from '@/app/components/sidebar/sidebar';
import Header from '@/app/sections/settings/header';
import Image from 'next/image';
import Loading from '@/app/loading';

const Payment = () => {
    const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly" | null>('yearly');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "bank" | null>('card');
    const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        name: '',
        email: '',
        address_1: '',
        address_2: '',
        state: '',
        city: '',
        zipcode: '',
        card_number: '',
        expiry_date: '',
        cvv: '',
        remember_me: false,
    });
    const router = useRouter();

    const _onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handlePaymentDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            // if (!input.email || !input.name || !input.address_1 || !input.city || !input.state || !input.zipcode || !input.card_number || !input.expiry_date || !input.cvv) {
            //     // Show snackbar error if the name is not filled in
            //     setSnackbarMessage('Please fill in all required fields.');
            //     setSnackbarSeverity('error');
            //     setOpenSnackbar(true);
            //     return;
            // }

            // Prepare the data to send to the backend
            const requestData = {
                name: input.name,
                email: input.email,
                address_1: input.address_1,
                address_2: input.address_2,
                city: input.city,
                state: input.state,
                zipcode: input.zipcode,
                card_number: input.card_number,
                expiry_date: input.expiry_date,
                cvv: input.cvv,
                remember_me: input.remember_me ? '1' : '0',
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
        } catch (error) {
            setLoading(false);
            setError(`${error}` || 'Failed to initiate payment. Please try again later.');
            setSnackbarMessage(`${error}` || 'Failed to initiate payment. Please try again later.');
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

    // const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly" | null>('yearly');
    const [plans, setPlans] = useState<{ [key: string]: any }>({}); // State to store plan details

    // Fetch plans on component mount
    useEffect(() => {
        const fetchPlans = async () => {
            setLoading(true);
            try {
                const response = await Api.getPlans(); // Fetch plans from the API
                setPlans(response?.plans || {});
                setLoading(false);
            } catch (error) {
                console.error('Error fetching plans:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const handlePlanSelection = (planType: "yearly" | "monthly") => {
        setSelectedPlan(planType);
    };

    const selectedPlanDetails = plans[selectedPlan || ''];

    const handleInitiatePayment = async () => {
        setLoading(true);
        setError(null);
        try {
            const id = localStorage.getItem('restaurantId') || 'default-id';
            if (!selectedPlan || !plans[selectedPlan]) {
                setSnackbarMessage('Please select a plan.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
                setLoading(false);
                return;
            }

            const selectedPlanId = plans[selectedPlan].id;
            // console.log('selectedPlanId ', selectedPlanId);

            const response = await Api.initiatePayment({
                plan_id: selectedPlanId,
                restaurant_id: id,
                country: 'uk'
            });

            if (response?.redirect) {
                // Redirect the user to the payment link
                window.location.href = response.redirect;
            } else {
                setError(`${error}` || 'Failed to initiate payment. Please try again.');
                setSnackbarMessage(`${error}` || 'Failed to initiate payment. Please try again.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(`${error}` || 'Failed to initiate payment. Please try again.');
            setSnackbarMessage(`${error}` || 'Failed to initiate payment. Please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='bg-[#F2FAFF] flex flex-col md:h-screen overflow-hidden'>

            <h4 className='text-[#414346] text-2xl font-inter font-bold p-4 box-border border border-b-[#E1E3E6]'>Payment</h4>

            <div className='px-4 py-8 box-border'>

                <div className='flex gap-4 w-full justify-center max-md:flex-col-reverse'>

                    <div className='w-full max-w-sm'>
                        <form className='bg-[#FFFFFF] rounded-xl p-4 box-border flex flex-col justify-between items-center w-full gap-2 border border-[#E1E3E6]' >

                            <fieldset className='bg-[#FFFFFF] flex flex-col justify-between items-center w-full '>
                                <legend className='mb-2 flex text-xl text-[#1F2122] font-semibold font-inter text-start'>Billing cycle</legend>
                                <div className='flex flex-col gap-2 w-[100%] max-w-lg'>
                                    <label htmlFor="" className='flex flex-col text-sm text-[#1F2122] font-normal font-inter gap-1'>
                                        Select annual to save 50%
                                        <div className="flex gap-3 w-full">
                                            {Object.entries(plans).map(([planType, planDetails]) => (
                                                <div key={planDetails.id} className={`p-3 box-border w-full border rounded-lg bg-[#F6F7F8] flex flex-col ${selectedPlan === planType ? "border-[#0265DC]" : "border-[#E1E3E6]"
                                                    }`}
                                                    onClick={() => handlePlanSelection(planType as "yearly" | "monthly")}>
                                                    <label htmlFor="" className='flex gap-1 text-base text-[#1F2122] font-normal font-inter text-start'>
                                                        <input type="radio"
                                                            name="subscription"
                                                            value={planType}
                                                            checked={selectedPlan === planType}
                                                            onChange={() => handlePlanSelection(planType as "yearly" | "monthly")} />
                                                        {/* Annualy */}
                                                        ({planDetails.recurring})
                                                    </label>
                                                    <span className='text-sm text-[#1F2122] font-semibold font-inter '>£{planDetails.price.toFixed(2)}/{planDetails.recurring}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </label>

                                </div>
                            </fieldset>

                            <div className='bg-[#FFFFFF] mt-2 px-2 box-border flex justify-between items-center w-full gap-3' >
                                <span className='flex text-lg text-[#1F2122] font-semibold font-inter text-start'>Bill summary</span>
                                {/* <button>D</button> */}
                            </div>

                            <div className='bg-[#FFFFFF] rounded-xl p-3 box-border flex flex-col justify-between items-center w-full gap-2 border border-[#E1E3E6]' >
                                {/* <div className='bg-[#FFFFFF] flex justify-between items-center w-full pb-2 box-border border-b border-[#E1E3E6]'>
                                    <span className='flex text-base text-[#1F2122] font-normal font-inter'>Branch name</span>
                                    <span className='flex text-base text-[#1F2122] font-normal font-inter'>£{selectedPlanDetails?.price?.toFixed(2)}/{selectedPlanDetails?.recurring}</span>
                                </div> */}

                                <div className='bg-[#FFFFFF] flex justify-between items-center w-full '>
                                    <span className='flex text-lg text-[#1F2122] font-semibold font-inter'>Total Due</span>
                                    <span className='flex text-lg text-[#1F2122] font-semibold font-inter'>£{selectedPlanDetails?.price?.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex items-center w-full justify-end gap-4 mt-2">
                                <Button
                                    onClick={() => handleInitiatePayment()}
                                    type="button"
                                    className="text-[#FFFFFF] bg-[#0265DC] text-base font-semibold font-inter normal-case"
                                    sx={{ background: '#0265DC', color: '#FFFFFF', textTransform: 'none', fontSize: '1rem', fontWeight: '600' }}
                                >
                                    Save And Pay
                                </Button>
                            </div>

                        </form>
                    </div>

                </div >
            </div >

            {/* Snackbar Alert */}
            < Alert open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} />
        </div >
    );
};

export default Payment;










// payment page ui according to figma
// 'use client';

// import React, { useState, useCallback, useEffect } from 'react';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Alert from '@/app/components/alert/alert';
// import { useRouter } from 'next/navigation';
// import Api from '@/app/service/api';
// import Sidebar from '@/app/components/sidebar/sidebar';
// import Header from '@/app/sections/settings/header';
// import Image from 'next/image';
// import Loading from '@/app/loading';

// const Payment = () => {
//     const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly" | null>('yearly');
//     const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "bank" | null>('card');
//     const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('error');
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [input, setInput] = useState({
//         name: '',
//         email: '',
//         address_1: '',
//         address_2: '',
//         state: '',
//         city: '',
//         zipcode: '',
//         card_number: '',
//         expiry_date: '',
//         cvv: '',
//         remember_me: false,
//     });
//     const router = useRouter();

//     const _onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setInput((prev) => ({ ...prev, [name]: value }));
//     }, []);

//     const handlePaymentDetails = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             // if (!input.email || !input.name || !input.address_1 || !input.city || !input.state || !input.zipcode || !input.card_number || !input.expiry_date || !input.cvv) {
//             //     // Show snackbar error if the name is not filled in
//             //     setSnackbarMessage('Please fill in all required fields.');
//             //     setSnackbarSeverity('error');
//             //     setOpenSnackbar(true);
//             //     return;
//             // }

//             // Prepare the data to send to the backend
//             const requestData = {
//                 name: input.name,
//                 email: input.email,
//                 address_1: input.address_1,
//                 address_2: input.address_2,
//                 city: input.city,
//                 state: input.state,
//                 zipcode: input.zipcode,
//                 card_number: input.card_number,
//                 expiry_date: input.expiry_date,
//                 cvv: input.cvv,
//                 remember_me: input.remember_me ? '1' : '0',
//             };
//             // const response = await Api.createRestaurant(requestData);

//             // if (response) {
//             //     setSnackbarMessage(response?.message || 'Restaurant registered successfully');
//             //     setSnackbarSeverity('success');
//             //     setOpenSnackbar(true);
//             //     handleNext();
//             // } else {
//             //     // throw new Error(response?.message || 'Failed to register Restaurant.');
//             //     setSnackbarMessage(response?.message || 'Failed to register Restaurant.');
//             //     setSnackbarSeverity('error');
//             //     setOpenSnackbar(true);
//             // }
//         } catch (error) {
//             setLoading(false);
//             setError(`${error}` || 'Failed to initiate payment. Please try again later.');
//             setSnackbarMessage(`${error}` || 'Failed to initiate payment. Please try again later.');
//             setSnackbarSeverity('error');
//             setOpenSnackbar(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle closing Snackbar
//     const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setOpenSnackbar(false); // Hide Snackbar
//     };

//     // const [selectedPlan, setSelectedPlan] = useState<"yearly" | "monthly" | null>('yearly');
//     const [plans, setPlans] = useState<{ [key: string]: any }>({}); // State to store plan details

//     // Fetch plans on component mount
//     useEffect(() => {
//         const fetchPlans = async () => {
//             setLoading(true);
//             try {
//                 const response = await Api.getPlans(); // Fetch plans from the API
//                 setPlans(response?.plans || {});
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching plans:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPlans();
//     }, []);

//     const handlePlanSelection = (planType: "yearly" | "monthly") => {
//         setSelectedPlan(planType);
//     };

//     const selectedPlanDetails = plans[selectedPlan || ''];

//     const handleInitiatePayment = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const id = localStorage.getItem('restaurantId') || 'default-id';
//             if (!selectedPlan || !plans[selectedPlan]) {
//                 setSnackbarMessage('Please select a plan.');
//                 setSnackbarSeverity('error');
//                 setOpenSnackbar(true);
//                 setLoading(false);
//                 return;
//             }

//             const selectedPlanId = plans[selectedPlan].id;
//             // console.log('selectedPlanId ', selectedPlanId);

//             const response = await Api.initiatePayment({
//                 plan_id: selectedPlanId,
//                 restaurant_id: id,
//                 country: 'uk'
//             });
//             // console.log('response', response);

//             if (response?.redirect) {
//                 // Redirect the user to the payment link
//                 window.location.href = response.redirect;
//             } else {
//                 setError(`${error}` || 'Failed to initiate payment. Please try again.');
//                 setSnackbarMessage(`${error}` || 'Failed to initiate payment. Please try again.');
//                 setSnackbarSeverity('error');
//                 setOpenSnackbar(true);
//             }
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//             setError(`${error}` || 'Failed to initiate payment. Please try again.');
//             setSnackbarMessage(`${error}` || 'Failed to initiate payment. Please try again.');
//             setSnackbarSeverity('error');
//             setOpenSnackbar(true);
//         }
//     };

//     if (loading) {
//         return <Loading />;
//     }

//     return (
//         <div className='bg-[#F2FAFF] flex flex-col md:h-screen overflow-hidden'>

//             <h4 className='text-[#414346] text-2xl font-inter font-bold p-4 box-border border border-b-[#E1E3E6]'>Payment</h4>

//             <div className='px-4 py-8 box-border'>

//                 <div className='flex gap-4 w-full justify-center max-md:flex-col-reverse'>

//                     {/* <div style={{
//                         scrollbarWidth: 'none',
//                         msOverflowStyle: 'none' ,
//                     }} className='bg-[#FFFFFF] flex flex-col gap-2 p-4 box-border rounded-2xl w-full max-w-2xl h-full md:max-h-[85vh] overflow-y-auto'>

//                         <form className='bg-[#FFFFFF] rounded-xl p-4 box-border flex flex-col justify-between items-center w-full gap-3 border border-[#E1E3E6]' >

//                             <fieldset className='bg-[#FFFFFF] flex flex-col justify-between items-center w-full '>
//                                 <legend className='mb-3 pb-2 box-border w-full flex text-xl text-[#1F2122] font-semibold font-inter text-start border-b border-[#E1E3E6]'>Payment Details</legend>
//                                 <div className='flex flex-col gap-2 w-[100%] max-w-lg'>
//                                     <label htmlFor="" className='flex flex-col text-sm text-[#1F2122] font-normal font-inter gap-1'>
//                                         Choose a Payment Method
//                                         <div className="flex gap-3 w-full">
//                                             <label htmlFor=""
//                                                 className={`flex justify-center items-center gap-1 text-base text-[#1F2122] font-normal font-inter text-center px-3 py-4 box-border w-full max-w-[180px] border rounded-lg bg-[#F6F7F8] ${selectedPaymentMethod === "card" ? "border-[#0265DC]" : "border-[#E1E3E6]"
//                                                     }`}
//                                                 onClick={() => setSelectedPaymentMethod("card")}>
//                                                 <input type="radio" className="hidden"
//                                                     name="payment_method"
//                                                     value="card"
//                                                     checked={selectedPaymentMethod === "card"}
//                                                     onChange={() => setSelectedPaymentMethod("card")} />
//                                                 <Image
//                                                     src="/assets/icons/payment/Visa.svg" alt="card"
//                                                     width={22}
//                                                     height={22}
//                                                     priority
//                                                 />
//                                                 Card
//                                             </label>
//                                             <label htmlFor=""
//                                                 className={`flex justify-center items-center gap-1 text-base text-[#1F2122] font-normal font-inter text-center px-3 py-4 box-border w-full max-w-[180px] border rounded-lg bg-[#F6F7F8] ${selectedPaymentMethod === "bank" ? "border-[#0265DC]" : "border-[#E1E3E6]"
//                                                     }`}
//                                                 onClick={() => setSelectedPaymentMethod("bank")}>
//                                                 <input type="radio" className="hidden"
//                                                     name="payment_method"
//                                                     value="bank"
//                                                     checked={selectedPaymentMethod === "bank"}
//                                                     onChange={() => setSelectedPaymentMethod("bank")} />
//                                                 <Image
//                                                     src="/assets/icons/payment/Transfer.svg" alt="transfer"
//                                                     width={24}
//                                                     height={24}
//                                                     priority
//                                                 />
//                                                 Bank Transfer
//                                             </label>
//                                         </div>
//                                     </label>

//                                     <label htmlFor="" className='flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
//                                         Card Number*
//                                         <input
//                                             type="number"
//                                             placeholder='Card number'
//                                             name="card_number"
//                                             value={input.card_number}
//                                             onChange={_onChange}
//                                             className='px-2 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
//                                     </label>
//                                     <div className='flex items-center w-full gap-2 max-md:flex-col'>
//                                         <label htmlFor="" className='w-full flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
//                                             Expiration Date*
//                                             <input type="text" placeholder='Expiry'
//                                                 name="expiry_date"
//                                                 value={input.expiry_date}
//                                                 onChange={_onChange}
//                                                 className='w-full px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
//                                         </label>
//                                         <label htmlFor="state" className='w-full flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
//                                             CVV*
//                                             <input type="number" placeholder='Enter'
//                                                 name="cvv"
//                                                 value={input.cvv}
//                                                 onChange={_onChange}
//                                                 className='w-full px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
//                                         </label>
//                                     </div>

//                                     <label htmlFor="card-number" className="mt-1 flex justify-end items-center gap-2 text-base text-[#1F2122] font-semibold font-inter">
//                                         <input type="checkbox" id="checkbox" name="checkbox" className="w-4 h-4 bg-white border-gray-700 rounded-md" />
//                                         Remember This Card
//                                     </label>
//                                 </div>
//                             </fieldset>
//                         </form>

//                         <form className='bg-[#FFFFFF] rounded-xl p-4 box-border flex flex-col justify-between items-center w-full gap-3 border border-[#E1E3E6]' >
//                             <fieldset className='bg-[#FFFFFF] flex flex-col justify-between items-center w-full '>
//                                 <legend className='mb-3 pb-2 box-border w-full flex text-xl text-[#1F2122] font-semibold font-inter text-start border-b border-[#E1E3E6]'>Customer Details</legend>
//                                 <div className='flex flex-col gap-2 w-[100%] max-w-lg'>
//                                     <label htmlFor="" className='flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
//                                         Branch name
//                                         <input type="text" placeholder='Enter'
//                                             name="name"
//                                             value={input.name}
//                                             onChange={_onChange}
//                                             className='px-2 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
//                                     </label>
//                                     <label htmlFor="" className='flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
//                                         Email
//                                         <input
//                                             type="email"
//                                             placeholder='Enter'
//                                             name="email"
//                                             value={input.email}
//                                             onChange={_onChange}
//                                             className='px-2 py-2 box-border border border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
//                                     </label>
//                                 </div>
//                             </fieldset>
//                         </form>

//                         <form className='bg-[#FFFFFF] rounded-xl p-4 box-border flex flex-col justify-between items-center w-full gap-3 border border-[#E1E3E6]' >
//                             <fieldset className='bg-[#FFFFFF] flex flex-col justify-between items-center w-full '>
//                                 <legend className='mb-3 pb-2 box-border w-full flex text-xl text-[#1F2122] font-semibold font-inter text-start border-b border-[#E1E3E6]'>Billing Details</legend>
//                                 <div className='flex flex-col gap-2 w-[100%] max-w-lg'>
//                                     <label htmlFor="" className='flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
//                                         Address Line 1
//                                         <input type="text" placeholder='Enter'
//                                             name="address_1"
//                                             value={input.address_1}
//                                             onChange={_onChange}
//                                             className='px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
//                                     </label>
//                                     <label htmlFor="" className='flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
//                                         Address Line 2
//                                         <input type="text" placeholder='Enter'
//                                             name="address_2"
//                                             value={input.address_2}
//                                             onChange={_onChange}
//                                             className='px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
//                                     </label>
//                                     <div className='flex items-center w-full gap-2 max-md:flex-col'>
//                                         <label htmlFor="" className='w-full flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
//                                             City
//                                             <input type="text" placeholder='City name'
//                                                 name="city"
//                                                 value={input.city}
//                                                 onChange={_onChange}
//                                                 className='w-full px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
//                                         </label>
//                                         <label htmlFor="state" className='w-full flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
//                                             State / Province
//                                             <input type="text" placeholder='Enter'
//                                                 name="state"
//                                                 value={input.state}
//                                                 onChange={_onChange}
//                                                 className='w-full px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
//                                         </label>
//                                         <label htmlFor="" className='w-full flex flex-col text-base text-[#1F2122] font-semibold font-inter gap-1'>
//                                             ZIP / Postal Code
//                                             <input type="text" placeholder='Postal code'
//                                                 name="zipcode"
//                                                 value={input.zipcode}
//                                                 onChange={_onChange}
//                                                 className='w-full px-2 py-2 box-border border-[1px] border-[#AAADB1] rounded-lg text-base text-[#414346] font-normal font-inter outline-none' />
//                                         </label>
//                                     </div>
//                                 </div>
//                             </fieldset>

//                         </form>

//                         <div className="flex items-center w-full justify-end gap-4 mt-2">
//                              <Button
//                                 // disabled={activeStep === 0}
//                                 onClick={handleBack}
//                                 variant="outlined"
//                                 className="text-[#0265DC] border border-[#0265DC] text-base font-semibold font-inter normal-case"
//                                 sx={{ textTransform: 'none', color: '#0265DC', fontSize: '1rem', fontWeight: '600', border: '1px solid #0265DC' }}
//                             >
//                                 {activeStep === 0 ? 'Cancel' : 'Back'}
//                             </Button>
//                             <Button
//                                 onClick={() => handleInitiatePayment()}
//                                 // onClick={handlePaymentDetails()}
//                                 type="button"
//                                 // disabled={activeStep === steps.length - 1}
//                                 className="text-[#FFFFFF] bg-[#0265DC] text-base font-semibold font-inter normal-case"
//                                 sx={{ background: '#0265DC', color: '#FFFFFF', textTransform: 'none', fontSize: '1rem', fontWeight: '600' }}
//                             >
//                                 Save And Pay
//                             </Button>
//                         </div>
//                     </div> */}


//                     <div className='w-full max-w-sm'>
//                         <form className='bg-[#FFFFFF] rounded-xl p-4 box-border flex flex-col justify-between items-center w-full gap-2 border border-[#E1E3E6]' >

//                             <fieldset className='bg-[#FFFFFF] flex flex-col justify-between items-center w-full '>
//                                 <legend className='mb-2 flex text-xl text-[#1F2122] font-semibold font-inter text-start'>Billing cycle</legend>
//                                 <div className='flex flex-col gap-2 w-[100%] max-w-lg'>
//                                     <label htmlFor="" className='flex flex-col text-sm text-[#1F2122] font-normal font-inter gap-1'>
//                                         Select annual to save 50%
//                                         <div className="flex gap-3 w-full">
//                                             {Object.entries(plans).map(([planType, planDetails]) => (
//                                                 <div key={planDetails.id} className={`p-3 box-border w-full border rounded-lg bg-[#F6F7F8] flex flex-col ${selectedPlan === planType ? "border-[#0265DC]" : "border-[#E1E3E6]"
//                                                     }`}
//                                                     onClick={() => handlePlanSelection(planType as "yearly" | "monthly")}>
//                                                     <label htmlFor="" className='flex gap-1 text-base text-[#1F2122] font-normal font-inter text-start'>
//                                                         <input type="radio"
//                                                             name="subscription"
//                                                             value={planType}
//                                                             checked={selectedPlan === planType}
//                                                             onChange={() => handlePlanSelection(planType as "yearly" | "monthly")} />
//                                                         {/* Annualy */}
//                                                         ({planDetails.recurring})
//                                                     </label>
//                                                     <span className='text-sm text-[#1F2122] font-semibold font-inter '>${planDetails.price.toFixed(2)}/{planDetails.recurring}</span>
//                                                 </div>
//                                             ))}
//                                             {/* // <div className={`p-3 box-border w-full border rounded-lg bg-[#F6F7F8] flex flex-col ${selectedPlan === "monthly" ? "border-[#0265DC]" : "border-[#E1E3E6]"
//                                             //     }`}
//                                             //     onClick={() => setSelectedPlan("monthly")}>
//                                             //     <label htmlFor="" className='flex gap-1 text-base text-[#1F2122] font-normal font-inter text-start'>
//                                             //         <input type="radio"
//                                             //             name="subscription"
//                                             //             value="monthly"
//                                             //             checked={selectedPlan === "monthly"}
//                                             //             onChange={() => setSelectedPlan("monthly")} />
//                                             //         Monthly
//                                             //     </label>
//                                             //     <span className='text-sm text-[#1F2122] font-semibold font-inter '>$ 5/ month</span>
//                                             // </div> */}
//                                         </div>
//                                     </label>

//                                 </div>
//                             </fieldset>

//                             <div className='bg-[#FFFFFF] mt-2 px-2 box-border flex justify-between items-center w-full gap-3' >
//                                 <span className='flex text-lg text-[#1F2122] font-semibold font-inter text-start'>Bill summary</span>
//                                 {/* <button>D</button> */}
//                             </div>

//                             <div className='bg-[#FFFFFF] rounded-xl p-3 box-border flex flex-col justify-between items-center w-full gap-2 border border-[#E1E3E6]' >
//                                 <div className='bg-[#FFFFFF] flex justify-between items-center w-full pb-2 box-border border-b border-[#E1E3E6]'>
//                                     <span className='flex text-base text-[#1F2122] font-normal font-inter'>Branch name</span>
//                                     <span className='flex text-base text-[#1F2122] font-normal font-inter'>${selectedPlanDetails?.price?.toFixed(2)}/{selectedPlanDetails?.recurring}</span>
//                                 </div>

//                                 <div className='bg-[#FFFFFF] flex justify-between items-center w-full '>
//                                     <span className='flex text-lg text-[#1F2122] font-semibold font-inter'>Total Due</span>
//                                     <span className='flex text-lg text-[#1F2122] font-semibold font-inter'>${selectedPlanDetails?.price?.toFixed(2)}</span>
//                                 </div>
//                             </div>

//                             <div className="flex items-center w-full justify-end gap-4 mt-2">
//                                 <Button
//                                     onClick={() => handleInitiatePayment()}
//                                     type="button"
//                                     className="text-[#FFFFFF] bg-[#0265DC] text-base font-semibold font-inter normal-case"
//                                     sx={{ background: '#0265DC', color: '#FFFFFF', textTransform: 'none', fontSize: '1rem', fontWeight: '600' }}
//                                 >
//                                     Save And Pay
//                                 </Button>
//                             </div>

//                         </form>
//                     </div>

//                 </div >
//             </div >

//             {/* Snackbar Alert */}
//             < Alert open={openSnackbar} message={snackbarMessage} severity={snackbarSeverity} onClose={handleCloseSnackbar} />
//         </div >
//     );
// };

// export default Payment;