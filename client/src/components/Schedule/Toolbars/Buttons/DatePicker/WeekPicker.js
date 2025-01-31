import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSchedule } from '../../../../../context/ScheduleContext';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';
import { generateWeekDates, isInSameWeek } from '../../../../../utils';
import CustomPickersDay from './Styles';
import PickerButton from './PickerButton';

dayjs.extend(isBetweenPlugin);

function Day(props) {
    const { day, selectedDay, hoveredDay, ...other } = props;
    return (
        <CustomPickersDay
            {...other}
            day={day}
            sx={{ px: 2.5 }}
            disableMargin
            selected={false}
            isSelected={isInSameWeek(day, selectedDay)}
            isHovered={isInSameWeek(day, hoveredDay)}
        />
    );
}

export default function WeekPicker(props) {
    const [open, setOpen] = React.useState(false);
    const [hoveredDay, setHoveredDay] = React.useState(null);
    const { setSelectedWeek, setDate, date } = useSchedule();

    const handleChange = (value) => {
        setSelectedWeek(generateWeekDates(value));
        setDate(value);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={date}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                value={date}
                onChange={(newValue) => handleChange(newValue)}
                showDaysOutsideCurrentMonth
                {...props}
                slots={{ ...props.slots, day: Day, textField: PickerButton }}
                slotProps={{
                    ...props.slotProps,
                    field: { setOpen },
                    actionBar: {
                        actions: ['today'],
                    },
                    day: (ownerState) => ({
                        selectedDay: date,
                        hoveredDay,
                        onPointerEnter: () => setHoveredDay(ownerState.day),
                        onPointerLeave: () => setHoveredDay(null),
                    }),
                }
                }
            />

        </LocalizationProvider>
    );
}