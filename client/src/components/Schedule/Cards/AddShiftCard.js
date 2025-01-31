import * as React from 'react';
import { Card, CardActionArea, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddShiftCard = ({ shift, onClick }) => {
    return (
        <Card
            sx={{
                width: '100%',
                borderRadius: '2px',
                border: '2px solid #ccc',
                borderColor: 'secondary.main',
                backgroundColor: 'rgba(0,0,0,0)',
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
                    backgroundColor: 'rgba(0,0,0,0)',
                },

            }}>
            <CardActionArea disableRipple
                disableFocusRipple sx={{ backgroundColor: 'rgba(0,0,0,0)', }}>
                <CardContent sx={{ padding: 0.5, width: '100%', backgroundColor: 'rgba(0,0,0,0)', }}>
                    <AddIcon sx={{ color: "secondary.main" }} />
                </CardContent>
            </CardActionArea>
        </Card >
    );
};

export default AddShiftCard;
