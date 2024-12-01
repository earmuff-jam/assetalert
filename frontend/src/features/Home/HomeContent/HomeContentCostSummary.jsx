import { Stack, Typography } from '@mui/material';

import { prefix } from '../../../common/utils';
import HomeContentCardRowItem from './HomeContentCardRowItem';

export default function HomeContentCostSummary({ assets }) {
  const zeroCostItems = assets.filter((v) => v.price === 0);
  const totalAssetCosts = assets.reduce((acc, el) => {
    acc += el?.price || 0;
    return acc;
  }, 0);
  return (
    <Stack spacing={1}>
      <Typography variant="h5">Cost Summary</Typography>
      <HomeContentCardRowItem
        label="Total estimated cost"
        color="text.secondary"
        dataValue={prefix('$', totalAssetCosts)}
      />
      <HomeContentCardRowItem
        label="Unestimated"
        color="text.secondary"
        dataValue={`${zeroCostItems.length || 0} items`}
      />
    </Stack>
  );
}
