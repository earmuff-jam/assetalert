import { Button, Stack, Typography } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

export default function NoteHeader({ handleClick }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Rough Notes
      </Typography>
      <Button startIcon={<AddRounded />} onClick={handleClick} variant="outlined">
        Add note
      </Button>
    </Stack>
  );
}
