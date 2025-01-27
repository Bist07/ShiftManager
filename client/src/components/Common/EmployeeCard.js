import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

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

                <Avatar
                    sx={{ marginLeft: 2, height: '36px', width: '36px' }}
                    alt={title}
                    src="/broken-image.jpg"
                />


                {/* Right: Title and Additional Content */}
                <Box sx={{ flex: 1 }}>
                    <Typography sx={{ textAlign: "left", fontSize: '16px', fontWeight: 400 }}>
                        {title || 'Employee Name'}
                    </Typography>
                    <Typography sx={{ textAlign: "left", fontSize: '10px', fontWeight: 500, color: 'text.secondary' }}>
                        {description || 'information'}
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default EmployeeCard;
