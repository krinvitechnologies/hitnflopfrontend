import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

const Faq = () => {
    const questions = [
        {
            question: "What is HitnFlop?",
            answer: "HitnFlop is a platform where users can review movies and web series, share their opinions, and earn rewards for their contributions."
        },
        {
            question: "How do I earn rewards on HitnFlop?",
            answer: "You can earn rewards by writing genuine reviews for movies and web series. The more helpful and engaging your reviews are, the more points or rewards you can earn."
        },
        {
            question: "How do I post a review?",
            answer: "Simply sign up or log in, search for the movie or series you've watched, and click on the 'Write a Review' button. Submit your review and wait for it to be approved."
        },
        {
            question: "What type of content is allowed in a review?",
            answer: "Your review should be original, respectful, and relevant to the movie or series. Avoid spoilers, hate speech, or any offensive content. Quality and honesty are rewarded!"
        },
        {
            question: "When will I receive my rewards?",
            answer: "Rewards are credited after your review is approved by our moderation team. Approval typically takes 24–48 hours."
        },
        {
            question: "Can I edit or delete my review after posting?",
            answer: "Yes, you can edit or delete your review anytime by visiting your profile section and navigating to 'My Reviews'."
        },
        {
            question: "How are rewards calculated?",
            answer: "Rewards are based on review quality, engagement (likes/comments), and consistency. Top contributors may receive bonus rewards or be featured."
        },
        {
            question: "Is there a limit to how many reviews I can write?",
            answer: "There’s no hard limit, but we encourage meaningful reviews. Spamming low-quality content may lead to account suspension."
        },
        {
            question: "How can I redeem my rewards?",
            answer: "Rewards can be redeemed for gift cards, wallet cash, or other perks available on the platform. Visit the 'Rewards' section in your profile for redemption options."
        },
        {
            question: "Is HitnFlop free to use?",
            answer: "Yes, using HitnFlop and posting reviews is completely free. Start watching, reviewing, and earning without any fees!"
        }
    ];

    return (
        <div className="w-full bg-[#0F1014]">
            {/* Header */}
            <header className="bg-[#15161B] px-4 py-8 box-border">
                <h1 className="text-[#FFFFFF] text-3xl font-bold text-center">Frequently Asked Questions</h1>
            </header>

            {/* FAQ Container */}
            <section className="w-full max-w-[768px] mx-auto px-4 py-6 flex flex-col gap-5 box-border">
                <div className="flex flex-col gap-0 m-0 p-0">
                    {questions.map((item, index) => (
                        <Accordion
                            key={index}
                            defaultExpanded={index === 0}
                            disableGutters
                            elevation={0}
                            square
                            sx={{
                                border: '2px solid rgba(255, 255, 255, 0.38)',
                                padding: '0.3rem 0',
                                borderRadius: '1rem',
                                background: 'rgba(255, 255, 255, 0.38)',
                                boxSizing: 'border-box',
                                mb: 2.5,
                                '&::before': {
                                    display: 'none',
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                            >
                                <Typography
                                    component="span"
                                    sx={{
                                        display: 'flex',
                                        gap: '1rem',
                                        alignItems: 'center',
                                        fontSize: '1rem',
                                        color: '#FFFFFF',
                                        fontWeight: '700',
                                        fontFamily: 'Inter',
                                    }}
                                >
                                    <BorderColorOutlinedIcon sx={{ fontSize: '1.1rem', color: '#FFFFFF' }} />
                                    {item.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={{
                                    fontSize: '1rem',
                                    color: '#FFFFFF',
                                    fontWeight: '600',
                                    fontFamily: 'Inter',
                                    textAlign: 'start',
                                }}
                            >
                                {item.answer}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Faq;




// import React from 'react';
// import './faq.css';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Navbar from '../../components/navbar/Navbar';
// import Footer from '../../components/footer/Footer';
// import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

// const Faq = () => {
//     const questions = [
//         {
//             question: "What is HitnFlop?",
//             answer: "HitnFlop is a platform where users can review movies and web series, share their opinions, and earn rewards for their contributions."
//         },
//         {
//             question: "How do I earn rewards on HitnFlop?",
//             answer: "You can earn rewards by writing genuine reviews for movies and web series. The more helpful and engaging your reviews are, the more points or rewards you can earn."
//         },
//         {
//             question: "How do I post a review?",
//             answer: "Simply sign up or log in, search for the movie or series you've watched, and click on the 'Write a Review' button. Submit your review and wait for it to be approved."
//         },
//         {
//             question: "What type of content is allowed in a review?",
//             answer: "Your review should be original, respectful, and relevant to the movie or series. Avoid spoilers, hate speech, or any offensive content. Quality and honesty are rewarded!"
//         },
//         {
//             question: "When will I receive my rewards?",
//             answer: "Rewards are credited after your review is approved by our moderation team. Approval typically takes 24–48 hours."
//         },
//         {
//             question: "Can I edit or delete my review after posting?",
//             answer: "Yes, you can edit or delete your review anytime by visiting your profile section and navigating to 'My Reviews'."
//         },
//         {
//             question: "How are rewards calculated?",
//             answer: "Rewards are based on review quality, engagement (likes/comments), and consistency. Top contributors may receive bonus rewards or be featured."
//         },
//         {
//             question: "Is there a limit to how many reviews I can write?",
//             answer: "There’s no hard limit, but we encourage meaningful reviews. Spamming low-quality content may lead to account suspension."
//         },
//         {
//             question: "How can I redeem my rewards?",
//             answer: "Rewards can be redeemed for gift cards, wallet cash, or other perks available on the platform. Visit the 'Rewards' section in your profile for redemption options."
//         },
//         {
//             question: "Is HitnFlop free to use?",
//             answer: "Yes, using HitnFlop and posting reviews is completely free. Start watching, reviewing, and earning without any fees!"
//         }
//     ];


//     return (
//         <div className='faq-page'>
//             <header className='faq-header'>
//                 <h1 className='h1'>Frequently Asked Questions</h1>
//             </header>

//             <section className='faq-container'>
//                 <div className='faq-box'>
//                     {questions.map((item, index) => (
//                         <Accordion
//                             key={index}
//                             defaultExpanded={index === 0}
//                             // sx={{
//                             //   border: '1px solid rgba(83, 86, 90, 0.33)',
//                             //   // border: 'none',
//                             //   boxShadow:'none',
//                             //   // borderTop: index !== 0 ? 'none' : '1px solid rgba(83, 86, 90, 0.33)',
//                             //   borderRadius: '1rem',
//                             //   // borderTopLeftRadius: index === 0 ? '1rem' : 0,
//                             //   // borderTopRightRadius: index === 0 ? '1rem' : 0,
//                             //   // borderBottomLeftRadius: index === questions.length - 1 ? '1rem' : 0,
//                             //   // borderBottomRightRadius: index === questions.length - 1 ? '1rem' : 0,
//                             //   mb: 2,
//                             // }}
//                             disableGutters
//                             elevation={0}
//                             square
//                             sx={{
//                                 border: '1px solid rgba(83, 86, 90, 0.33)',
//                                 padding: '0.3rem 0',
//                                 boxSizing: 'border-box',
//                                 borderRadius:
//                                     index === 0
//                                         ? '1rem 1rem 1rem 1rem'
//                                         : index === questions.length - 1
//                                             ? '1rem 1rem 1rem 1rem'
//                                             : '1rem',
//                                 // index === 0
//                                 //   ? '1rem 1rem 0 0'
//                                 //   : index === questions.length - 1
//                                 //     ? '0 0 1rem 1rem'
//                                 //     : '0',
//                                 overflow: 'hidden',
//                                 '&::before': {
//                                     display: 'none', // Removes extra top line
//                                 },
//                                 mb: 2.5,
//                             }}
//                         >
//                             <AccordionSummary
//                                 expandIcon={<ExpandMoreIcon />}
//                                 aria-controls={`panel${index}-content`}
//                                 id={`panel${index}-header`}
//                             >
//                                 <Typography component="span" sx={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '1rem', color: '#333333', fontWeight: '700', fontFamily: 'Nunito' }}><BorderColorOutlinedIcon sx={{ fontSize: '1.1rem', color: '#4496D2' }} /> {item.question}</Typography>
//                             </AccordionSummary>
//                             <AccordionDetails sx={{ fontSize: '1rem', color: 'rgba(83, 86, 90, 0.66)', fontWeight: '600', fontFamily: 'Nunito', textAlign: 'start' }}>
//                                 {item.answer}
//                             </AccordionDetails>
//                         </Accordion>
//                     ))}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Faq;
