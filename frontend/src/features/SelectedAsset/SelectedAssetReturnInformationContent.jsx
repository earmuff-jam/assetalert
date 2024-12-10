import TextFieldWithLabel from '@common/TextFieldWithLabel/TextFieldWithLabel';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function SelectedAssetReturnInformationContent({
  formFields,
  handleInputChange,
  returnDateTime,
  setReturnDateTime,
  openNote,
}) {
  return (
    <>
      <TextFieldWithLabel
        id={formFields.return_location.name}
        name={formFields.return_location.name}
        label={formFields.return_location.label}
        value={formFields.return_location.value}
        size={formFields.return_location.size}
        placeholder={formFields.return_location.placeholder}
        onChange={handleInputChange}
        required={formFields.return_location.required}
        fullWidth={formFields.return_location.fullWidth}
        error={Boolean(formFields.return_location.errorMsg)}
        helperText={formFields.return_location.errorMsg}
        variant={formFields.return_location.variant}
      />
      {/* {Object.values(formData)
        .filter((v, index) => index === 10)
        .map((v) => (
          <TextField
            key={v.id}
            id={v.id}
            label={v.label}
            value={v.value}
            required={v.isRequired}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            error={!!v.errorMsg}
            helperText={v.errorMsg}
          />
        ))} */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          id="return_datetime"
          label="Return datetime"
          disablePast
          value={returnDateTime}
          onChange={setReturnDateTime}
          slotProps={{
            textField: {
              helperText: 'Estimated return date time',
              size: 'small',
            },
          }}
        />
      </LocalizationProvider>
      {/* {openNote && (
        <>
          {Object.values(formData)
            .filter((v, index) => index === 15)
            .map((v) => (
              <TextField
                key={v.id}
                id={v.id}
                label={v.label}
                value={v.value}
                required={v.isRequired}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                error={!!v.errorMsg}
                helperText={v.errorMsg}
                multiline
                rows={4}
              />
            ))}
        </>
      )} */}
    </>
  );
}
