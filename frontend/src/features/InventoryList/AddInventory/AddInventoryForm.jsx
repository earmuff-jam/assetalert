import { Stack } from '@mui/material';
import AddInventoryFormItemDetails from './AddInventoryFormDetails/AddInventoryFormItemDetails';
import AddInventoryFormDetails from './AddInventoryFormDetails/AddInventoryFormDetails';
import AddInventoryFormReview from './AddInventoryFormDetails/AddInventoryFormReview';

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
          <AddInventoryFormDetails
            formData={formData}
            options={options}
            storageLocation={storageLocation}
            setStorageLocation={setStorageLocation}
            handleInputChange={handleInputChange}
            handleCheckbox={handleCheckbox}
          />
        </Stack>
      );
    case 2:
      return (
        <Stack alignItems="center">
          <AddInventoryFormItemDetails
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckbox={handleCheckbox}
            returnDateTime={returnDateTime}
            setReturnDateTime={setReturnDateTime}
          />
        </Stack>
      );
    case 3:
      return <AddInventoryFormReview formData={formData} handleReset={handleReset} handleSubmit={handleSubmit} />;
    default:
      return null;
  }
}
