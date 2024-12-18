import { Box, IconButton, Stack } from '@mui/material';

import { DeleteRounded, EditNoteRounded } from '@mui/icons-material';

export default function ItemCardButtons({ handleDelete, handleEdit, id }) {
  return (
    <Stack direction="row">
      <Box>
        <IconButton size="small" onClick={() => handleDelete(id)}>
          <DeleteRounded fontSize="small" sx={{ color: 'error.main' }} />
        </IconButton>
      </Box>
      <Box>
        <IconButton size="small" onClick={() => handleEdit(id)}>
          <EditNoteRounded fontSize="small" sx={{ color: 'primary.main' }} />
        </IconButton>
      </Box>
    </Stack>
  );
}
