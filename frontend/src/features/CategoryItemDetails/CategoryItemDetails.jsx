import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Skeleton, Stack } from '@mui/material';

import SimpleModal from '../../common/SimpleModal';
import { inventoryActions } from '../InventoryList/inventorySlice';
import { categoryItemDetailsActions } from './categoryItemDetailsSlice';
import CategoryItemDetailsGraph from './CategoryItemDetailsContent/CategoryItemDetailsGraph';
import CategoryItemDetailsHeader from './CategoryItemDetailsHeader/CategoryItemDetailsHeader';
import CategoryItemDetailsAddAsset from './CategoryItemDetailsAddAsset/CategoryItemDetailsAddAsset';
import CategoryItemDetailsDataTable from './CategoryItemDetailsContent/CategoryItemDetailsDataTable';

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

  const handleOpenModal = () => {
    setDisplayModal(true);
    dispatch(inventoryActions.getAllInventoriesForUser());
  };

  const resetSelection = () => {
    setDisplayModal(false);
    setRowSelected([]);
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
      <CategoryItemDetailsDataTable itemsInCategory={itemsInCategory} handleOpenModal={handleOpenModal} />
      <CategoryItemDetailsGraph itemsInCategory={itemsInCategory} />
      {displayModal && (
        <SimpleModal title={`Add items to ${selectedCategory?.name}`} handleClose={resetSelection} maxSize="md">
          <CategoryItemDetailsAddAsset
            rowSelected={rowSelected}
            selectedCategory={selectedCategory}
            setRowSelected={setRowSelected}
            itemsInCategory={itemsInCategory}
            resetSelection={resetSelection}
          />
        </SimpleModal>
      )}
    </Stack>
  );
}
