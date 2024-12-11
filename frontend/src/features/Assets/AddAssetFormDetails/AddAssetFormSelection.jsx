import { Stack } from '@mui/material';
import AddAssetFormReview from '@features/Assets/AddAssetFormDetails/AddAssetFormReview';
import AddAssetFormDetails from '@features/Assets/AddAssetFormDetails/AddAssetFormDetails';
import AddAssetFormItemDetails from '@features/Assets/AddAssetFormDetails/AddAssetFormItemDetails';

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
          <AddAssetFormDetails
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
          <AddAssetFormItemDetails
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckbox={handleCheckbox}
            returnDateTime={returnDateTime}
            setReturnDateTime={setReturnDateTime}
          />
        </Stack>
      );
    case 3:
      return <AddAssetFormReview formData={formData} handleReset={handleReset} handleSubmit={handleSubmit} />;
    default:
      return null;
  }
}
