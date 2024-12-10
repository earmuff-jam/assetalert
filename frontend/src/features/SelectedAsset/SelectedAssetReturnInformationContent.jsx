import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CloseRounded, NoteRounded } from '@mui/icons-material';
import { IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';

export default function SelectedAssetReturnInformationContent({
  formFields,
  handleInputChange,
  returnDateTime,
  setReturnDateTime,
  openReturnNote,
  setOpenReturnNote,
}) {
  return (
    <>
      <Stack flexGrow={1}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {formFields.return_location.label}
        </Typography>
        <TextField
          id={formFields.return_location.name}
          name={formFields.return_location.name}
          value={formFields.return_location.value}
          size={formFields.return_location.size}
          placeholder={formFields.return_location.placeholder}
          onChange={handleInputChange}
          required={formFields.return_location.required}
          fullWidth={formFields.return_location.fullWidth}
          error={Boolean(formFields.return_location.errorMsg)}
          helperText={formFields.return_location.errorMsg}
          variant={formFields.return_location.variant}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Add more information on return">
                  <IconButton size="small" onClick={() => setOpenReturnNote(!openReturnNote)}>
                    {!openReturnNote ? <NoteRounded /> : <CloseRounded />}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Return datetime
          </Typography>
          <DatePicker
            id="return_datetime"
            disablePast
            value={returnDateTime}
            onChange={setReturnDateTime}
            slotProps={{
              textField: {
                size: 'small',
              },
            }}
          />
        </LocalizationProvider>
      </Stack>
    </>
  );
}
