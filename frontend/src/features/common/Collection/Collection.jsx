import { Box, Typography } from '@mui/material';
import LearnMore from './LearnMore';

const Collection = ({ title }) => {
  return (
    <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
        <LearnMore />
    </Box>
  );
};

export default Collection;
