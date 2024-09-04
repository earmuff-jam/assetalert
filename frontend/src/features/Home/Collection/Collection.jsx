import { Box, Typography } from '@mui/material';
import LearnMore from './LearnMore';

const Collection = ({ title, items }) => {
  return (
    <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
        <LearnMore items={items}/>
    </Box>
  );
};

export default Collection;
