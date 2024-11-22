import { InfoRounded } from '@mui/icons-material';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

export default function ImagePicker({ id, name, handleUpload }) {
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

  return (
    <Stack spacing="1rem">
      <Stack direction="row" spacing="0.2rem">
        <Tooltip title="Images should be less than 2mb and be of either png, jpg, jpeg or svg format">
          <InfoRounded sx={{ color: 'grey' }} fontSize="small" />
        </Tooltip>
        <Typography variant="caption">Select an image to associate with {name || ''}</Typography>
      </Stack>

      <input type="file" onChange={handleFileUpload} />
      <Button
        disabled={!selectedImage}
        onClick={() => {
          const imgFormData = new FormData();
          imgFormData.append('image', selectedImage);
          handleUpload(id, imgFormData);
        }}
      >
        Upload
      </Button>
    </Stack>
  );
}
