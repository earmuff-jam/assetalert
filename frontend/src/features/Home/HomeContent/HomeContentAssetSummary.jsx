import { Stack, Typography } from '@mui/material';
import HomeContentCardRowItem from './HomeContentCardRowItem';
import PieChart from '../../../common/Chart/PieChart';

export default function HomeContentAssetSummary({ categories, maintenancePlans, assets }) {
  return (
    <Stack>
      <Typography variant="h5">Asset Breakdown</Typography>
      <Stack direction="row" spacing={1} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <Stack spacing={1} justifyContent="space-evenly">
          <HomeContentCardRowItem label="Categories" color="text.secondary" dataValue={categories.length || 0} />
          <HomeContentCardRowItem label="Plans" color="text.secondary" dataValue={maintenancePlans.length || 0} />
          <HomeContentCardRowItem label="Assets" color="text.secondary" dataValue={assets.length || 0} />
        </Stack>
        <Stack direction="row" spacing={1}>
          <PieChart
            height="15rem"
            legendLabel="assets summary"
            data={[categories, maintenancePlans, assets].map((v, index) => ({
              label: ['Categories', 'Plans', 'Assets'][index],
              count: v.length,
              color: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(211, 211, 211)'][index],
            }))}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
