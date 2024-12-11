import * as XLSX from 'xlsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { SaveRounded } from '@mui/icons-material';
import { Box, Button, Input, Stack, Typography } from '@mui/material';
import { inventoryActions } from '@features/Assets/inventorySlice';

export default function AddAssetsInBulkContent({ handleClose }) {
  const dispatch = useDispatch();
  const [uploadedFileInJson, setUploadedFileInJson] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const formattedArr = XLSX.utils.sheet_to_json(worksheet, {
          rawNumbers: true,
        });
        setUploadedFileInJson(formattedArr);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const resetData = () => {
    setUploadedFileInJson(null);
    handleClose();
  };

  const submit = () => {
    if (Array.isArray(uploadedFileInJson) && uploadedFileInJson.length > 0) {
      dispatch(inventoryActions.addBulkInventory(uploadedFileInJson));
    }
    resetData();
  };
  return (
    <Stack alignItems="center">
      <Box
        component="form"
        onSubmit={submit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 600,
          width: '100%',
        }}
      >
        <Input type="file" onChange={handleFileChange} />
        <Typography variant="caption">
          Use existing template from above to ensure all required headers are filled.
        </Typography>
      </Box>
      <Stack direction="row" spacing={2} alignSelf="flex-start">
        <Button variant="outlined" startIcon={<SaveRounded />} onClick={submit}>
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
