import { useNavigate } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

export default function ItemCardTextContent({ uri, name, description }) {
  const navigate = useNavigate();

  return (
    <Stack width={'20rem'}>
      <Typography variant="h6" component="h3" onClick={() => navigate(uri)} sx={{ cursor: 'pointer' }}>
        {name}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
        }}
        noWrap
      >
        {description}
      </Typography>
    </Stack>
  );
}
