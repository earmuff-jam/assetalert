import { Box } from '@mui/material';
import RowHeader from '@common/RowHeader';
import { useTheme } from '@emotion/react';
import BarChart from '@common/Chart/BarChart';
import { EmptyComponent } from '@common/utils';

export default function MaintenancePlanItemDetailsGraphContent({ totalItems = [] }) {
  const theme = useTheme();

  if (!totalItems || totalItems?.length <= 0) {
    return <EmptyComponent subtitle="Associate items to view chart." />;
  }
  return (
    <>
      <RowHeader title="Graph" caption="Graph details for last 10 recently updated" />
      <Box sx={{ position: 'relative', width: 'calc(100% - 1rem)' }}>
        <BarChart
          legendLabel="Name / Cost"
          data={
            totalItems
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
    </>
  );
}
