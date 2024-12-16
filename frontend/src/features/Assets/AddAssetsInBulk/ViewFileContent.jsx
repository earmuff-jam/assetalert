import { CancelRounded } from '@mui/icons-material';
import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';

import { formatDate, formatFileSize } from '@common/utils';

export default function ViewFileContent({
  showContent = false,
  name = '',
  lastModifiedDate = '',
  size = '',
  handleRemove,
}) {
  if (!showContent) return null;

  return (
    <Stack direction="row" spacing={1}>
      <Avatar sx={{ height: '10rem', width: '10rem' }} variant="square" src="/csv-icon.png" alt="File preview" />
      <Card sx={{ overflow: 'visible' }}>
        <Stack
          alignItems={'flex-end'}
          sx={{ position: 'relative', left: '8px', top: '-8px', cursor: 'pointer' }}
          onClick={handleRemove}
        >
          <CancelRounded fontSize="small" color="error" />
        </Stack>
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="caption">Filename: {name}</Typography>
            <Typography variant="caption">Last modified: {formatDate(lastModifiedDate, 'DD, MMM YYYY')}</Typography>
            <Typography variant="caption">Size: {formatFileSize(size)}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
