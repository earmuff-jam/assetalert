import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Skeleton, Stack } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

import SimpleModal from '../../common/SimpleModal';
import { inventoryActions } from '../InventoryList/inventorySlice';
import { maintenancePlanItemActions } from './maintenancePlanItemSlice';
import MaintenancePlanItemDetailsGraph from './MaintenancePlanItemDetailsContent/MaintenancePlanItemDetailsGraph';
import MaintenancePlanItemDetailsHeader from './MaintenancePlanItemDetailsHeader/MaintenancePlanItemDetailsHeader';
import MaintenancePlanItemDetailsContent from './MaintenancePlanItemDetailsContent/MaintenancePlanItemDetailsContent';
import MaintenancePlanItemDetailsAddAsset from './MaintenancePlanItemDetailsAddAsset/MaintenancePlanItemDetailsAddAsset';

export default function MaintenancePlanItemDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

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

  const addItems = () => {
    const collaborators = selectedMaintenancePlan.sharable_groups;
    dispatch(
      maintenancePlanItemActions.addItemsInPlan({ id: selectedMaintenancePlan?.id, rowSelected, collaborators })
    );
    resetSelection();
  };

  const handleRemoveAssociation = () => {
    dispatch(
      maintenancePlanItemActions.removeItemsFromMaintenancePlan({ id: selectedMaintenancePlan?.id, rowSelected })
    );
  };

  const resetSelection = () => {
    setDisplayModal(false);
    setRowSelected([]);
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
      <MaintenancePlanItemDetailsHeader
        label={selectedMaintenancePlan?.name ? `${selectedMaintenancePlan.name} Overview` : 'Maintenance Plan Overview'}
        caption="View details of selected maintenance plan"
        item={selectedMaintenancePlan}
        image={selectedMaintenancePlanImage}
      />
      <MaintenancePlanItemDetailsContent
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
        itemsInMaintenancePlan={itemsInMaintenancePlan}
        handleOpenModal={handleOpenModal}
        handleRemoveAssociation={handleRemoveAssociation}
      />
      <MaintenancePlanItemDetailsGraph totalItems={itemsInMaintenancePlan} />
      {displayModal && (
        <SimpleModal
          title={`Add items to ${selectedMaintenancePlan?.name}`}
          handleClose={resetSelection}
          maxSize="md"
          showSecondaryButton
          secondaryButtonAction={addItems}
          secondaryButtonIcon={<AddRounded />}
          disableSecondaryButton={rowSelected.length <= 0}
        >
          <MaintenancePlanItemDetailsAddAsset
            rowSelected={rowSelected}
            setRowSelected={setRowSelected}
            resetSelection={resetSelection}
            itemsInMaintenancePlan={itemsInMaintenancePlan}
          />
        </SimpleModal>
      )}
    </Stack>
  );
}
