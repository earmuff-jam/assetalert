import { Box, Paper } from '@mui/material';

import RowHeader from '../../../common/RowHeader';
import BarChart from '../../../common/Chart/BarChart';

export default function MaintenancePlanItemDetailsGraph({ totalItems }) {
  return (
    <Paper elevation={1} sx={{ padding: '1rem' }}>
      <RowHeader title="Graph" caption="Graph details for last 10 recently updated" />
      <Box sx={{ position: 'relative', width: 'calc(100% - 1rem)' }}>
        <BarChart
          legendLabel="Name Vs Cost"
          data={
            totalItems
              ?.filter((_, index) => index < 10)
              ?.map((v, index) => ({
                label: v.name,
                count: v.price,
                color: ['rgb(54, 162, 235)', 'rgb(211, 211, 211)'][index % 2],
              })) || []
          }
          backgroundColor="rgba(75, 192, 192, 0.4)"
          borderColor="rgba(75, 192, 192, 1)"
        />
      </Box>
    </Paper>
  );
}
