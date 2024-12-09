import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Skeleton, Stack } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

import SimpleModal from '../../common/SimpleModal';
import { inventoryActions } from '../Assets/inventorySlice';
import { categoryItemDetailsActions } from './categoryItemDetailsSlice';
import CategoryItemDetailsGraph from './CategoryItemDetailsContent/CategoryItemDetailsGraph';
import CategoryItemDetailsHeader from './CategoryItemDetailsHeader/CategoryItemDetailsHeader';
import CategoryItemDetailsAddAsset from './CategoryItemDetailsAddAsset/CategoryItemDetailsAddAsset';
import CategoryItemDetailsDataTable from './CategoryItemDetailsContent/CategoryItemDetailsDataTable';
import { ConfirmationBoxModal } from '../../common/utils';
import { enqueueSnackbar } from 'notistack';

export default function CategoryItemDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    selectedCategory,
    selectedCategoryImage,
    itemsInCategory = [],
    loading = false,
  } = useSelector((state) => state.categoryItemDetails);

  const [rowSelected, setRowSelected] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [openConfirmationBoxModal, setOpenConfirmationBoxModal] = useState(false);

  const handleOpenModal = () => {
    setDisplayModal(true);
    dispatch(inventoryActions.getAllInventoriesForUser());
  };

  const handleOpenConfirmationBoxModal = () => setOpenConfirmationBoxModal(!openConfirmationBoxModal);

  const resetSelection = () => {
    setDisplayModal(false);
    setRowSelected([]);
  };

  const resetConfirmationBoxModal = () => setOpenConfirmationBoxModal(false);

  const confirmDelete = () => {
    dispatch(categoryItemDetailsActions.removeItemsFromCategory({ id: selectedCategory?.id, rowSelected }));
    enqueueSnackbar(`Removed association of assets for ${selectedCategory.name}.`, {
      variant: 'default',
    });
    resetConfirmationBoxModal();
  };

  const addItems = () => {
    const collaborators = selectedCategory.sharable_groups;
    dispatch(categoryItemDetailsActions.addItemsInCategory({ id: selectedCategory?.id, rowSelected, collaborators }));
    enqueueSnackbar(`Added association of assets for ${selectedCategory.name}.`, {
      variant: 'success',
    });
    resetSelection();
  };

  const handleRemoveAssociation = () => {
    handleOpenConfirmationBoxModal();
  };

  useEffect(() => {
    if (id) {
      dispatch(categoryItemDetailsActions.getItemsForCategory(id));
      dispatch(categoryItemDetailsActions.getCategory(id));
      dispatch(categoryItemDetailsActions.getSelectedImage({ id }));
    }
  }, [id]);

  if (loading) {
    return <Skeleton height="20rem" />;
  }

  return (
    <Stack direction="column" spacing="1rem">
      <CategoryItemDetailsHeader
        selectedCategory={selectedCategory}
        selectedCategoryImage={selectedCategoryImage}
        itemsInCategory={itemsInCategory}
        handleOpenModal={handleOpenModal}
      />
      <CategoryItemDetailsDataTable
        rowSelected={rowSelected}
        setRowSelected={setRowSelected}
        itemsInCategory={itemsInCategory}
        handleOpenModal={handleOpenModal}
        handleRemoveAssociation={handleRemoveAssociation}
      />
      <CategoryItemDetailsGraph itemsInCategory={itemsInCategory} />
      {displayModal && (
        <SimpleModal
          title={`Add items to ${selectedCategory?.name}`}
          handleClose={resetSelection}
          showSecondaryButton
          secondaryButtonAction={addItems}
          disableSecondaryButton={rowSelected.length <= 0}
          secondaryButtonIcon={<AddRounded />}
          maxSize="md"
        >
          <CategoryItemDetailsAddAsset
            rowSelected={rowSelected}
            setRowSelected={setRowSelected}
            itemsInCategory={itemsInCategory}
          />
        </SimpleModal>
      )}
      <ConfirmationBoxModal
        openDialog={openConfirmationBoxModal}
        title="Confirm deletion"
        handleClose={resetConfirmationBoxModal}
        maxSize="xs"
        confirmDelete={confirmDelete}
      />
    </Stack>
  );
}
