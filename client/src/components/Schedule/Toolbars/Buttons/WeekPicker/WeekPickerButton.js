import { generateWeekDates } from '../../../../../utils';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';

function WeekPickerButton(props) {
    const {
        setOpen,
        label,
        id,
        disabled,
        InputProps: { ref } = {},
        inputProps: { 'aria-label': ariaLabel } = {},
    } = props;

    const startOfWeek = generateWeekDates(label)[0].format('MMM D, YYYY');
    const endOfWeek = generateWeekDates(label)[generateWeekDates(label).length - 1].format('MMM D, YYYY');

    return (
        <Button
            id={id}
            disabled={disabled}
            ref={ref}
            aria-label={ariaLabel}
            onClick={() => setOpen?.((prev) => !prev)}
            sx={{
                fontSize: '14px',
                color: 'primary.main',
                bgcolor: '#15181b',
                borderRadius: '4px',
                borderColor: '#20242a',
                '&:hover ': {
                    borderColor: '#303840',
                    color: '#0077e5',
                },
            }}
        >
            {label ? (
                <>
                    <DateRangeRoundedIcon
                        sx={{
                            color: 'secondary.main',
                        }} /> {startOfWeek}
                    <ArrowForwardIcon
                        sx={{
                            color: 'secondary.main',
                        }} /> {endOfWeek}
                </>
            ) : (
                'Pick a date'
            )}

        </Button>
    );
}

export default WeekPickerButton;