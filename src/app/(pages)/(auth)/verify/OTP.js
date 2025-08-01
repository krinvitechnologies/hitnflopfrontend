// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { Input as BaseInput } from '@mui/material';
// import { Box, styled } from '@mui/system';

// function OTP({ separator, length, value, onChange }) {
//   const inputRefs = React.useRef(new Array(length).fill(null));

//   const focusInput = (targetIndex) => {
//     const targetInput = inputRefs.current[targetIndex];
//     if (targetInput) {
//       targetInput.focus();
//     }
//   };

//   const selectInput = (targetIndex) => {
//     const targetInput = inputRefs.current[targetIndex];
//     if (targetInput) {
//       targetInput.select();
//     }
//   };

//   const handleKeyDown = (event, currentIndex) => {
//     switch (event.key) {
//       case 'ArrowUp':
//       case 'ArrowDown':
//       case ' ':
//         event.preventDefault();
//         break;
//       case 'ArrowLeft':
//         event.preventDefault();
//         if (currentIndex > 0) {
//           focusInput(currentIndex - 1);
//           selectInput(currentIndex - 1);
//         }
//         break;
//       case 'ArrowRight':
//         event.preventDefault();
//         if (currentIndex < length - 1) {
//           focusInput(currentIndex + 1);
//           selectInput(currentIndex + 1);
//         }
//         break;
//       case 'Delete':
//         event.preventDefault();
//         onChange((prevOtp) => {
//           const otp =
//             prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
//           return otp;
//         });

//         break;
//       case 'Backspace':
//         event.preventDefault();
//         if (currentIndex > 0) {
//           focusInput(currentIndex - 1);
//           selectInput(currentIndex - 1);
//         }

//         onChange((prevOtp) => {
//           const otp =
//             prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
//           return otp;
//         });
//         break;

//       default:
//         break;
//     }
//   };

//   const handleChange = (event, currentIndex) => {
//     const currentValue = event.target.value;
//     let indexToEnter = 0;

//     while (indexToEnter <= currentIndex) {
//       if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
//         indexToEnter += 1;
//       } else {
//         break;
//       }
//     }
//     onChange((prev) => {
//       const otpArray = prev.split('');
//       const lastValue = currentValue[currentValue.length - 1];
//       otpArray[indexToEnter] = lastValue;
//       return otpArray.join('');
//     });
//     if (currentValue !== '') {
//       if (currentIndex < length - 1) {
//         focusInput(currentIndex + 1);
//       }
//     }
//   };

//   const handleClick = (event, currentIndex) => {
//     selectInput(currentIndex);
//   };

//   const handlePaste = (event, currentIndex) => {
//     event.preventDefault();
//     const clipboardData = event.clipboardData;

//     // Check if there is text data in the clipboard
//     if (clipboardData.types.includes('text/plain')) {
//       let pastedText = clipboardData.getData('text/plain');
//       pastedText = pastedText.substring(0, length).trim();
//       let indexToEnter = 0;

//       while (indexToEnter <= currentIndex) {
//         if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
//           indexToEnter += 1;
//         } else {
//           break;
//         }
//       }

//       const otpArray = value.split('');

//       for (let i = indexToEnter; i < length; i += 1) {
//         const lastValue = pastedText[i - indexToEnter] ?? ' ';
//         otpArray[i] = lastValue;
//       }

//       onChange(otpArray.join(''));
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//       {new Array(length).fill(null).map((_, index) => (
//         <React.Fragment key={index}>
//           <BaseInput
//             slots={{
//               input: InputElement,
//             }}
//             aria-label={`Digit ${index + 1} of OTP`}
//             slotProps={{
//               input: {
//                 ref: (ele) => {
//                   inputRefs.current[index] = ele;
//                 },
//                 onKeyDown: (event) => handleKeyDown(event, index),
//                 onChange: (event) => handleChange(event, index),
//                 onClick: (event) => handleClick(event, index),
//                 onPaste: (event) => handlePaste(event, index),
//                 value: value[index] ?? '',
//               },
//             }}
//           />
//           {index === length - 1 ? null : separator}
//         </React.Fragment>
//       ))}
//     </Box>
//   );
// }

// OTP.propTypes = {
//   length: PropTypes.number.isRequired,
//   onChange: PropTypes.func.isRequired,
//   separator: PropTypes.node,
//   value: PropTypes.string.isRequired,
// };

// const blue = {
//   100: '#DAECFF',
//   200: '#80BFFF',
//   400: '#3399FF',
//   500: '#007FFF',
//   600: '#0072E5',
//   700: '#0059B2',
// };

// const grey = {
//   50: '#F3F6F9',
//   100: '#E5EAF2',
//   200: '#DAE2ED',
//   300: '#C7D0DD',
//   400: '#B0B8C4',
//   500: '#9DA8B7',
//   600: '#6B7A90',
//   700: '#434D5B',
//   800: '#303740',
//   900: '#1C2025',
// };

// const InputElement = styled('input')(
//   ({ theme }) => `
//   width: 40px;
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-size: 0.875rem;
//   font-weight: 400;
//   line-height: 1.5;
//   padding: 8px 0px;
//   border-radius: 8px;
//   text-align: center;
//   color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//   background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//   border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
//   box-shadow: 0px 2px 2px ${
//     theme.palette.mode === 'dark' ? grey[900] : grey[50]
//   };

//   &:hover {
//     background: ${theme.palette.mode === 'dark' ? '' : grey[50]};
//     border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[300]};
//   }

//   &:focus {
//     border-color: ${blue[400]};
//     box-shadow: 0 0 0 3px ${
//       theme.palette.mode === 'dark' ? blue[500] : blue[200]
//     };
//     outline: none;
//   }
// `
// );

// export default OTP;


import * as React from 'react';
import PropTypes from 'prop-types';
// import { Input as BaseInput } from '@mui/base/Input';
import { Box, styled } from '@mui/system';
import { TextField, Typography } from '@mui/material';

function OTP({ separator, length, value, onChange }) {
    const inputRefs = React.useRef(new Array(length).fill(null));

    const focusInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        if (targetInput) {
            targetInput.focus();
        }
    };

    const selectInput = (targetIndex) => {
        const targetInput = inputRefs.current[targetIndex];
        if (targetInput) {
            targetInput.select();
        }
    };

    const handleKeyDown = (event, currentIndex) => {
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case ' ':
                event.preventDefault();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (currentIndex < length - 1) {
                    focusInput(currentIndex + 1);
                    selectInput(currentIndex + 1);
                }
                break;
            case 'Delete':
                event.preventDefault();
                onChange((prevOtp) => {
                    const otp =
                        prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });

                break;
            case 'Backspace':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }

                onChange((prevOtp) => {
                    const otp =
                        prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });
                break;

            default:
                break;
        }
    };

    const handleChange = (event, currentIndex) => {
        const currentValue = event.target.value;
        let indexToEnter = 0;

        while (indexToEnter <= currentIndex) {
            if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
                indexToEnter += 1;
            } else {
                break;
            }
        }
        onChange((prev) => {
            const otpArray = prev.split('');
            const lastValue = currentValue[currentValue.length - 1];
            otpArray[indexToEnter] = lastValue;
            return otpArray.join('');
        });
        if (currentValue !== '') {
            if (currentIndex < length - 1) {
                focusInput(currentIndex + 1);
            }
        }
    };

    const handleClick = (event, currentIndex) => {
        selectInput(currentIndex);
    };

    const handlePaste = (event, currentIndex) => {
        event.preventDefault();
        const clipboardData = event.clipboardData;

        // Check if there is text data in the clipboard
        if (clipboardData.types.includes('text/plain')) {
            let pastedText = clipboardData.getData('text/plain');
            pastedText = pastedText.substring(0, length).trim();
            let indexToEnter = 0;

            while (indexToEnter <= currentIndex) {
                if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
                    indexToEnter += 1;
                } else {
                    break;
                }
            }

            const otpArray = value.split('');

            for (let i = indexToEnter; i < length; i += 1) {
                const lastValue = pastedText[i - indexToEnter] ?? ' ';
                otpArray[i] = lastValue;
            }

            onChange(otpArray.join(''));
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {new Array(length).fill(null).map((_, index) => (
                <React.Fragment key={index}>
                    <TextField
                        variant="outlined"
                        inputRef={(ele) => (inputRefs.current[index] = ele)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        onChange={(event) => handleChange(event, index)}
                        onClick={(event) => handleClick(event, index)}
                        onPaste={(event) => handlePaste(event, index)}
                        value={value[index] ?? ''}
                        sx={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#AAADB1',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#AAADB1',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#AAADB1',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#AAADB1',
                                },
                            },
                        }}
                    />
                    {index === length - 1 ? null : separator}
                </React.Fragment>
            ))}
        </Box>
    );
}

OTP.propTypes = {
    length: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    separator: PropTypes.node,
    value: PropTypes.string.isRequired,
};

export default function OTPInput() {
    const [otp, setOtp] = React.useState('');

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography sx={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#1F2122'
            }}>Enter OTP</Typography>
            <OTP value={otp} onChange={setOtp} length={6} />
        </Box>
    );
}

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const InputElement = styled('input')(
    ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);
