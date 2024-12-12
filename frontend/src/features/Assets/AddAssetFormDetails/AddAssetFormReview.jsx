import { BookmarkRounded, CheckRounded, RestartAltRounded } from '@mui/icons-material';
import { Button, IconButton, Stack, Typography } from '@mui/material';

export default function AddAssetFormReview({ formData, handleReset, handleSubmit }) {
  return (
    <Stack alignItems="center">
      <Stack direction="row" alignSelf={'flex-start'}>
        <IconButton disabled>
          <BookmarkRounded color={formData.is_bookmarked.value ? 'primary' : 'secondary'} />
        </IconButton>
        <Stack spacing={1} justifyContent={'space-between'}>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Typography variant="subtitle2" color="text.secondary">
              {formData.name.label}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {formData.name.value}
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Typography variant="subtitle2" color="text.secondary">
              {formData.description.label}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {formData.description.value}
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Typography variant="subtitle2" color="text.secondary">
              {formData.quantity.label}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {formData.quantity.value}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={'row'} alignSelf={'flex-end'}>
        <Button startIcon={<RestartAltRounded />} onClick={handleReset}>
          Reset
        </Button>
        <Button startIcon={<CheckRounded />} onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
