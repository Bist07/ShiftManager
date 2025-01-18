import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const EmployeeCard = ({ title, description, image }) => {

    function stringToColor(name) {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash); // Hash function
        }

        // Generate a color from the hash
        const color = `#${(hash & 0xffffff).toString(16).padStart(6, '0')}`;
        return color;
    }

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
                    sx={{ bgcolor: stringToColor(title), marginLeft: 2 }}
                    alt={title}
                    src="/broken-image.jpg"
                />


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
