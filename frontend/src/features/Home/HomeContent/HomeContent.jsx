import { Card, CardContent, Stack, Typography } from '@mui/material';
import PieChart from '../../../common/Chart/PieChart';
import { prefix } from '../../../common/utils';

const RowItem = ({ label, color, dataValue }) => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing="2rem">
      <Typography color={color}>{label}</Typography>
      <Typography color={color}>{dataValue}</Typography>
    </Stack>
  );
};

export default function HomeContent({ assets = [], categories = [], maintenancePlans = [] }) {
  const zeroCostItems = assets.filter((v) => v.price === 0);
  const totalAssetCosts = assets.reduce((acc, el) => {
    acc += el?.price || 0;
    return acc;
  }, 0);

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" spacing="2rem" useFlexGap flexWrap="wrap">
          <Stack spacing="2rem">
            <Typography variant="h5">Cost Summary</Typography>
            <RowItem label="Total estimated cost" color="text.secondary" dataValue={prefix('$', totalAssetCosts)} />
            <RowItem label="Unestimated" color="text.secondary" dataValue={`${zeroCostItems.length || 0} items`} />
          </Stack>
          <Stack>
            <Typography variant="RowItem" gutterBottom>
              Asset Breakdown
            </Typography>
            <Stack direction="row" spacing="2rem" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
              <Stack spacing="2rem" justifyContent="space-evenly">
                <RowItem label="Categories" color="text.secondary" dataValue={categories.length || 0} />
                <RowItem label="Plans" color="text.secondary" dataValue={maintenancePlans.length || 0} />
                <RowItem label="Assets" color="text.secondary" dataValue={assets.length || 0} />
              </Stack>
              <Stack direction="row" spacing="2rem">
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
        </Stack>
      </CardContent>
    </Card>
  );
}
