import { Stack } from '@mui/material';
import RowHeader from '../common/RowHeader';
import ReportCardWrapper from './ReportCardWrapper';
import dayjs from 'dayjs';
import { FilterAltRounded, TrendingUpRounded } from '@mui/icons-material';
import { capitalizeFirstLetter } from '../common/utils';
import ItemDetails from './ItemDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { inventoryActions } from '../InventoryList/inventorySlice';
import { maintenancePlanActions } from '../Maintenance/maintenanceSlice';
import DataTable from '../common/DataTable/DataTable';
import { ITEMS_IN_MAINTENANCE_PLAN_HEADER } from '../Maintenance/constants';
import SimpleModal from '../common/SimpleModal';
import FilterMenu from './FilterMenu';

export default function Reports() {
  const dispatch = useDispatch();
  const { inventories = [], loading } = useSelector((state) => state.inventory);
  const { maintenancePlan: maintenancePlanList = [], loading: maintenancePlanListLoading } = useSelector(
    (state) => state.maintenance
  );

  const [selectedAsset, setSelectedAsset] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedMaintenancePlan, setSelectedMaintenancePlan] = useState([]);

  const handleFilter = () => setDisplayModal(true);
  const closeFilter = () => setDisplayModal(false);

  useEffect(() => {
    if (!loading && inventories.length > 0) {
      setSelectedAsset(inventories[0] || {});
    }
  }, [loading, inventories.length]);

  useEffect(() => {
    if (!maintenancePlanListLoading && maintenancePlanList.length > 0) {
      setSelectedMaintenancePlan(maintenancePlanList[0]);
    }
  }, [maintenancePlanListLoading, maintenancePlanList.length]);

  useEffect(() => {
    dispatch(inventoryActions.getAllInventoriesForUser());
    dispatch(maintenancePlanActions.getPlans());
  }, []);

  return (
    <>
      <RowHeader
        title="Reports Overview"
        caption="Displaying results for the current selected timeframe."
        primaryStartIcon={<FilterAltRounded />}
        primaryButtonTextLabel={'Filter results'}
        handleClickPrimaryButton={handleFilter}
      />
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
              avatarValue={
                Object.keys(selectedMaintenancePlan) > 0 &&
                capitalizeFirstLetter(selectedAsset?.updater_name?.charAt(0))
              }
              label={selectedAsset?.name || ''}
              caption={selectedAsset?.description || ''}
            />
          </ReportCardWrapper>
          <ReportCardWrapper title="Maintenance due" chipLabel={dayjs().format('MMM')}>
            <ItemDetails
              loading={loading}
              avatarValue={
                Object.keys(selectedMaintenancePlan) > 0 &&
                capitalizeFirstLetter(selectedMaintenancePlan?.updator?.charAt(0))
              }
              label={selectedMaintenancePlan?.name || ''}
              caption={selectedMaintenancePlan?.description || ''}
            />
          </ReportCardWrapper>
        </Stack>
        <RowHeader title="Asset Details" caption="Asset movement for the current time range" />
        <DataTable
          rows={inventories}
          columns={ITEMS_IN_MAINTENANCE_PLAN_HEADER}
          subtitle={'Associate items into maintenance plan to begin.'}
        />
      </Stack>
      {displayModal && (
        <SimpleModal
          title="Filter results"
          subtitle="Select time range to filter the selected results for."
          handleClose={closeFilter}
          maxSize="sm"
        >
          <FilterMenu handleClose={closeFilter}/>
        </SimpleModal>
      )}
    </>
  );
}
