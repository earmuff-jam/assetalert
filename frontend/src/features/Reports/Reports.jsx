import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import { Stack } from '@mui/material';

import { FILTER_OPTIONS } from './constants';
import { reportActions } from './reportSlice';
import SimpleModal from '../../common/SimpleModal';
import FilterMenu from './ReportsFilterMenu/FilterMenu';
import ReportsHeader from './ReportHeader/ReportsHeader';
import ReportContent from './ReportContent/ReportContent';
import { inventoryActions } from '../InventoryList/inventorySlice';
import { maintenancePlanActions } from '../MaintenancePlanList/maintenanceSlice';

export default function Reports() {
  const dispatch = useDispatch();
  const { inventories = [], loading } = useSelector((state) => state.inventory);
  const { reports = [], loading: reportLoading } = useSelector((state) => state.reports);
  const { maintenancePlan: maintenancePlanList = [], loading: maintenancePlanListLoading } = useSelector(
    (state) => state.maintenance
  );

  const [selectedAsset, setSelectedAsset] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [includeOverdue, setIncludeOverdue] = useState(true);

  const [selectedMaintenancePlan, setSelectedMaintenancePlan] = useState([]);
  const [sinceValue, setSinceValue] = useState(FILTER_OPTIONS.find((item) => item.label === 'ytd').value);

  const downloadReports = () => {
    dispatch(reportActions.downloadReports({ since: sinceValue, includeOverdue: includeOverdue, inventories }));
  };

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
    dispatch(inventoryActions.getAllInventoriesForUser({ since: sinceValue }));
    dispatch(maintenancePlanActions.getPlans());
  }, []);

  useEffect(() => {
    if (!reportLoading && reports.length <= 0) {
      dispatch(reportActions.getReports({ since: dayjs().startOf('year').toISOString(), includeOverdue: true }));
    }
  }, [reportLoading]);

  return (
    <Stack spacing={1}>
      <ReportsHeader
        sinceValue={sinceValue}
        reports={reports}
        loading={loading}
        selectedAsset={selectedAsset}
        setDisplayModal={setDisplayModal}
        downloadReports={downloadReports}
        selectedMaintenancePlan={selectedMaintenancePlan}
      />
      <ReportContent sinceValue={sinceValue} inventories={inventories} />
      {displayModal && (
        <SimpleModal
          title="Filter results"
          subtitle="Select time range to filter the selected results for."
          handleClose={closeFilter}
          maxSize="xs"
        >
          <FilterMenu
            handleClose={closeFilter}
            sinceValue={sinceValue}
            setSinceValue={setSinceValue}
            includeOverdue={includeOverdue}
            setIncludeOverdue={setIncludeOverdue}
          />
        </SimpleModal>
      )}
    </Stack>
  );
}
