import { generateWeekDates } from '../../../../../utils';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import { useSchedule } from '../../../../../context/ScheduleContext';
import dayjs from 'dayjs';
import {
    Button,
    Box,
} from '@mui/material';

function PickerButton(props) {
    const {
        setOpen,
        label,
        id,
        disabled,
        InputProps: { ref } = {},
        inputProps: { 'aria-label': ariaLabel } = {},
    } = props;

    const { viewMode } = useSchedule();
    let startOfWeek = '';
    let endOfWeek = '';
    let month = '';
    let year = '';
    if (viewMode === 'week') {
        startOfWeek = generateWeekDates(label)[0].format('MMM D, YYYY');
        endOfWeek = generateWeekDates(label)[6].format('MMM D, YYYY');
    }
    else {
        month = dayjs(label).format('MMMM');
        year = dayjs(label).format('YYYY');
    }
    return (
        <Button
            id={id}
            disabled={disabled}
            ref={ref}
            aria-label={ariaLabel}
            onClick={() => setOpen?.((prev) => !prev)}
            sx={{
                width: viewMode === 'week' ? '300px' : '200px',
                fontSize: '14px',
                color: 'primary.main',
                bgcolor: '#15181b',
                borderRadius: '4px',
                borderColor: '#20242a',
                '&:hover': {
                    borderColor: '#303840',
                    color: '#0077e5',
                },
            }}
        >
            {label ? (
                viewMode === 'week' ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                            <DateRangeRoundedIcon sx={{ color: 'secondary.main' }} />
                            {startOfWeek}
                            <ArrowForwardIcon sx={{ color: 'secondary.main' }} /> {endOfWeek}
                        </Box>
                    </>
                ) : (
                    <>
                        <DateRangeRoundedIcon sx={{ color: 'secondary.main' }} /> {month}   {year}
                    </>
                )
            ) : (
                'Pick a date'
            )}
        </Button>
    );
}

export default PickerButton;
