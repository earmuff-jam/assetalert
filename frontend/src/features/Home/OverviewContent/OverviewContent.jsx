import { Stack } from '@mui/material';
import OverviewContentSummary from '@features/Home/OverviewContent/OverviewContentSummary';
import OverviewContentAssetBreakdown from '@features/Home/OverviewContent/OverviewContentAssetBreakdown';
import OverviewContentAssetGraph from '@features/Home/OverviewContent/OverviewContentAssetGraph';

export default function OverviewContent({ assets = [], categories = [], maintenancePlans = [] }) {
  return (
    <Stack spacing={2}>
      <OverviewContentSummary assets={assets} />
      <OverviewContentAssetBreakdown assets={assets} categories={categories} maintenancePlans={maintenancePlans} />
      <OverviewContentAssetGraph assets={assets} categories={categories} maintenancePlans={maintenancePlans} />
    </Stack>
  );
}
