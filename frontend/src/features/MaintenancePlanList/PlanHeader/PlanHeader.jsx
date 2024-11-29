import { useDispatch } from 'react-redux';

import { Button, IconButton, Stack } from '@mui/material';
import { AddRounded, FileDownload } from '@mui/icons-material';

import RowHeader from '../../../common/RowHeader';
import { maintenancePlanActions } from '../maintenanceSlice';
import FilterAndSortMenu from '../../../common/FilterAndSortMenu/FilterAndSortMenu';

export default function PlanHeader({ toggleModal, selectedFilter, setSelectedFilter, sortingOrder, setSortingOrder }) {
  const dispatch = useDispatch();

  const downloadMaintenancePlans = () => {
    dispatch(maintenancePlanActions.download());
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RowHeader
          title="Maintenance Plans"
          caption={selectedFilter ? `Applying ${selectedFilter} filter` : 'Assign items to maintenance plans'}
        />
        <Stack direction="row" spacing="1rem">
          <Button onClick={toggleModal} startIcon={<AddRounded />} variant="outlined">
            Add Plan
          </Button>
          <IconButton size="small" onClick={downloadMaintenancePlans}>
            <FileDownload fontSize="small" />
          </IconButton>
        </Stack>
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
