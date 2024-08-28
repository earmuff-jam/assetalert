import { Paper, Stack, Typography } from '@mui/material';
import { BarChartRounded } from '@mui/icons-material';

const StyledAppBar = ({ title, titleVariant, elevation }) => {
  return (
    <Paper elevation={elevation} height="2rem">
      <Stack direction="row" spacing="1rem" padding="1.2rem" marginBottom="1rem">
        <Typography variant={titleVariant} sx={{ fontFamily: 'Nunito', color: 'primary.main' }}>
          {title}
        </Typography>
        <BarChartRounded color="primary" fontSize="small" />
      </Stack>
    </Paper>
  );
};

export default StyledAppBar;
