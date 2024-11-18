import { BookmarkRounded, CheckRounded, RestartAltRounded } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, IconButton, Stack, Typography } from '@mui/material';

export default function AddInventoryFormReview({ formData, handleReset, handleSubmit }) {
  return (
    <Stack alignItems="center">
      <Card sx={{ display: 'flex', width: '100%', maxWidth: '600px' }}>
        <CardContent>
          <Stack direction="row">
            <IconButton disabled>
              <BookmarkRounded color={formData.is_bookmarked.value ? 'primary' : 'secondary'} />
            </IconButton>
            <Stack>
              <Typography variant="h6">{formData.name.value}</Typography>
              <Typography variant="caption">{formData.description.value}</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography fontWeight="bold">Qty: </Typography>
                <Typography variant="caption">{formData.quantity.value} item</Typography>
              </Stack>
            </Stack>
          </Stack>
          <CardActions>
            <Button startIcon={<RestartAltRounded />} onClick={handleReset}>
              Reset
            </Button>
            <Button startIcon={<CheckRounded />} onClick={handleSubmit}>
              Submit
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Stack>
  );
}
