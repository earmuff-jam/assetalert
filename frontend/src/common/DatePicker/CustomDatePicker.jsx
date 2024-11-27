import { Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';

export default function CustomDatePicker({ label, completionDate, setCompletionDate }) {
  return (
    <>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disablePast
          value={completionDate}
          onChange={setCompletionDate}
          slotProps={{
            textField: {
              size: 'small',
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
}
