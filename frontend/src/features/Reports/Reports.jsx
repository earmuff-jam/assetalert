import { Stack } from '@mui/material';
import HeaderWithButton from '../common/HeaderWithButton';
import ReportCardWrapper from './ReportCardWrapper';
import dayjs from 'dayjs';
import { TrendingUpRounded } from '@mui/icons-material';
import { capitalizeFirstLetter } from '../common/utils';
import ItemDetails from './ItemDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { inventoryActions } from '../InventoryList/inventorySlice';
import { maintenancePlanActions } from '../Maintenance/maintenanceSlice';
import DataTable from '../common/DataTable/DataTable';
import { ITEMS_IN_MAINTENANCE_PLAN_HEADER } from '../Maintenance/constants';

export default function Reports() {
  const dispatch = useDispatch();
  const { inventories, loading } = useSelector((state) => state.inventory);
  const { maintenancePlan: maintenancePlanList, loading: maintenancePlanListLoading } = useSelector(
    (state) => state.maintenance
  );

  const selectedAsset = inventories[0];
  const selectedMaintenancePlan = maintenancePlanList[0];

  useEffect(() => {
    if (!loading && inventories.length === 0) {
      dispatch(inventoryActions.getAllInventoriesForUser());
    }
  }, [loading, inventories.length]);

  useEffect(() => {
    if (!maintenancePlanListLoading && maintenancePlanList.length === 0) {
      dispatch(maintenancePlanActions.getPlans());
    }
  }, [maintenancePlanListLoading, maintenancePlanList.length]);

  return (
    <>
      <HeaderWithButton title="Reports Overview" />
      <Stack spacing="1rem">
        <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '1rem' }}>
          <ReportCardWrapper
            title="Valuation"
            chipLabel={dayjs().format('MMM')}
            value="$21.02"
            iconType={<TrendingUpRounded color="success" />}
            footerText="This month xx amount worth of items needs review"
          />
          <ReportCardWrapper
            title="Recent Category"
            chipLabel={dayjs().format('MMM')}
            value="$12.36"
            iconType={<TrendingUpRounded color="success" />}
          />
        </Stack>
        <Stack sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: '1rem' }}>
          <ReportCardWrapper title="Recently Added Asset">
            <ItemDetails
              loading={loading}
              avatarValue={selectedAsset && capitalizeFirstLetter(selectedAsset?.updater_name?.charAt(0))}
              label={selectedAsset?.name || ''}
              caption={selectedAsset?.description || ''}
            />
          </ReportCardWrapper>
          <ReportCardWrapper title="Maintenance due" chipLabel={dayjs().format('MMM')}>
            <ItemDetails
              loading={loading}
              avatarValue={
                selectedMaintenancePlan && capitalizeFirstLetter(selectedMaintenancePlan?.updator?.charAt(0))
              }
              label={selectedMaintenancePlan?.name || ''}
              caption={selectedMaintenancePlan?.description || ''}
            />
          </ReportCardWrapper>
        </Stack>
        <HeaderWithButton title="Asset Details" secondaryTitle="Asset movement for the current time range" />
        <DataTable
          rows={inventories}
          columns={ITEMS_IN_MAINTENANCE_PLAN_HEADER}
          subtitle={'Associate items into maintenance plan to begin.'}
        />
      </Stack>
    </>
  );
}
