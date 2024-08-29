import { Box, Button, Skeleton, Stack } from '@mui/material';
import BarChart from '../../util/Chart/BarChart';
import SimpleModal from '../common/SimpleModal';
import TableComponent from '../InventoryList/TableComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AddRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import ItemCard from '../common/ItemCard/ItemCard';
import HeaderWithButton from '../common/HeaderWithButton';
import DataTable from '../common/DataTable/DataTable';
import { ITEMS_IN_MAINTENANCE_PLAN_HEADER } from './constants';
import { maintenancePlanActions } from './maintenanceSlice';
import { useParams } from 'react-router-dom';

export default function MaintenanceItem() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { inventories, loading: inventoriesLoading } = useSelector((state) => state.inventory);
  const {
    selectedMaintenancePlan,
    itemsInMaintenancePlan = [],
    loading = false,
  } = useSelector((state) => state.maintenance);

  const [displayModal, setDisplayModal] = useState(false);
  const handleOpenModal = () => setDisplayModal(true);

  useEffect(() => {
    if (id) {
      dispatch(maintenancePlanActions.getItemsInMaintenancePlan(id));
      dispatch(maintenancePlanActions.getSelectedMaintenancePlan(id));
    }
  }, [id]);

  if (inventoriesLoading || loading) {
    return <Skeleton height="20rem" />;
  }

  return (
    <Stack direction="column" spacing="1rem">
      <HeaderWithButton
        title={selectedMaintenancePlan?.name ? `${selectedMaintenancePlan.name} Overview` : 'Maintenance Plan Overview'}
        secondaryTitle="View details of selected maintenance plan"
      />
      <ItemCard selectedItem={selectedMaintenancePlan} />
      <HeaderWithButton
        title="Items"
        secondaryTitle={`Total ${itemsInMaintenancePlan?.length || 0} item(s)`}
        primaryButtonTextLabel="Add Items"
        primaryStartIcon={<AddRounded />}
        handleClickPrimaryButton={handleOpenModal}
      />
      <DataTable
        rows={itemsInMaintenancePlan}
        columns={ITEMS_IN_MAINTENANCE_PLAN_HEADER}
        isEmpty={itemsInMaintenancePlan === null}
        subtitle={'Associate items into maintenance plan to begin.'}
      />
      <HeaderWithButton title="Graph" secondaryTitle="Graph details for last 10 recently updated" />
      <Box sx={{ position: 'relative', height: '40vh', width: 'calc(100% - 1rem)' }}>
        <BarChart
          legendLabel="Name Vs Cost"
          data={
            itemsInMaintenancePlan
              ?.filter((_, index) => index < 10)
              ?.map((v, index) => ({
                label: v.name,
                count: v.price,
                color: ['rgb(54, 162, 235)', 'rgb(211, 211, 211)'][index % 2],
              })) || []
          }
          backgroundColor="rgba(75, 192, 192, 0.4)"
          borderColor="rgba(75, 192, 192, 1)"
        />
      </Box>
      {displayModal && (
        <SimpleModal title={`Add items to ${selectedMaintenancePlan?.name}`} handleClose={resetSelection} maxSize="md">
          <TableComponent
            isLoading={inventoriesLoading}
            hideCheckBox={false}
            hideIconButton={true}
            hideMoreDetailsButton={true}
            data={inventories.filter(
              (inventory) => !itemsInMaintenancePlan?.some((item) => item.item_id === inventory.id)
            )}
            columns={Object.values(VIEW_INVENTORY_LIST_HEADERS).filter((v) => v.displayConcise)}
            rowFormatter={rowFormatter}
            generateTitleColor={generateTitleColor}
            rowSelected={rowSelected}
            onRowSelect={() => {}}
            handleRowSelection={handleRowSelection}
            emptyComponentSubtext="Create inventory items to associate them."
          />
          <Button variant="outlined" disabled={rowSelected.length <= 0} sx={{ mt: '1rem' }} onClick={addItems}>
            Add Selected items
          </Button>
        </SimpleModal>
      )}
    </Stack>
  );
}
