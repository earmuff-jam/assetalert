import { BookmarkRounded } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Checkbox,
  createFilterOptions,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const filter = createFilterOptions();

export default function AddAssetFormDetails({
  formData,
  options,
  storageLocation,
  setStorageLocation,
  handleInputChange,
  handleCheckbox,
}) {
  return (
    <Box component="form" sx={{ maxWidth: 600, width: '100%' }}>
      <Stack spacing={2} useFlexGap>
        <Stack direction="row" spacing={2} useFlexGap>
          <TextField
            id="name"
            label="Item name"
            value={formData.name.value}
            placeholder={formData.name.placeholder}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            size="small"
            error={Boolean(formData.name['errorMsg'].length)}
            helperText={formData.name['errorMsg']}
          />
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
                <BookmarkRounded color={formData.is_bookmarked.value ? 'primary' : 'secondary'} />
                <Typography variant="caption">Bookmark</Typography>
              </Stack>
            }
          />
        </Stack>
        <TextField
          id="description"
          label="Description"
          value={formData.description.value}
          placeholder={formData.description.placeholder}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          size="small"
          error={Boolean(formData.description['errorMsg'].length)}
          helperText={formData.description['errorMsg']}
        />
      </Stack>
      <Stack direction="row" sx={{ py: 2 }} useFlexGap spacing={2}>
        <TextField
          id="quantity"
          label="Item quantity"
          value={formData.quantity.value}
          placeholder={formData.quantity.placeholder}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          size="small"
          error={Boolean(formData.quantity['errorMsg'].length)}
          helperText={formData.quantity['errorMsg']}
        />
      </Stack>
      <Autocomplete
        fullWidth
        freeSolo
        forcePopupIcon
        value={storageLocation?.location || ''}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setStorageLocation({
              location: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            setStorageLocation({
              location: newValue.inputValue,
            });
          } else {
            setStorageLocation(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.location);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              location: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="autocomplete-storage-location"
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.location;
        }}
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <li key={key} {...rest}>
              {option.location}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label="Storage Location"
            variant="standard"
            placeholder="Where do you plan to store this item"
          />
        )}
      />
    </Box>
  );
}
