import { InfoRounded } from '@mui/icons-material';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { inventoryActions } from '../../InventoryList/inventorySlice';
import { enqueueSnackbar } from 'notistack';

export default function ImagePicker({ selectedData = {}, handleClose }) {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const imageType = file.type.includes('image');
    if (sizeInMB > 2.0 || !imageType) {
      enqueueSnackbar('Image is not valid or exceeds 2mb size limit.', {
        variant: 'error',
      });
      return;
    } else {
      setSelectedImage(file);
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    dispatch(inventoryActions.createInventoryImage({ assetID: selectedData.id, imageData: formData }));
    handleClose();
  };

  return (
    <Stack spacing="1rem">
      <Stack direction="row" spacing="0.2rem">
        <Typography variant="caption">Select an image to associate with {selectedData.name || ''}</Typography>
        <Tooltip title="Images should be less than 2mb and be of either png, jpg, jpeg or svg format">
          <InfoRounded sx={{ color: 'grey' }} fontSize="small" />
        </Tooltip>
      </Stack>

      <input type="file" onChange={handleFileUpload} />
      <Button disabled={!selectedImage} onClick={handleUpload}>
        Upload
      </Button>
    </Stack>
  );
}
