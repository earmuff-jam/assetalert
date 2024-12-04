import { useDispatch } from 'react-redux';

import { Stack } from '@mui/material';

import RowHeader from '@common/RowHeader';
import FilterAndSortMenu from '@common/StatusOptions/FilterAndSortMenu';
import { maintenancePlanActions } from '@features/MaintenancePlan/maintenanceSlice';
import MaintenancePlanHeaderButton from '@features/MaintenancePlan/MaintenancePlanHeader/MaintenancePlanHeaderButton';

export default function MaintenancePlanHeader({
  toggleModal,
  selectedFilter,
  setSelectedFilter,
  sortingOrder,
  setSortingOrder,
}) {
  const dispatch = useDispatch();

  const downloadMaintenancePlans = () => {
    dispatch(maintenancePlanActions.download());
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RowHeader
          title="Maintenance Plans"
          caption={selectedFilter ? `Applying ${selectedFilter} status filter` : 'Assign items to maintenance plans'}
        />
        <MaintenancePlanHeaderButton handleButtonClick={toggleModal} handleIconButtonClick={downloadMaintenancePlans} />
      </Stack>
      <FilterAndSortMenu
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </>
  );
}
