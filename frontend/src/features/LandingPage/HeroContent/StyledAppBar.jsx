import { Box, Paper, Stack, Typography } from '@mui/material';
import { BarChartRounded } from '@mui/icons-material';

const StyledAppBar = ({ title, titleVariant, elevation, children }) => {
  return (
    <Paper elevation={elevation} height="2rem">
      <Stack direction="row" spacing="1rem" padding="1.2rem" >
        <Typography variant={titleVariant} sx={{ fontFamily: 'Nunito', color: 'primary.main' }}>
          {title}
        </Typography>
        <BarChartRounded color="primary" fontSize="small" />
        <Box flexGrow="1"></Box>
        <Stack direction="row" spacing="1rem" alignItems="center" display="flex">
          {children}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default StyledAppBar;
