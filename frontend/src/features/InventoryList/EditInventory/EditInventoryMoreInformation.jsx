import { Checkbox, FormControlLabel, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { BookmarkAddedRounded, CloseRounded, NoteAddRounded, SwapHorizRounded } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function EditInventoryMoreInformation({
  formData,
  returnDateTime,
  setReturnDateTime,
  openReturnNote,
  setOpenReturnNotes,
  handleCheckbox,
  handleInputChange,
}) {
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.is_bookmarked.value}
              onChange={(e) => handleCheckbox('is_bookmarked', e.target.checked)}
              color="primary"
            />
          }
          label={
            <Stack direction="row" alignItems="center">
              <BookmarkAddedRounded color={formData.is_bookmarked.value ? 'primary' : 'secondary'} />
              <Typography variant="caption">Bookmarked</Typography>
            </Stack>
          }
        />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.is_returnable.value}
              onChange={(e) => handleCheckbox('is_returnable', e.target.checked)}
              color="primary"
            />
          }
          label={
            <Stack direction="row" alignItems="center">
              <SwapHorizRounded color={formData.is_returnable.value ? 'primary' : 'secondary'} />
              <Typography variant="caption">Returnable</Typography>
            </Stack>
          }
        />
        {formData.is_returnable.value && (
          <Stack
            direction="column"
            spacing={2}
            justifyContent="space-between"
            border={`0.1rem solid black`}
            padding="1rem"
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">Return Information</Typography>
              {!openReturnNote ? (
                <Tooltip title="Add note">
                  <IconButton size="small" onClick={() => setOpenReturnNotes(!openReturnNote)}>
                    <NoteAddRounded fontSize="small" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Close note">
                  <IconButton size="small" onClick={() => setOpenReturnNotes(!openReturnNote)}>
                    <CloseRounded fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
            {Object.values(formData)
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
              ))}
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
            {openReturnNote && (
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
            )}
          </Stack>
        )}
      </Stack>
    </>
  );
}
