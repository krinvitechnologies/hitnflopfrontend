'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonLoading from '@/src/app/components/skeletonLoading/SkeletonLoading';
import Navbar from '@/src/app/components/navbar/Navbar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { PulseLoader } from 'react-spinners';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import { addReview } from '../../lib/store/features/review/reviewSlice';
import { Autocomplete, Button, CircularProgress, TextField } from '@mui/material';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Image from 'next/image';
//  import { Box, Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { addMovie, getMovies } from '@/src/app/lib/store/features/movie/movieSlice';

const Review = () => {
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        name: '',
        email: '',
        description: '',
    });

    const { movies } = useSelector((state) => state.movie);
    // const [movieOptions, setMovieOptions] = useState([
    //     'Oppenheimer',
    //     'Barbie',
    //     'Inception',
    //     'Avengers: Endgame',
    //     'Interstellar'
    // ]);
    const [movieOptions, setMovieOptions] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    if (movies && movies.length > 0) {
        const titles = movies.map((movie) => movie.title || movie.name);
        setMovieOptions(titles);
    }
}, [movies]);

//   const movieOptions = movies.map((movie) => movie.title || movie.name);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReviewForm((prev) => ({ ...prev, [name]: value }));
    };

    const isValidName = (name) => /^[A-Za-z ]+$/.test(name);
    const isValidEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    //   const isValidDescription = (desc) =>
    //     desc.length >= 200 && /^[A-Za-z0-9 .,!?'"()\-_\n\r]+$/.test(desc);

    const validateForm = () => {
        const { name, email, description } = reviewForm;

        if (!name || !email || !description) {
            toast.error('All fields are required');
            return false;
        }

        if (value === 0) {
            toast.error('Please provide a rating before submitting your review.');
            return false;
        }

        if (!isValidName(name)) {
            toast.error('Name should contain only letters and spaces.');
            return false;
        }

        if (!isValidEmail(email)) {
            toast.error('Please enter a valid email address.');
            return false;
        }
        // if (!isValidDescription(description)) {
        //   toast.error('Description must be at least 200 characters and contain valid text.');
        //   return false;
        // }

        if (description.length < 200) {
            toast.error('Description must be at least 200 characters long.');
            return false;
        }

        if (!selectedMovie || selectedMovie.trim() === '') {
            toast.error('Please select or enter a movie name.');
            return false;
        }

        return true;
    };

    const handleSubmitReview = async () => {
        if (!validateForm()) return;
        setLoading(true);
        try {
             // Add movie if not in list
        if (!movieOptions.includes(selectedMovie)) {
            const newMoviePayload = {
                name: selectedMovie,
            };

            const movieResult = await dispatch(addMovie(newMoviePayload));
            if (addMovie.rejected.match(movieResult)) {
                throw new Error("Failed to add movie");
            }
            dispatch(getMovies()); // Refresh movie list
        }

             const payload = {
            ...reviewForm,
            rating: value,
            movie: selectedMovie,
        };
        
            const result = await dispatch(addReview(payload));
            if (addReview.fulfilled.match(result)) {
                toast.success('Review submitted successfully!');
                setReviewForm({ name: '', email: '', description: '' });
                setSelectedMovie('');
                setValue(0);
                // setRatingModalOpen(false);
            } else {
                toast.error(result.payload || 'Submission failed. Please try again.');
            }
        } catch (error) {
            toast.error('Unexpected error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <PulseLoader color="#FECC00" />
    //         </div>
    //     );
    // }

    return (
        <div className="bg-[#0F1014] max-lg:bg-[#0F1014] flex flex-col w-full">
            <Navbar />
            <div className="flex w-full bg-[#0F1014]">
                {/* Left Side */}
                <div className="w-full min-h-screen bg-[#FF6D3E] flex justify-center items-center max-md:hidden">
                    <figcaption className="w-full h-auto min-h-screen">
                        <Image
                            src="/assets/review/Rate & Win Rewards.webp"
                            alt="Review"
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
                            <h1 className="text-[#FFFFFF] text-4xl font-bold mb-4 font-[family-name:var(--font-roboto)]">Share Your Thoughts</h1>
                            <h4 className="text-[#FFFFFF] font-semibold mb-4 font-[family-name:var(--font-roboto)]">Rate a movie and leave your review below</h4>
                        </nav>

                        <form
                            // onSubmit={handleSubmit}
                            className="w-full max-w-screen-sm flex flex-col gap-6"
                        >
                            <Box>
                                <label className="text-base font-semibold text-[#FFFFFF] flex flex-col font-[family-name:var(--font-roboto)]">
                                    Rating
                                    <Rating
                                        name="rating"
                                        value={value}
                                        onChange={(e, newValue) => setValue(newValue)}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55, color: '#FFFFFF', cursor: 'pointer' }} fontSize="inherit" />}
                                        sx={{
                                            display: 'flex',
                                            gap: '8px',
                                            // color: '#FFFFFF',
                                            // background: '#FFFFFF',
                                            '& .MuiRating-iconFilled': {
                                                color: '#FF6D3E',
                                            },
                                            '& .MuiRating-iconHover': {
                                                color: '#FF6D3E',
                                            },
                                        }}
                                    />
                                </label>
                            </Box>

                            <label className="text-base font-semibold text-[#FFFFFF] flex flex-col font-[family-name:var(--font-roboto)]">
                                Name
                                <div className="flex items-center border-0 border-b-2 border-[#FFFFFF] py-2 box-border">
                                    <span className="cursor-pointer text-[#FFFFFF] font-normal">
                                        <PersonOutlineOutlinedIcon />
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={reviewForm.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter name"
                                        className="w-full bg-transparent outline-none text-[#FFFFFF] font-normal font-[family-name:var(--font-roboto)] pl-2 box-border"
                                    />
                                </div>
                            </label>

                            <label className="text-base font-semibold text-[#FFFFFF] flex flex-col font-[family-name:var(--font-roboto)]">
                                Email
                                <div className="flex items-center border-0 border-b-2 border-[#FFFFFF] py-2 box-border">
                                    <span className="cursor-pointer text-[#FFFFFF] font-normal">
                                        <MailOutlineOutlinedIcon />
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={reviewForm.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter email"
                                        className="w-full outline-none text-[#FFFFFF] font-normal font-[family-name:var(--font-roboto)] pl-2 box-border"
                                    />
                                </div>
                            </label>

                            <label className="w-full text-base font-semibold text-[#FFFFFF] flex flex-col font-[family-name:var(--font-roboto)]">
                                Movie
                                <div className="w-full flex items-center border-0 border-b-2 border-[#FFFFFF] py-2 box-border">
                                    <span className="cursor-pointer text-[#FFFFFF] font-normal">
                                        <MovieCreationOutlinedIcon />
                                    </span>
                                    <div className="w-full pl-2">
                                        <Autocomplete
                                            id="search-movies"
                                            freeSolo
                                            options={movieOptions}
                                            value={selectedMovie}
                                            onChange={(event, newValue) => {
                                                if (newValue && !movieOptions.includes(newValue)) {
                                                    setMovieOptions((prev) => [...prev, newValue]);
                                                }
                                                setSelectedMovie(newValue);
                                            }}
                                            onInputChange={(event, newInputValue) => {
                                                // Keep this updated when the user types manually
                                                setSelectedMovie(newInputValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    placeholder="Select or add a movie"
                                                    // label="Movie"
                                                    // fullWidth
                                                    className="w-full max-w-md outline-none text-[#FFFFFF] font-normal font-[family-name:var(--font-roboto)] pl-2 box-border"
                                                    sx={{
                                                        height: "38px",
                                                        width: '100%',
                                                        borderRadius: '16px',
                                                        "& .MuiInputBase-root": {
                                                            height: "38px",
                                                            width: '100%',
                                                            borderRadius: '8px',
                                                            border: "none !important",
                                                            //   padding: "0 10px", 
                                                        },
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            border: "none !important",
                                                        },
                                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                                            border: "none !important",
                                                        },
                                                        "& .MuiInputBase-input": {
                                                            fontSize: "1rem",
                                                            fontWeight: "400",
                                                            fontFamily: "var(--font-inter)",
                                                            color: "#FFFFFF",
                                                        },
                                                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                            border: "none !important",
                                                            boxShadow: "none",
                                                        },
                                                        "& .Mui-focused": {
                                                            boxShadow: "none !important", // Removes blue shadow
                                                        },
                                                        "& .Mui-error .MuiOutlinedInput-notchedOutline": {
                                                            border: "none !important",
                                                        },
                                                    }}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        type: "search",
                                                        endAdornment: (
                                                            <>
                                                                {loading ? <CircularProgress size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </label>

                            <label className="text-base font-semibold text-[#FFFFFF] flex flex-col font-[family-name:var(--font-roboto)]">
                                Description
                                <div className="flex items-center border-0 border-b-2 border-[#FFFFFF] py-2 box-border">
                                    <span className="cursor-pointer text-[#FFFFFF] font-normal">
                                        <DescriptionOutlinedIcon />
                                    </span>
                                    <input
                                        type="text"
                                        name="description"
                                        placeholder="Write your comment (min 200 characters)"
                                        value={reviewForm.description}
                                        onChange={handleInputChange}
                                        className="w-full outline-none text-[#FFFFFF] font-normal font-[family-name:var(--font-roboto)] pl-2 box-border"
                                    />
                                </div>
                            </label>

                            <div className="mt-6 flex justify-end gap-4 w-full max-w-screen-sm">
                                <Button
                                    variant="outlined"
                                    onClick={() => router.push('/profile')}
                                    sx={{ border: '1px solid #AAADB1', color: '#AAADB1', fontSize: '1rem', fontWeight: '600', fontFamily: 'var(--font-inter)', textTransform: 'none', borderRadius: '6rem' }}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    // type="submit"
                                    onClick={handleSubmitReview}
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
                                    {loading ? 'Submit Review' : 'Submit Review'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Review;





// 'use client';

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import SkeletonLoading from '@/src/app/components/skeletonLoading/SkeletonLoading';
// import Navbar from '@/src/app/components/navbar/Navbar';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import { PulseLoader } from 'react-spinners';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import { toast } from 'react-toastify';
// import { addReview } from '../../lib/store/features/review/reviewSlice';
// import { Autocomplete, TextField } from '@mui/material';

// const tabs = [
//     { label: 'My watchlist', value: 'my_watchlist' },
//     { label: 'My reviews', value: 'my_reviews' },
//     { label: 'My likes', value: 'my_likes' }
// ];

// const Review = () => {
//     const { user } = useSelector((state) => state.user);
//     const dispatch = useDispatch();

//     const [activeTab, setActiveTab] = useState('my_watchlist');
//     const [isRatingModalOpen, setRatingModalOpen] = useState(false);
//     const [value, setValue] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [reviewForm, setReviewForm] = useState({
//         name: '',
//         email: '',
//         description: '',
//     });

//     const [movieOptions, setMovieOptions] = useState([
//         'Oppenheimer',
//         'Barbie',
//         'Inception',
//         'Avengers: Endgame',
//         'Interstellar'
//     ]);
//     const [selectedMovie, setSelectedMovie] = useState('');


//     const handleTabClick = (tab) => setActiveTab(tab);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setReviewForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const isValidName = (name) => /^[A-Za-z ]+$/.test(name);
//     const isValidEmail = (email) =>
//         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     //   const isValidDescription = (desc) =>
//     //     desc.length >= 200 && /^[A-Za-z0-9 .,!?'"()\-_\n\r]+$/.test(desc);

//     const validateForm = () => {
//         const { name, email, description } = reviewForm;

//         if (!name || !email || !description) {
//             toast.error('All fields are required');
//             return false;
//         }

//         if (value === 0) {
//             toast.error('Please provide a rating before submitting your review.');
//             return false;
//         }

//         if (!isValidName(name)) {
//             toast.error('Name should contain only letters and spaces.');
//             return false;
//         }

//         if (!isValidEmail(email)) {
//             toast.error('Please enter a valid email address.');
//             return false;
//         }
//         // if (!isValidDescription(description)) {
//         //   toast.error('Description must be at least 200 characters and contain valid text.');
//         //   return false;
//         // }

//         if (description.length < 200) {
//             toast.error('Description must be at least 200 characters long.');
//             return false;
//         }

//         if (!selectedMovie || selectedMovie.trim() === '') {
//             toast.error('Please select or enter a movie name.');
//             return false;
//         }

//         return true;
//     };

//     const handleSubmitReview = async () => {
//         if (!validateForm()) return;

//         setLoading(true);
//         const payload = {
//             ...reviewForm,
//             rating: value,
//             movie: selectedMovie,
//         };

//         try {
//             const result = await dispatch(addReview(payload));
//             if (addReview.fulfilled.match(result)) {
//                 toast.success('Review submitted successfully!');
//                 setReviewForm({ name: '', email: '', description: '' });
//                 setValue(0);
//                 setRatingModalOpen(false);
//             } else {
//                 toast.error(result.payload || 'Submission failed. Please try again.');
//             }
//         } catch (error) {
//             toast.error('Unexpected error. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <PulseLoader color="#FECC00" />
//             </div>
//         );
//     }

//     return (
//         <div className="bg-[#0F1014] max-lg:bg-[#F6F7F8] flex h-screen flex-col w-full overflow-hidden">
//             <Navbar />

//             <div className="bg-[#15161B] flex items-center gap-4 p-4">
//                 <span className="bg-[#1E2027] text-white rounded-full p-2">
//                     <PersonOutlineOutlinedIcon sx={{ fontSize: '3rem' }} />
//                 </span>
//                 <h4 className="text-white font-semibold">
//                     {user?.name ? `${user.name.charAt(0).toUpperCase()}${user.name.slice(1)}` : ''}
//                 </h4>
//             </div>

//             <div className="vd-cr-header flex justify-between items-center p-4">
//                 <h2 className="h2 text-white">Customer Reviews</h2>
//                 <button className="secondary-button" onClick={() => setRatingModalOpen(true)}>
//                     Review
//                 </button>
//             </div>

//             {/* Modal for review */}
//             <Dialog
//                 open={isRatingModalOpen}
//                 onClose={() => setRatingModalOpen(false)}
//                 fullWidth
//                 maxWidth="xs"
//                 PaperProps={{ style: { borderRadius: '16px' } }}
//             >
//                 <DialogContent>
//                     <div className="modal-form space-y-4">
//                         <h2 className="h2">Write a Review</h2>

//                         <Box>
//                             <label className="label block">
//                                 Rating
//                                 <Rating
//                                     name="rating"
//                                     value={value}
//                                     onChange={(e, newValue) => setValue(newValue)}
//                                 />
//                             </label>
//                         </Box>

//                         <div className="form-field-wrap space-y-2">
//                             <label className="label block">
//                                 Name
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     className="input w-full"
//                                     placeholder="Enter name"
//                                     value={reviewForm.name}
//                                     onChange={handleInputChange}
//                                 />
//                             </label>

//                             <label className="label block">
//                                 Email
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     className="input w-full"
//                                     placeholder="Enter email"
//                                     value={reviewForm.email}
//                                     onChange={handleInputChange}
//                                 />
//                             </label>
//                         </div>
                        

//                         <label className="label block w-full max-w-md">
//                             Movie
//                             <Autocomplete
//                                 freeSolo
//                                 options={movieOptions}
//                                 value={selectedMovie}
//                                 onChange={(event, newValue) => {
//                                     if (newValue && !movieOptions.includes(newValue)) {
//                                         setMovieOptions((prev) => [...prev, newValue]);
//                                     }
//                                     setSelectedMovie(newValue);
//                                 }}
//                                 renderInput={(params) => (
//                                     <TextField
//                                         {...params}
//                                         placeholder="Select or add a movie"
//                                         label="Movie"
//                                         fullWidth
//                                         className="label block w-full max-w-md"
//                                     />
//                                 )}
//                             />
//                         </label>

//                         <label className="label block">
//                             Description
//                             <textarea
//                                 name="description"
//                                 className="textarea w-full min-h-[120px]"
//                                 placeholder="Write your comment (min 200 characters)"
//                                 value={reviewForm.description}
//                                 onChange={handleInputChange}
//                             />
//                         </label>

//                         <button onClick={handleSubmitReview} className="primary-button w-full">
//                             Submit Review
//                         </button>
//                     </div>
//                 </DialogContent>
//             </Dialog>

//             {/* Tabs */}
//             <div className="flex px-4 pt-2 space-x-4 border-b border-gray-700">
//                 {tabs.map(({ label, value }) => (
//                     <button
//                         key={value}
//                         onClick={() => handleTabClick(value)}
//                         className={`px-4 py-2 text-sm font-semibold ${activeTab === value
//                             ? 'border-b-2 border-[#FF6D3E] text-[#FF6D3E]'
//                             : 'text-white hover:text-[#FF6D3E]'
//                             }`}
//                     >
//                         {label}
//                     </button>
//                 ))}
//             </div>

//             {/* Content */}
//             <div className="p-4 overflow-y-auto flex-1">
//                 {loading ? (
//                     <SkeletonLoading />
//                 ) : (
//                     <>
//                         {activeTab === 'my_watchlist' && (
//                             <div className="text-white font-semibold">Your watchlist goes here.</div>
//                         )}
//                         {activeTab === 'my_reviews' && (
//                             <div className="text-white font-semibold">Your reviews go here.</div>
//                         )}
//                         {activeTab === 'my_likes' && (
//                             <div className="text-white font-semibold">Your liked items go here.</div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Review;







// 'use client';

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import SkeletonLoading from '@/src/app/components/skeletonLoading/SkeletonLoading';
// import Navbar from '@/src/app/components/navbar/Navbar';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import { PulseLoader } from 'react-spinners';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import { toast } from 'react-toastify';
// import { addReview } from '../../lib/store/features/review/reviewSlice';
// import { Autocomplete } from '@mui/material';

// const tabs = [
//     { label: 'My watchlist', value: 'my_watchlist' },
//     { label: 'My reviews', value: 'my_reviews' },
//     { label: 'My likes', value: 'my_likes' }
// ];

// const Review = () => {
//     const { user } = useSelector((state) => state.user);
//     const dispatch = useDispatch();

//     const [activeTab, setActiveTab] = useState('my_watchlist');
//     const [isRatingModalOpen, setRatingModalOpen] = useState(false);
//     const [value, setValue] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [reviewForm, setReviewForm] = useState({
//         name: '',
//         email: '',
//         description: '',
//     });

//     const [movieOptions, setMovieOptions] = useState([
//         'Oppenheimer',
//         'Barbie',
//         'Inception',
//         'Avengers: Endgame',
//         'Interstellar'
//     ]);
//     const [selectedMovie, setSelectedMovie] = useState('');


//     const handleTabClick = (tab) => setActiveTab(tab);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setReviewForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const isValidName = (name) => /^[A-Za-z ]+$/.test(name);
//     const isValidEmail = (email) =>
//         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     //   const isValidDescription = (desc) =>
//     //     desc.length >= 200 && /^[A-Za-z0-9 .,!?'"()\-_\n\r]+$/.test(desc);

//     const validateForm = () => {
//         const { name, email, description } = reviewForm;

//         if (!name || !email || !description) {
//             toast.error('All fields are required');
//             return false;
//         }

//         if (value === 0) {
//             toast.error('Please provide a rating before submitting your review.');
//             return false;
//         }

//         if (!isValidName(name)) {
//             toast.error('Name should contain only letters and spaces.');
//             return false;
//         }

//         if (!isValidEmail(email)) {
//             toast.error('Please enter a valid email address.');
//             return false;
//         }
//         // if (!isValidDescription(description)) {
//         //   toast.error('Description must be at least 200 characters and contain valid text.');
//         //   return false;
//         // }

//         if (description.length < 200) {
//             toast.error('Description must be at least 200 characters long.');
//             return false;
//         }

//         if (!selectedMovie || selectedMovie.trim() === '') {
//             toast.error('Please select or enter a movie name.');
//             return false;
//         }

//         return true;
//     };

//     const handleSubmitReview = async () => {
//         if (!validateForm()) return;

//         setLoading(true);
//         const payload = {
//             ...reviewForm,
//             rating: value,
//             movie: selectedMovie,
//         };

//         try {
//             const result = await dispatch(addReview(payload));
//             if (addReview.fulfilled.match(result)) {
//                 toast.success('Review submitted successfully!');
//                 setReviewForm({ name: '', email: '', description: '' });
//                 setValue(0);
//                 setRatingModalOpen(false);
//             } else {
//                 toast.error(result.payload || 'Submission failed. Please try again.');
//             }
//         } catch (error) {
//             toast.error('Unexpected error. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <PulseLoader color="#FECC00" />
//             </div>
//         );
//     }

//     return (
//         <div className="bg-[#0F1014] max-lg:bg-[#F6F7F8] flex h-screen flex-col w-full overflow-hidden">
//             <Navbar />

//             <div className="bg-[#15161B] flex items-center gap-4 p-4">
//                 <span className="bg-[#1E2027] text-white rounded-full p-2">
//                     <PersonOutlineOutlinedIcon sx={{ fontSize: '3rem' }} />
//                 </span>
//                 <h4 className="text-white font-semibold">
//                     {user?.name ? `${user.name.charAt(0).toUpperCase()}${user.name.slice(1)}` : ''}
//                 </h4>
//             </div>

//             <div className="vd-cr-header flex justify-between items-center p-4">
//                 <h2 className="h2 text-white">Customer Reviews</h2>
//                 <button className="secondary-button" onClick={() => setRatingModalOpen(true)}>
//                     Review
//                 </button>
//             </div>

//             {/* Modal for review */}
//             <Dialog
//                 open={isRatingModalOpen}
//                 onClose={() => setRatingModalOpen(false)}
//                 fullWidth
//                 maxWidth="xs"
//                 PaperProps={{ style: { borderRadius: '16px' } }}
//             >
//                 <DialogContent>
//                     <div className="modal-form space-y-4">
//                         <h2 className="h2">Write a Review</h2>

//                         <Box>
//                             <label className="label block">
//                                 Rating
//                                 <Rating
//                                     name="rating"
//                                     value={value}
//                                     onChange={(e, newValue) => setValue(newValue)}
//                                 />
//                             </label>
//                         </Box>

//                         <div className="form-field-wrap space-y-2">
//                             <label className="label block">
//                                 Name
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     className="input w-full"
//                                     placeholder="Enter name"
//                                     value={reviewForm.name}
//                                     onChange={handleInputChange}
//                                 />
//                             </label>

//                             <label className="label block">
//                                 Email
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     className="input w-full"
//                                     placeholder="Enter email"
//                                     value={reviewForm.email}
//                                     onChange={handleInputChange}
//                                 />
//                             </label>
//                         </div>

//                         <label className="label block">
//                             Movie
//                             <Autocomplete
//                                 freeSolo
//                                 options={movieOptions}
//                                 value={selectedMovie}
//                                 onChange={(event, newValue) => {
//                                     if (newValue && !movieOptions.includes(newValue)) {
//                                         setMovieOptions((prev) => [...prev, newValue]);
//                                     }
//                                     setSelectedMovie(newValue);
//                                 }}
//                                 renderInput={(params) => (
//                                     <input
//                                         {...params}
//                                         placeholder="Select or add a movie"
//                                         className="input w-full"
//                                     />
//                                 )}
//                             />
//                         </label>

//                         <label className="label block">
//                             Description
//                             <textarea
//                                 name="description"
//                                 className="textarea w-full min-h-[120px]"
//                                 placeholder="Write your comment (min 200 characters)"
//                                 value={reviewForm.description}
//                                 onChange={handleInputChange}
//                             />
//                         </label>

//                         <button onClick={handleSubmitReview} className="primary-button w-full">
//                             Submit Review
//                         </button>
//                     </div>
//                 </DialogContent>
//             </Dialog>

//             {/* Tabs */}
//             <div className="flex px-4 pt-2 space-x-4 border-b border-gray-700">
//                 {tabs.map(({ label, value }) => (
//                     <button
//                         key={value}
//                         onClick={() => handleTabClick(value)}
//                         className={`px-4 py-2 text-sm font-semibold ${activeTab === value
//                             ? 'border-b-2 border-[#FF6D3E] text-[#FF6D3E]'
//                             : 'text-white hover:text-[#FF6D3E]'
//                             }`}
//                     >
//                         {label}
//                     </button>
//                 ))}
//             </div>

//             {/* Content */}
//             <div className="p-4 overflow-y-auto flex-1">
//                 {loading ? (
//                     <SkeletonLoading />
//                 ) : (
//                     <>
//                         {activeTab === 'my_watchlist' && (
//                             <div className="text-white font-semibold">Your watchlist goes here.</div>
//                         )}
//                         {activeTab === 'my_reviews' && (
//                             <div className="text-white font-semibold">Your reviews go here.</div>
//                         )}
//                         {activeTab === 'my_likes' && (
//                             <div className="text-white font-semibold">Your liked items go here.</div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Review;




























// import React, { useState, useEffect } from 'react'
// import './viewdetails.css'
// import Navbar from '../../components/homepage/Navbar/navbar'
// import Footer from '../../components/homepage/footer/footer'
// import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getContractorDetail } from '../../redux/actions/contractorAction';
// import SendEnquiry from '../../containers/SendEnquiry/SendEnquiry';
// import { PulseLoader } from 'react-spinners';
// import { FaPhoneAlt, FaRegEdit, FaStar } from 'react-icons/fa';
// import { CiLocationOn } from "react-icons/ci";
// import SupplierEditSidebar from '../../containers/SupplierEditSidebar/SupplierEditSidebar';
// import { deleteSupplierAccount, getSupplier, supplierLogout } from '../../redux/actions/supplierAuthAction';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import Box from '@mui/material/Box';
// import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
// import { addReview, getReviews } from '../../redux/actions/reviewAction';
// import { toast } from 'react-toastify';
// import { FaRegCircleUser } from "react-icons/fa6";
// import { FaPlus } from "react-icons/fa6";
// import { FaRegCommentDots } from "react-icons/fa6";

// function ViewDetails() {
//     // const location = useLocation();
//     // const item = location.state.id;
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { loading, contractorDetail } = useSelector(state => state.contractorReducer);
//     const { reviews } = useSelector(state => state.reviewReducer);

//     const { supplier } = useSelector(state => state.supplierAuthReducer);
//     const [sendEnquiryOpen, setSendEnquiryOpen] = useState(false);
//     const [showEditProfileSidebar, setShowEditProfileSidebar] = useState(false);
//     const [isRatingModalOpen, setRatingModalOpen] = useState(false);
//     const [value, setValue] = useState(0);
//     const [selectedRating, setSelectedRating] = useState(null);
//     const [reviewForm, setReviewForm] = useState({
//         name: '',
//         email: '',
//         description: '',
//     });

//     // State to track if cookie "21sqft" exists
//     const [isTokenAvailable, setIsTokenAvailable] = useState(false);
//     const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

//     // Helper function to check if a specific cookie exists
//     const getCookie = (name) => {
//         const cookieArr = document.cookie.split(";");
//         for (let i = 0; i < cookieArr.length; i++) {
//             const cookiePair = cookieArr[i].split("=");
//             if (name === cookiePair[0].trim()) {
//                 return cookiePair[1];
//             }
//         }
//         return null;
//     };

//     // Check for the token in cookies on component mount
//     useEffect(() => {
//         const token = getCookie("21sqft");
//         if (token) {
//             setIsTokenAvailable(true);
//         }
//     }, []);

//     useEffect(() => {
//         dispatch(getContractorDetail(id)); // Dispatch action to fetch contractor details when component mounts
//         dispatch(getReviews(id)); // Dispatch action to fetch contractor details when component mounts
//     }, [dispatch, id]);

//     // const { contractor } = contractorDetail;
//     const contractor = contractorDetail ? contractorDetail.contractor : null;
//     const loggedContractor = supplier ? supplier.contractor : null;

//     const handleInputChange = (e) => {
//         setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
//     };


//     // const deleteCookie = (name) => {
//     //     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
//     // };
//     const deleteCookie = (name, path = '/', domain = '') => {
//         console.log(`Deleting cookie: ${name}`);
//         document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain};`;
//     };
//     // const handleLogout = () => {
//     //     // Assuming the path is '/' and domain is '' (default domain)
//     //     deleteCookie('21sqft', '/', '');
//     //     // Perform any other logout actions here (e.g., dispatching logout actions)
//     //     // dispatch(supplierLogout(navigate)); // Uncomment if needed
//     //     navigate('/');
//     // };



//     // const handleLogout = () => {
//     //     deleteCookie('21sqft');
//     //     // dispatch(supplierLogout(navigate));
//     //     navigate('/');
//     // };

//     const handleLogout = () => {
//         dispatch(supplierLogout(navigate));
//         // Call API to fetch data again
//         dispatch(getSupplier());
//     };

//     const handleDeleteAccount = async (id) => {
//         try {
//             dispatch(deleteSupplierAccount(id, navigate));
//         } catch (error) {
//             console.error("Error deleting account:", error);
//         }
//     };

//     // import { submitContractorReview } from '../../redux/actions/reviewActions';

//     const handleSubmitReview = async () => {
//         const reviewData = {
//             name: reviewForm.name,
//             email: reviewForm.email,
//             description: reviewForm.description,
//             rating: value,
//             business: id,
//         };

//         // Optional validation
//         if (!reviewForm.name || !reviewForm.email || !reviewForm.description) {
//             toast.error("Please fill in all fields");
//             return;
//         }

//         try {
//             // Dispatch and unwrap to catch success/failure
//             // const response = await dispatch(addReview(reviewData)).unwrap();
//             const response = await dispatch(addReview(reviewData));

//             if (response?.review) {
//                 // Success: clear form & close modal
//                 setReviewForm({ name: '', email: '', description: '' });
//                 setValue(0);
//                 setRatingModalOpen(false);
//             }
//         } catch (error) {
//             // console.error("Failed to submit review:", error);
//             // alert("Something went wrong while submitting your review.");
//         }
//     };



//     if (loading) {
//         return <div style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100vh'
//         }}>
//             <PulseLoader color="#FECC00" />
//         </div>
//     }


//     return (
//         <div className='cont-detail-cont'>
//             <div className="cd-header">
//                 <Navbar />
//             </div>
//             <div className="contractor-detail">
//                 {contractor && (
//                     <div className="cd-cont">
//                         <div className="top-cd">
//                             <div className="top-left-img-cont">
//                                 {/* <img src={contractor.image[0]} alt='' /> */}
//                                 {contractor && contractor.image && contractor.image[0] && (
//                                     <img src={contractor.image[0]} alt='' />
//                                 )}
//                             </div>
//                             <div className="top-right-cont">
//                                 {/* {isSupplierAuthenticated ? (
//                                     <div className="cd-edit-btn">
//                                         <button onClick={openEditProfileSidebar}>Edit <FaRegEdit /></button>
//                                         {showEditProfileSidebar && (
//                                             <SupplierEditSidebar SupplierEditProfileSidebar={closeEditProfileSidebar} />
//                                         )}
//                                     </div>
//                                 ) : (
//                                     <div className="cd-send-enq-btn">
//                                         <button type='submit' onClick={handleSendEnquiryOpen}>Send Enquiry</button>
//                                     </div>
//                                 )} */}
//                                 {loggedContractor && loggedContractor._id === id ? (
//                                     <div className="cd-edit-btn">
//                                         <div className="cd-logout-btn">
//                                             <button type="submit" onClick={handleLogout}>
//                                                 Logout
//                                             </button>
//                                             <button type="submit" onClick={() => setDeleteAccountModalOpen(true)}>
//                                                 Delete Account
//                                             </button>
//                                             <Dialog
//                                                 open={deleteAccountModalOpen}
//                                                 onClose={() => setDeleteAccountModalOpen(false)}
//                                                 fullWidth={true} // Set to true to make the dialog take up the full width
//                                                 maxWidth="xs"
//                                                 PaperProps={{ style: { backgroundColor: '#F6F6F6', borderRadius: '20px' } }}
//                                             >
//                                                 <DialogContent>
//                                                     <div className="modal-form">
//                                                         <h3 className="h3">Are you sure you want to delete this account? This action cannot be undone.</h3>
//                                                         <div className='vd-del-acc-btns'>
//                                                             <button className="cancel-button" onClick={() => setDeleteAccountModalOpen(false)}>
//                                                                 Cancel
//                                                             </button>
//                                                             <button className="primary-button" onClick={() => handleDeleteAccount(id)} disabled={loading}>
//                                                                 {loading ? 'Deleting...' : 'Delete'}
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 </DialogContent>
//                                             </Dialog>
//                                         </div>

//                                         <button onClick={() => setShowEditProfileSidebar(true)}>
//                                             Edit <FaRegEdit />
//                                         </button>
//                                         {showEditProfileSidebar && (
//                                             <SupplierEditSidebar
//                                                 SupplierEditProfileSidebar={() => setShowEditProfileSidebar(false)}
//                                             />
//                                         )}
//                                     </div>
//                                 ) : (
//                                     <div className="cd-send-enq-btn">
//                                         <button type="submit" onClick={() => setSendEnquiryOpen(true)}>
//                                             Send Enquiry
//                                         </button>
//                                     </div>
//                                 )}
//                                 <h4>{contractor.name}</h4>
//                                 <p>{contractor.shortDescription}</p>
//                                 <div className="cd-details">
//                                     <span className='t1'>Service - {contractor.service}</span>
//                                     {/* {isTokenAvailable && (
//                                         <span className='t2'><FaPhoneAlt />{contractor.phoneNo}</span>
//                                     )} */}
//                                     {contractor.phoneNo && (
//                                         <span className='t2'><FaPhoneAlt />{contractor.phoneNo}</span>
//                                     )}
//                                     <span className='t3'>Rs {contractor.price}</span>
//                                 </div>
//                                 <div className="cd-address">
//                                     <span><CiLocationOn /> {contractor.city} {contractor.state}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {contractor.description && contractor.description.trim() !== "" && (
//                             <div className="cd-aboutus">
//                                 <h3>About Us</h3>
//                                 <p>{contractor.description}</p>
//                             </div>
//                         )}

//                         {contractor.image && contractor.image.length > 1 && (
//                             <div className="cd-images-cont">
//                                 <h3>Photos</h3>
//                                 <div className="cd-images">
//                                     {/* {contractor.image.slice(1).map((image, index) => (
//                                     <img key={index} src={image} alt='' />
//                                 ))} */}
//                                     {/* {contractor && contractor.image && contractor.image.map((image, index) => (
//                                     // <img key={index} src={`http://localhost:8080/uploaded/${image}`} alt='' />
//                                 ))} */}
//                                     {contractor && contractor.image && contractor.image.slice(1).map((image, index) => (
//                                         <img key={index} src={image} alt='' />
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         <div className="vd-cr-header">
//                             <h2 className='h2'>Customer Reviews</h2>
//                             <button className='secondary-button' onClick={() => setRatingModalOpen(true)}>
//                                 <FaPlus /> Review
//                             </button>
//                         </div>
//                         <Dialog
//                             open={isRatingModalOpen}
//                             onClose={() => setRatingModalOpen(false)}
//                             fullWidth={true}
//                             maxWidth="xs"
//                             PaperProps={{ style: { borderRadius: '16px' } }}
//                         >
//                             <DialogContent>
//                                 <div className="modal-form">
//                                     <h2 className='h2'><FaRegCommentDots /> Write a Review</h2>
//                                     <Box sx={{ '& > legend': { mt: 2 } }}>
//                                         <label htmlFor="" className='label'>Rating
//                                             {/* <Typography component="legend">Rating</Typography> */}
//                                             <Rating
//                                                 name="simple-controlled"
//                                                 value={value}
//                                                 onChange={(event, newValue) => {
//                                                     setValue(newValue);
//                                                 }}
//                                             // style={{ color: getRatingColor(value) }}
//                                             />
//                                         </label>
//                                     </Box>

//                                     <div className='form-field-wrap'>
//                                         <label className='label'>
//                                             Name
//                                             <input type="text" name="name" className='input' placeholder='Enter name' value={reviewForm.name} onChange={handleInputChange} />
//                                         </label>
//                                         <label className='label'>
//                                             Email
//                                             <input type="email" name="email" className='input' placeholder='Enter email' value={reviewForm.email} onChange={handleInputChange} />
//                                         </label>
//                                     </div>
//                                     <label className='label'>
//                                         Description
//                                         <textarea name="description" className='textarea' placeholder='Enter comment' value={reviewForm.description} onChange={handleInputChange}></textarea>
//                                     </label>

//                                     <button onClick={handleSubmitReview} className="primary-button">
//                                         Submit Review
//                                     </button>

//                                     {/* <div className='pr-right-rating-bars'>
//                                         <ul>
//                                             {[5, 4, 3, 2, 1].map((star) => (
//                                                 <li key={star}>{star} <FaStar style={{ color: '#d4d5d9' }} />
//                                                     <Progress completed={(product?.ratingsCount?.[star] || 0) * 100 / product?.noOfRatings} text="75%"
//                                                         height="5px"
//                                                         color={star >= 4 ? '#14958f' : star === 3 ? '#72bfbc' : star === 2 ? '#fcb301' : '#f16565'}
//                                                         width="50px"
//                                                         style={{ backgroundColor: '#f5f5f6', height: '5px', width: "50%", maxWidth: '180px' }}
//                                                     />
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div> */}

//                                 </div>
//                             </DialogContent>
//                         </Dialog>

//                         <section>
//                             {reviews && reviews.length > 0 ? (
//                                 <div className="cd-reviews-section">
//                                     {/* <h2 className='h2'>Reviews & Ratings</h2> */}
//                                     {/* <h3>Customer Reviews</h3> */}
//                                     {/* Header: Average Rating and Total Reviews */}
//                                     <div className="cd-reviews-summary">
//                                         {contractor.average_rating && (
//                                             <div className='cdr-summary'>
//                                                 <span className='cdrs-rating'>
//                                                     {contractor.average_rating} <FaStar size={18} />
//                                                 </span>
//                                                 <span className='cdrs-total-reviews'>
//                                                     ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
//                                                 </span>
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Review List */}
//                                     {reviews.map((review, index) => (
//                                         <div key={index} className="vd-rr-card">
//                                             <div>
//                                                 <FaRegCircleUser size={20} />
//                                                 <span className='vd-rrc-name'>{review.name && review.name.charAt(0).toUpperCase() + review.name.slice(1)}</span>
//                                                 <div>
//                                                     {/* <Rating value={review.rating} precision={0.5} readOnly style={{ backgroundColor: getRatingColor(review?.rating) }} /> */}
//                                                     <Rating value={Number(review.rating)} precision={0.5} readOnly style={{ color: getRatingColor(review?.rating), fontSize: '1rem' }} />
//                                                 </div>
//                                             </div>
//                                             <div>
//                                                 <p className='vd-rrc-message'>{review.description && review.description.charAt(0).toUpperCase() + review.description.slice(1)}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="not-found-cont">
//                                     <h3 className='h3'>No reviews yet.</h3>
//                                 </div>
//                             )}

//                         </section>

//                         {/* {isSupplierAuthenticated && (
//                             <div className="cd-logout-btn">
//                                 <button type='submit' onClick={handleLogout}>Logout</button>
//                             </div>
//                         )} */}
//                         {/* {loggedContractor && loggedContractor._id === id && (
//                             <div className="cd-logout-btn">
//                                 <button type="submit" onClick={handleLogout}>
//                                     Logout
//                                 </button>
//                             </div>
//                         )} */}
//                     </div>
//                 )}
//             </div>
//             <Footer />
//             <SendEnquiry open={sendEnquiryOpen} setOpen={setSendEnquiryOpen} />
//         </div>
//     )
// }

// export default ViewDetails;

// const getRatingColor = (rating) => {
//     //  const Rating = Number(rating);
//     switch (Number(rating)) {
//         case 1:
//             return '#D85E5E';
//         case 2:
//             return '#D85E5E';
//         case 3:
//             return '#E4B454';
//         case 4:
//             return '#27B357';
//         case 5:
//             return '#27B357';
//         default:
//             return '#868484';
//     }
// };