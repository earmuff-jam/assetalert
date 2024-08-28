import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  createFilterOptions,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { BookmarkRounded, CheckRounded, RestartAltRounded, SwapHorizRounded } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const filter = createFilterOptions();

export default function AddInventoryForm({
  stepNumber,
  formData,
  storageLocation,
  setStorageLocation,
  handleInputChange,
  handleCheckbox,
  handleReset,
  handleSubmit,
  options,
  returnDateTime,
  setReturnDateTime,
}) {
  switch (stepNumber) {
    case 1:
      return (
        <Stack alignItems="center">
          <Box component="form" sx={{ maxWidth: 600, width: '100%' }}>
            <Stack spacing={2} useFlexGap>
              <Stack direction="row" spacing={2} useFlexGap>
                <TextField
                  id="name"
                  label="Item name"
                  value={formData.name.value}
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
        </Stack>
      );
    case 2:
      return (
        <Stack alignItems="center">
          <Box component="form" sx={{ maxWidth: 600, width: '100%' }}>
            <Stack spacing={2} useFlexGap>
              <TextField
                id="price"
                label="Item price"
                value={formData.price.value}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={Boolean(formData.price['errorMsg'].length)}
                helperText={formData.price['errorMsg']}
              />
              <Stack direction="row" useFlexGap spacing={2}>
                <TextField
                  id="barcode"
                  label="Item Barcode"
                  value={formData.barcode.value}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(formData.barcode['errorMsg'].length)}
                  helperText={formData.barcode['errorMsg']}
                />
                <TextField
                  id="sku"
                  label="Item SKU"
                  value={formData.sku.value}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(formData.sku['errorMsg'].length)}
                  helperText={formData.sku['errorMsg']}
                />
              </Stack>

              <Stack direction="row" useFlexGap spacing={2}>
                <TextField
                  id="bought_at"
                  label="Place of purchase"
                  value={formData.bought_at.value}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(formData.bought_at['errorMsg'].length)}
                  helperText={formData.bought_at['errorMsg']}
                />
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
              </Stack>
              {formData.is_returnable.value ? (
                <Stack direction="row" useFlexGap spacing={2}>
                  <TextField
                    id="return_location"
                    label="Item return location"
                    value={formData.return_location.value}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(formData.return_location['errorMsg'].length)}
                    helperText={formData.return_location['errorMsg']}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      id="return_datetime"
                      label="Return datetime"
                      disablePast
                      value={returnDateTime}
                      onChange={setReturnDateTime}
                    />
                  </LocalizationProvider>
                </Stack>
              ) : null}
            </Stack>

            <Stack direction="row" useFlexGap spacing={2} sx={{ py: 2 }}>
              <TextField
                id="max_weight"
                label="Max weight in kg"
                value={formData.max_weight.value}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={Boolean(formData.max_weight['errorMsg'].length)}
                helperText={formData.max_weight['errorMsg']}
              />
              <TextField
                id="min_weight"
                label="Min weight in kg"
                value={formData.min_weight.value}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={Boolean(formData.min_weight['errorMsg'].length)}
                helperText={formData.min_weight['errorMsg']}
              />
            </Stack>
            <Stack direction="row" useFlexGap spacing={2}>
              <TextField
                id="max_height"
                label="Max height in inches"
                value={formData.max_height.value}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={Boolean(formData.max_height['errorMsg'].length)}
                helperText={formData.max_height['errorMsg']}
              />
              <TextField
                id="min_height"
                label="Min height in inches"
                value={formData.min_height.value}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={Boolean(formData.min_height['errorMsg'].length)}
                helperText={formData.min_height['errorMsg']}
              />
            </Stack>
          </Box>
        </Stack>
      );
    case 3:
      return (
        <>
          <Stack alignItems="center">
            <Card sx={{ display: 'flex', width: '100%', maxWidth: '600px' }}>
              <CardContent>
                <Stack direction="row">
                  <IconButton disabled>
                    <BookmarkRounded color={formData.is_bookmarked.value ? 'primary' : 'secondary'} />
                  </IconButton>
                  <Stack>
                    <Typography variant="h6">{formData.name.value}</Typography>
                    <Typography variant="caption">{formData.description.value}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontWeight="bold">Qty: </Typography>
                      <Typography variant="caption">{formData.quantity.value} item</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <CardActions>
                  <Button startIcon={<RestartAltRounded />} onClick={handleReset}>
                    Reset
                  </Button>
                  <Button startIcon={<CheckRounded />} onClick={handleSubmit}>
                    Submit
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Stack>
        </>
      );
    default:
      return null;
  }
}
