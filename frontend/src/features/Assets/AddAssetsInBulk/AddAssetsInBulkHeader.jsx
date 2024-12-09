import * as XLSX from 'xlsx';

import { Stack, Typography } from '@mui/material';
import { DownloadRounded } from '@mui/icons-material';

export default function AddAssetsInBulkHeader() {
  const downloadBulkUploadTemplate = () => {
    const templatedData = [
      {
        name: '',
        description: '',
        price: '',
        quantity: '',
        is_bookmarked: '',
        location: '',
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templatedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'inventories');
    XLSX.writeFile(wb, 'inventory-template.xlsx');
  };

  return (
    <Stack paddingBottom="2rem">
      <Typography fontWeight="bold">Upload inventory items in bulk</Typography>
      <Stack direction="column">
        <Stack direction="row" sx={{ cursor: 'pointer', alignItems: 'flex-end' }} onClick={downloadBulkUploadTemplate}>
          <DownloadRounded color="primary" />
          <Typography variant="caption" color="text.secondary">
            Download template for inventory items.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
