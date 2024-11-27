import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Skeleton, Stack } from '@mui/material';

import SimpleModal from '../../common/SimpleModal';
import { generateTitleColor } from '../../common/utils';
import TableComponent from '../InventoryList/TableComponent';
import { inventoryActions } from '../InventoryList/inventorySlice';
import ItemGraph from './MaintenancePlanItem/ItemContent/ItemGraph';
import ItemHeader from './MaintenancePlanItem/ItemHeader/ItemHeader';
import ItemContent from './MaintenancePlanItem/ItemContent/ItemContent';
import { VIEW_INVENTORY_LIST_HEADERS } from '../InventoryList/constants';
import { maintenancePlanItemActions } from './maintenancePlanItemSlice';

export default function MaintenancePlanItemDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { inventories, loading: inventoriesLoading } = useSelector((state) => state.inventory);
  const {
    selectedMaintenancePlan,
    itemsInMaintenancePlan = [],
    selectedMaintenancePlanImage,
    loading = false,
  } = useSelector((state) => state.maintenancePlanItem);

  const [displayModal, setDisplayModal] = useState(false);
  const [rowSelected, setRowSelected] = useState([]);

  const handleOpenModal = () => {
    setDisplayModal(true);
    dispatch(inventoryActions.getAllInventoriesForUser());
  };

  const handleRowSelection = (_, id) => {
    if (id === 'all') {
      setRowSelected(inventories.map((v) => v.id));
    } else {
      const selectedIndex = rowSelected.indexOf(id);
      let draftSelected = [];
      if (selectedIndex === -1) {
        draftSelected = draftSelected.concat(rowSelected, id);
      } else if (selectedIndex === 0) {
        draftSelected = draftSelected.concat(rowSelected.slice(1));
      } else if (selectedIndex === rowSelected.length - 1) {
        draftSelected = draftSelected.concat(rowSelected.slice(0, -1));
      } else if (selectedIndex > 0) {
        draftSelected = draftSelected.concat(rowSelected.slice(0, selectedIndex), rowSelected.slice(selectedIndex + 1));
      }
      setRowSelected(draftSelected);
    }
  };

  const rowFormatter = (row, column) => {
    if (['created_at', 'updated_at'].includes(column)) {
      return dayjs(row[column]).fromNow();
    }
    if (['updater_name', 'creator_name'].includes(column)) {
      return row[column] ?? '-';
    }
    return row[column] ?? '-';
  };

  const resetSelection = () => {
    setDisplayModal(false);
    setRowSelected([]);
  };

  const addItems = () => {
    const collaborators = selectedMaintenancePlan.sharable_groups;
    dispatch(maintenancePlanItemActions.addItemsInPlan({ rowSelected, id, collaborators }));
    resetSelection();
  };

  useEffect(() => {
    if (id) {
      dispatch(maintenancePlanItemActions.getItemsInMaintenancePlan(id));
      dispatch(maintenancePlanItemActions.getSelectedMaintenancePlan(id));
      dispatch(maintenancePlanItemActions.getSelectedImage({ id }));
    }
  }, [id]);

  if (loading) {
    return <Skeleton height="20rem" />;
  }

  return (
    <Stack direction="column" spacing="1rem">
      <ItemHeader
        label={selectedMaintenancePlan?.name ? `${selectedMaintenancePlan.name} Overview` : 'Maintenance Plan Overview'}
        caption="View details of selected maintenance plan"
        item={selectedMaintenancePlan}
        image={selectedMaintenancePlanImage}
      />
      <ItemContent totalItems={itemsInMaintenancePlan} handleOpenModal={handleOpenModal} />
      <ItemGraph totalItems={itemsInMaintenancePlan} />
      {displayModal && (
        <SimpleModal title={`Add items to ${selectedMaintenancePlan?.name}`} handleClose={resetSelection} maxSize="md">
          <Button variant="outlined" disabled={rowSelected.length <= 0} sx={{ mt: '1rem' }} onClick={addItems}>
            Add Selected items
          </Button>
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
        </SimpleModal>
      )}
    </Stack>
  );
}
