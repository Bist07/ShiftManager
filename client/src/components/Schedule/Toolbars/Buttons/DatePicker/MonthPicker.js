import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSchedule } from '../../../../../context/ScheduleContext';
import PickerButton from './PickerButton';

export default function MonthPicker(props) {
    const [open, setOpen] = React.useState(false);
    const { selectedMonth, setSelectedMonth, setSelectedYear, date } = useSchedule();

    const handleChange = (value) => {
        setSelectedMonth(value);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={date}
                open={open}
                views={['month']}
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