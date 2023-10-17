import { Box, useMediaQuery, Typography, useTheme } from '@mui/material';
import React from 'react';

import backgroundImage from 'asset/background.png'; // import the image


function Login() {
    const theme = useTheme();
    const isPc = useMediaQuery("(min-width: 1000px)");

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.background.alt,

                backgroundImage: `url(${backgroundImage})`, // use the image as background
                backgroundSize: 'cover', // adjust the background size

                backgroundPosition: 'center', // adjust the background position
            }}
        >
            <Box 
                width = {isPc ? '60%' : '90%'}
                p = '2rem'
                borderRadius = '1rem'
                boxShadow = '0 0 10px rgba(0,0,0,0.5)'
                bgcolor = 'rgba(0, 0, 0, 0.5)'
            >

                <Typography

                    fontWeight='bold'
                    fontSize='clamp(1.5rem, 2vw, 2rem)'
                    color='primary'
                    sx={{
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}
                >
                    Login
                </Typography>
            
            </Box>

        </Box>

    );
}

export default Login;