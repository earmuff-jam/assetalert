import { Stack } from '@mui/material';
import AddInventoryFormReview from '@features/Assets/AddAssetFormDetails/AddInventoryFormReview';
import AddInventoryFormDetails from '@features/Assets/AddAssetFormDetails/AddInventoryFormDetails';
import AddInventoryFormItemDetails from '@features/Assets/AddAssetFormDetails/AddInventoryFormItemDetails';

export default function AddAssetFormSelection({
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
