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
          categories={assetSummary?.AssetSummaryList?.filter((v) => v.type.toUpperCase() === 'C')}
          maintenancePlans={assetSummary?.AssetSummaryList?.filter((v) => v.type.toUpperCase() === 'M')}
          assets={assetSummary?.AssetList}
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
