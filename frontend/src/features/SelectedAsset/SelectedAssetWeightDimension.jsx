import { Stack } from '@mui/material';
import TextFieldWithLabel from '@common/TextFieldWithLabel/TextFieldWithLabel';

export default function SelectedAssetWeightDimension({ formFields, handleInputChange }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          id={formFields.max_weight.name}
          name={formFields.max_weight.name}
          label={formFields.max_weight.label}
          value={formFields.max_weight.value}
          size={formFields.max_weight.size}
          placeholder={formFields.max_weight.placeholder}
          handleChange={handleInputChange}
          required={formFields.max_weight.required}
          fullWidth={formFields.max_weight.fullWidth}
          error={Boolean(formFields.max_weight.errorMsg)}
          helperText={formFields.max_weight.errorMsg}
          variant={formFields.max_weight.variant}
        />
        <TextFieldWithLabel
          id={formFields.min_weight.name}
          name={formFields.min_weight.name}
          label={formFields.min_weight.label}
          value={formFields.min_weight.value}
          size={formFields.min_weight.size}
          placeholder={formFields.min_weight.placeholder}
          handleChange={handleInputChange}
          required={formFields.min_weight.required}
          fullWidth={formFields.min_weight.fullWidth}
          error={Boolean(formFields.min_weight.errorMsg)}
          helperText={formFields.min_weight.errorMsg}
          variant={formFields.min_weight.variant}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextFieldWithLabel
          id={formFields.max_height.name}
          name={formFields.max_height.name}
          label={formFields.max_height.label}
          value={formFields.max_height.value}
          size={formFields.max_height.size}
          placeholder={formFields.max_height.placeholder}
          handleChange={handleInputChange}
          required={formFields.max_height.required}
          fullWidth={formFields.max_height.fullWidth}
          error={Boolean(formFields.max_height.errorMsg)}
          helperText={formFields.max_height.errorMsg}
          variant={formFields.max_height.variant}
        />
        <TextFieldWithLabel
          id={formFields.min_height.name}
          name={formFields.min_height.name}
          label={formFields.min_height.label}
          value={formFields.min_height.value}
          size={formFields.min_height.size}
          placeholder={formFields.min_height.placeholder}
          handleChange={handleInputChange}
          required={formFields.min_height.required}
          fullWidth={formFields.min_height.fullWidth}
          error={Boolean(formFields.min_height.errorMsg)}
          helperText={formFields.min_height.errorMsg}
          variant={formFields.min_height.variant}
        />
      </Stack>
    </Stack>
  );
}
