import { Stack } from '@mui/material';
import { BookmarkAddedRounded, SwapHorizRounded } from '@mui/icons-material';
import TextFieldWithLabel from '@common/TextFieldWithLabel/TextFieldWithLabel';
import SelectedAssetMoreInformationCheckbox from '@features/SelectedAsset/SelectedAssetMoreInformationCheckbox';
import SelectedAssetReturnInformationContent from '@features/SelectedAsset/SelectedAssetReturnInformationContent';

export default function SelectedAssetMoreInformation({
  formFields,
  returnDateTime,
  setReturnDateTime,
  openReturnNote,
  setOpenReturnNote,
  handleCheckbox,
  handleInputChange,
}) {
  const isReturnable = Boolean(formFields.is_returnable.value);
  const isBookmarked = Boolean(formFields.is_bookmarked.value);

  return (
    <Stack spacing={2}>
      <SelectedAssetMoreInformationCheckbox
        isChecked={isBookmarked}
        handleCheckbox={handleCheckbox}
        target="is_bookmarked"
        label="Bookmark"
        icon={<BookmarkAddedRounded color={isBookmarked ? 'primary' : 'secondary'} />}
      />
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <SelectedAssetMoreInformationCheckbox
          isChecked={isReturnable}
          handleCheckbox={handleCheckbox}
          target="is_returnable"
          label="Returnable"
          icon={<SwapHorizRounded color={isReturnable ? 'primary' : 'secondary'} />}
        />
        {isReturnable && (
          <SelectedAssetReturnInformationContent
            openReturnNote={openReturnNote}
            setOpenReturnNote={setOpenReturnNote}
            formFields={formFields}
            returnDateTime={returnDateTime}
            setReturnDateTime={setReturnDateTime}
            handleInputChange={handleInputChange}
          />
        )}
      </Stack>
      {openReturnNote && (
        <TextFieldWithLabel
          id={formFields.return_notes.name}
          name={formFields.return_notes.name}
          label={formFields.return_notes.label}
          value={formFields.return_notes.value}
          size={formFields.return_notes.size}
          placeholder={formFields.return_notes.placeholder}
          handleChange={handleInputChange}
          required={formFields.return_notes.required}
          fullWidth={formFields.return_notes.fullWidth}
          error={Boolean(formFields.return_notes.errorMsg)}
          helperText={formFields.return_notes.errorMsg}
          variant={formFields.return_notes.variant}
          multiline
          rows={4}
        />
      )}
    </Stack>
  );
}
