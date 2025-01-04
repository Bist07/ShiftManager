import React from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import pfp from '../assets/images/pfp.jpg'; // Replace this with dynamic image handling if needed

const EmployeeCard = ({ title, description, image }) => {
    return (
        <Box
            sx={{
                width: '100%',
                overflow: 'hidden',
                padding: '0px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                {/* Left: Circular Image */}
                <Card
                    sx={{
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        overflow: 'hidden',
                        flexShrink: 0,
                    }}
                >
                    <CardMedia
                        component="img"
                        image={/*image ||*/ pfp} // Use dynamic image or fallback
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Card>

                {/* Right: Title and Additional Content */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" component="h2" textAlign="left">
                        {title || 'Employee Name'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="left">
                        {description || 'information'}
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default EmployeeCard;
