import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSchedule } from '../../../../../context/ScheduleContext';
import PickerButton from './PickerButton';
import dayjs from 'dayjs';

export default function MonthPicker(props) {
    const [open, setOpen] = React.useState(false);
    const { selectedMonth, setSelectedMonth, setSelectedYear, date, setDate } = useSchedule();

    const handleChange = (value) => {
        setDate(value)
        setSelectedMonth(value.format('M') - 1);
        setSelectedYear(value.format('YYYY'))
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={date}
                open={open}
                views={["year", "month"]}
                openTo="month"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                value={date}
                onChange={(newValue) => handleChange(newValue)}
                {...props}
                slots={{ ...props.slots, textField: PickerButton }}
                slotProps={{
                    ...props.slotProps,
                    field: { setOpen },
                    actionBar: {
                        actions: ['today'],
                    },
                }
                }
            />

        </LocalizationProvider>
    );
}