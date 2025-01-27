import * as React from 'react';
import { Card, CardActionArea, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddShiftCard = ({ shift, onClick }) => {
    return (
        <Card
            sx={{
                width: '100%',
                borderRadius: '2px',
                border: '2px solid #a0afbe',
                backgroundColor: 'transparent',
                margin: 0,
                minWidth: '150px',
                maxHeight: '60px',
                minHeight: '41px',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                opacity: 0, // Start with reduced opacity
                '&:hover': {
                    opacity: 1, // Full opacity on hover
                    backgroundColor: 'transparent',
                },

            }}>
            <CardActionArea disableRipple
                disableFocusRipple>
                <CardContent sx={{ padding: 0.5, width: '100%' }}>
                    <AddIcon sx={{ color: "#a0afbe" }} />
                </CardContent>
            </CardActionArea>
        </Card >
    );
};

export default AddShiftCard;
