import { FormControl, Box, Typography } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import AddIcon from '@mui/icons-material/Add';
import TodayIcon from '@mui/icons-material/Today';
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
const iconMap = {
    Employee: PersonOutlineRoundedIcon,
    Position: AssignmentOutlinedIcon,
    Location: LocationOnOutlinedIcon,
    Repeat: EventRepeatIcon,
    Days: AddIcon,
    Time: AccessTimeRoundedIcon,
    Date: TodayIcon,
};


const DialogRow = ({ iconName, field }) => {

    const IconComponent = iconMap[iconName];
    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: "center", gap: 2, margin: 1, paddingLeft: 4, paddingRight: 2 }}>
                <Box sx={{ display: 'flex', alignItems: "center", width: "25%", gap: 2 }}>
                    {iconName &&
                        <>
                            <Typography sx={{ fontSize: '15px', fontWeight: 600, color: 'dialog.text', textAlign: 'right', width: '50%' }}>{iconName}</Typography>
                            <IconComponent sx={{
                                color: 'dialog.icon',
                                fontSize: '36px',
                                borderRadius: '50px',
                                border: '2px solid #9ca6b0',
                                borderColor: 'dialog.icon',
                                padding: 0.5,

                            }} />
                        </>
                    }
                </Box>
                <Box sx={{ display: 'flex', alignItems: "center", width: "75%" }}>
                    <FormControl fullWidth>
                        {field}
                    </FormControl>

                </Box>
            </Box>
        </div >
    );
};

export default DialogRow;
