import { Box, Stack, Typography } from '@mui/material';

export const FooterItemWrapper = ({ title, children }) => {
  return (
    <Box>
      <Typography variant="h6">{title}</Typography>
      <Stack spacing="1rem">{children}</Stack>
    </Box>
  );
};
