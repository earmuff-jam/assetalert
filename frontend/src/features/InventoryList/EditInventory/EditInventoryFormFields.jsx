import { Autocomplete, Stack, TextField, createFilterOptions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { inventoryActions } from '../inventorySlice';

const filter = createFilterOptions();

export default function EditInventoryFormFields({
  formData,
  handleInputChange,
  options,
  storageLocation,
  setStorageLocation,
}) {
  const dispatch = useDispatch();
  return (
    <Stack spacing={2} marginTop={'1rem'}>
      <Stack direction="column" spacing={2} flexGrow={1}>
        {Object.values(formData)
          .filter((v, index) => index < 2)
          .map((v) => (
            <TextField
              key={v.id}
              id={v.id}
              label={v.label}
              value={v.value}
              required={v.isRequired}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              error={!!v.errorMsg}
              helperText={v.errorMsg}
              multiline={v.id === 'description'}
              rows={v.id === 'description' ? 4 : null}
            />
          ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        {Object.values(formData)
          .filter((v, index) => index >= 2 && index < 5)
          .map((v) => (
            <TextField
              key={v.id}
              id={v.id}
              label={v.label}
              value={v.value}
              required={v.isRequired}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              error={!!v.errorMsg}
              helperText={v.errorMsg}
            />
          ))}
      </Stack>

      <Stack direction="row" spacing={2}>
        {/* Ignore autocomplete for its own row */}
        {Object.values(formData)
          .filter((v, index) => index >= 5 && index < 7)
          .map((v) => (
            <TextField
              key={v.id}
              id={v.id}
              label={v.label}
              value={v.value}
              required={v.isRequired}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              error={!!v.errorMsg}
              helperText={v.errorMsg}
            />
          ))}
      </Stack>

      <Autocomplete
        fullWidth
        freeSolo
        forcePopupIcon
        value={storageLocation || ''}
        onOpen={() => dispatch(inventoryActions.getStorageLocations())}
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
        options={options || []}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.location || '';
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.location}>
            {option.location}
          </li>
        )}
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
    </Stack>
  );
}
