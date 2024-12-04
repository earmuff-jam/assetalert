import { Stack } from '@mui/material';
import TextFieldWithLabel from '@common/TextFieldWithLabel/TextFieldWithLabel';

export default function MaintenancePlanAddFormLimit({ formFields, handleInputChange }) {
  return (
    <Stack direction="row" spacing={2}>
      <TextFieldWithLabel
        flexGrow={1}
        id={formFields.min_items_limit.name}
        name={formFields.min_items_limit.name}
        label={formFields.min_items_limit.label}
        value={formFields.min_items_limit.value}
        size={formFields.min_items_limit.size}
        placeholder={formFields.min_items_limit.placeholder}
        onChange={handleInputChange}
        required={formFields.min_items_limit.required}
        fullWidth={formFields.min_items_limit.fullWidth}
        error={Boolean(formFields.min_items_limit.errorMsg)}
        helperText={formFields.min_items_limit.errorMsg}
        variant={formFields.min_items_limit.variant}
      />
      <TextFieldWithLabel
        id={formFields.max_items_limit.name}
        name={formFields.max_items_limit.name}
        label={formFields.max_items_limit.label}
        value={formFields.max_items_limit.value}
        size={formFields.max_items_limit.size}
        placeholder={formFields.max_items_limit.placeholder}
        onChange={handleInputChange}
        required={formFields.max_items_limit.required}
        fullWidth={formFields.max_items_limit.fullWidth}
        error={Boolean(formFields.max_items_limit.errorMsg)}
        helperText={formFields.max_items_limit.errorMsg}
        variant={formFields.max_items_limit.variant}
      />
    </Stack>
  );
}
