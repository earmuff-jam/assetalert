import { DownloadRounded } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

export default function AddAssetsInBulkActions({ handleFileChange, fileDetails, handleClick }) {
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          component="label"
          onClick={handleClick}
          startIcon={<DownloadRounded color="primary" />}
        >
          Download Template
        </Button>
        <Button
          variant="outlined"
          component="label"
          onChange={handleFileChange}
          disabled={Boolean(fileDetails?.name.length)}
        >
          Upload File
          <input type="file" hidden />
        </Button>
      </Stack>
      <Typography variant="caption">
        Use existing template from above to ensure all required headers are filled.
      </Typography>
    </>
  );
}
