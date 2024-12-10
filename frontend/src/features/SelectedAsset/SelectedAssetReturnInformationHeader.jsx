import { CloseRounded, NoteAddRounded } from '@mui/icons-material';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';

export default function SelectedAssetReturnInformationHeader({ display, openReturnNote, setOpenReturnNotes }) {
  return (
    display && (
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Return Information</Typography>
        {!openReturnNote ? (
          <Tooltip title="Add note">
            <IconButton size="small" onClick={() => setOpenReturnNotes(!openReturnNote)}>
              <NoteAddRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Close note">
            <IconButton size="small" onClick={() => setOpenReturnNotes(!openReturnNote)}>
              <CloseRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    )
  );
}
