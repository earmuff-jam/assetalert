import dayjs from 'dayjs';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Skeleton, Stack } from '@mui/material';

import RowHeader from '../../common/RowHeader';
import HomeHeader from './HomeHeader/HomeHeader';
import HomeContent from './HomeContent/HomeContent';
import { assetSummaryActions } from './SummarySlice';

const Overview = () => {
  const dispatch = useDispatch();
  const { assetSummary = [], loading } = useSelector((state) => state.summary);

  const assetsUnderCategories = assetSummary?.AssetSummaryList?.filter(
    (v) => v.type.toUpperCase() === 'C' && v.items[0] != ''
  );
  const assetsUnderMaintenancePlans = assetSummary?.AssetSummaryList?.filter(
    (v) => v.type.toUpperCase() === 'M' && v.items[0] != ''
  );
  const assetsPastDue = assetSummary?.AssetList?.reduce((acc, el) => {
    if (dayjs(el.returntime).isBefore(dayjs())) {
      acc.push(el.name);
    }
    return acc;
  }, []);

  useEffect(() => {
    dispatch(assetSummaryActions.getAssetSummary());
  }, []);

  if (loading) {
    return <Skeleton height="50vh" />;
  }

  return (
    <>
      <RowHeader title="Overview" caption="View summary details about your assets" />
      <Stack spacing={{ xs: 1 }}>
        <HomeHeader
          assetsUnderCategories={assetsUnderCategories}
          assetsUnderMaintenancePlans={assetsUnderMaintenancePlans}
          assetsPastDue={assetsPastDue}
        />
        <HomeContent
          assets={assetSummary?.AssetList}
          categories={assetSummary?.AssetSummaryList?.filter((v) => v.type.toUpperCase() === 'C')}
          maintenancePlans={assetSummary?.AssetSummaryList?.filter((v) => v.type.toUpperCase() === 'M')}
        />
      </Stack>
    </>
  );
};

export default Overview;
