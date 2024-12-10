import { IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { BookmarkAddedRounded, CloseRounded, NoteAddRounded, SwapHorizRounded } from '@mui/icons-material';
import SelectedAssetMoreInfoCheckbox from '@features/SelectedAsset/SelectedAssetMoreInformationCheckbox';
import SelectedAssetReturnInformationHeader from '@features/SelectedAsset/SelectedAssetReturnInformationHeader';
import SelectedAssetReturnInformationContent from '@features/SelectedAsset/SelectedAssetReturnInformationContent';

export default function SelectedAssetMoreInformation({
  formData,
  returnDateTime,
  setReturnDateTime,
  openReturnNote,
  setOpenReturnNotes,
  handleCheckbox,
  handleInputChange,
}) {
  return (
    <Stack spacing={1}>
      <SelectedAssetMoreInfoCheckbox
        isChecked={formData.is_bookmarked.value}
        handleCheckbox={handleCheckbox}
        target="is_bookmarked"
        label="Bookmark"
        icon={<BookmarkAddedRounded color={formData.is_bookmarked.value ? 'primary' : 'secondary'} />}
      />
      <Stack spacing={2} justifyContent="space-between">
        <SelectedAssetMoreInfoCheckbox
          isChecked={formData.is_returnable.value}
          handleCheckbox={handleCheckbox}
          target="is_returnable"
          label="Returnable"
          icon={<SwapHorizRounded color={formData.is_returnable.value ? 'primary' : 'secondary'} />}
        />
        <SelectedAssetReturnInformationHeader
          openReturnNote={openReturnNote}
          setOpenReturnNotes={setOpenReturnNotes}
          display={Boolean(formData.is_returnable.value)}
        />
        <SelectedAssetReturnInformationContent
          openNote={openReturnNote}
          formFields={formData}
          returnDateTime={returnDateTime}
          setReturnDateTime={setReturnDateTime}
          handleInputChange={handleInputChange}
        />
        {/* {formData.is_returnable.value && (
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
          )} */}
      </Stack>
    </Stack>
  );
}
