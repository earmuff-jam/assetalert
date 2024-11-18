import { SwapHorizRounded } from '@mui/icons-material';
import { Box, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';

export default function AddInventoryFormItemDetails({
  formData,
  handleInputChange,
  handleCheckbox,
  returnDateTime,
  setReturnDateTime,
}) {
  return (
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
  );
}
