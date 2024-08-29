import { Card, CardContent, Divider, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { CategoryRounded, EngineeringRounded, WarningRounded } from '@mui/icons-material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assetSummaryActions } from './SummarySlice';
import PieChart from '../../util/Chart/PieChart';
import { prefix } from '../common/utils';

const Overview = () => {
  const dispatch = useDispatch();
  const { assetSummary = [], loading } = useSelector((state) => state.summary);

  const totalCategories = assetSummary.filter((v) => v.type.toUpperCase() === 'C');
  const totalMaintenancePlans = assetSummary.filter((v) => v.type.toUpperCase() === 'M');
  const totalAssets = assetSummary.filter((v) => v.type.toUpperCase() === 'A');
  const zeroCostItems = totalAssets.filter((v) => v.price === 0);
  const totalAssetCosts = totalAssets.reduce((acc, el) => {
    acc += el?.price || 0;
    return acc;
  }, 0);

  useEffect(() => {
    dispatch(assetSummaryActions.getAssetSummary());
  }, []);

  if (loading) {
    return <Skeleton height="50vh" />;
  }

  return (
    <>
      <Typography variant="h4">Overview</Typography>
      <Typography variant="caption">View summary details about your assets.</Typography>
      <Stack spacing={{ xs: 1 }}>
        <Typography variant="h5" gutterBottom>
          Asset Summary
        </Typography>
        <Stack direction="row" spacing={{ xs: 1 }} useFlexGap flexWrap="wrap">
          <CardItem>
            <ColumnItem
              label="under assigned maintenance plan"
              icon={<EngineeringRounded />}
              color="primary"
              dataLabel={0}
              loading={false}
            />
          </CardItem>
          <CardItem>
            <ColumnItem
              label="under assigned categories"
              icon={<CategoryRounded />}
              color="primary"
              dataLabel={0}
              loading={false}
            />
          </CardItem>
          <CardItem>
            <ColumnItem
              label="require attention"
              icon={<WarningRounded />}
              color="error"
              dataLabel={0}
              loading={false}
            />
          </CardItem>
        </Stack>
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" spacing="2rem" useFlexGap flexWrap="wrap">
              <Stack spacing="2rem">
                <Typography variant="h5">Cost Summary</Typography>
                <RowItem label="Total estimated cost" color="text.secondary" dataValue={prefix('$', totalAssetCosts)} />
                <RowItem
                  label="Unestimated assets"
                  color="text.secondary"
                  dataValue={prefix('$', zeroCostItems.length || 0)}
                />
              </Stack>
              <Stack>
                <Typography variant="h5" gutterBottom>
                  Asset Breakdown
                </Typography>
                <Stack direction="row" spacing="2rem" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                  <Stack spacing="2rem" justifyContent="space-evenly">
                    <RowItem label="Categories" color="text.secondary" dataValue={totalCategories.length || 0} />
                    <RowItem label="Plans" color="text.secondary" dataValue={totalMaintenancePlans.length || 0} />
                    <RowItem label="Assets" color="text.secondary" dataValue={totalAssets.length || 0} />
                  </Stack>
                  <Stack direction="row" spacing="2rem">
                    <PieChart
                      height="15rem"
                      legendLabel="assets summary"
                      data={[totalCategories, totalMaintenancePlans, totalAssets].map((v, index) => ({
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
      </Stack>
    </>
  );
};

const CardItem = ({ children }) => (
  <Card sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
    <CardContent>{children}</CardContent>
  </Card>
);

const RowItem = ({ label, color, dataValue }) => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing="2rem">
      <Typography color={color}>{label}</Typography>
      <Typography color={color}>{dataValue}</Typography>
    </Stack>
  );
};

const ColumnItem = ({ label, dataLabel, icon, color, loading }) => {
  if (loading) return <Skeleton height="1rem" />;
  return (
    <Stack>
      <Typography textAlign="center" variant="h4" color={color}>
        {dataLabel}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <IconButton disabled size="small">
          {icon}
        </IconButton>
        <Typography variant="caption" textAlign="center">
          item(s)
        </Typography>
      </Stack>
      <Typography>{label}</Typography>
    </Stack>
  );
};

export default Overview;
