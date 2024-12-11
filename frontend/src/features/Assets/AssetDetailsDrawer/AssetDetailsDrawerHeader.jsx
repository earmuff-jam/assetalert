import { CloseRounded } from '@mui/icons-material';
import { DialogTitle, IconButton, Stack } from '@mui/material';

export default function AssetDetailsDrawerHeader({ title, resetSelection }) {
  return (
    <DialogTitle>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {title}
        <IconButton aria-label="close" onClick={resetSelection} color="error">
          <CloseRounded />
        </IconButton>
      </Stack>
    </DialogTitle>
  );
}
