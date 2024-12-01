import { Stack } from '@mui/material';

import HomeContentCostSummary from '../HomeContentCostSummary';
import HomeContentAssetSummary from '../HomeContentAssetSummary';

export default function HomeContentCardItem({ assets, categories, maintenancePlans }) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={5} useFlexGap flexWrap="wrap">
      <HomeContentCostSummary assets={assets} />
      <HomeContentAssetSummary assets={assets} categories={categories} maintenancePlans={maintenancePlans} />
    </Stack>
  );
}
