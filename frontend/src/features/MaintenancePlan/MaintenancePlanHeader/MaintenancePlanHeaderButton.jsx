import { Button, IconButton, Stack } from '@mui/material';
import { AddRounded, FileDownload } from '@mui/icons-material';

export default function MaintenancePlanHeaderButton({ handleButtonClick, handleIconButtonClick }) {
  return (
    <Stack direction="row" spacing={1}>
      <Button onClick={handleButtonClick} startIcon={<AddRounded />} variant="outlined">
        Add Plan
      </Button>
      <IconButton size="small" onClick={handleIconButtonClick}>
        <FileDownload fontSize="small" />
      </IconButton>
    </Stack>
  );
}
