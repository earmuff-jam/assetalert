import { Box, Paper } from '@mui/material';

import RowHeader from '../../../common/RowHeader';
import BarChart from '../../../common/Chart/BarChart';
import { useTheme } from '@emotion/react';

export default function CategoryItemDetailsGraph({ itemsInCategory }) {
  const theme = useTheme();
  return (
    <Paper elevation={1} sx={{ padding: '1rem' }}>
      <RowHeader title="Graph" caption="Graph details for last 10 recently updated" />
      <Box sx={{ position: 'relative', width: 'calc(100% - 1rem)' }}>
        <BarChart
          legendLabel="Name / Cost"
          data={
            itemsInCategory
              ?.filter((_, index) => index < 10)
              ?.map((v, index) => ({
                label: v.name,
                count: v.price,
                color: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'][index % 2],
              })) || []
          }
          backgroundColor={[theme.palette.primary.light, theme.palette.secondary.main]}
        />
      </Box>
    </Paper>
  );
}
