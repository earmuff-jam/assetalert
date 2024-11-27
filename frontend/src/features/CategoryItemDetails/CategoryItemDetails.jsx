import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AddRounded } from '@mui/icons-material';
import { Box, Button, Skeleton, Stack } from '@mui/material';

import RowHeader from '../../common/RowHeader';
import BarChart from '../../common/Chart/BarChart';
import SimpleModal from '../../common/SimpleModal';
import { generateTitleColor } from '../../common/utils';
import DataTable from '../../common/DataTable/DataTable';
import DetailsCard from '../../common/ItemCard/DetailsCard';
import TableComponent from '../InventoryList/TableComponent';
import { inventoryActions } from '../InventoryList/inventorySlice';
import { ITEMS_IN_CATEGORY_HEADER } from '../Categories/constants';
import { categoryItemDetailsActions } from './categoryItemDetailsSlice';
import { VIEW_INVENTORY_LIST_HEADERS } from '../InventoryList/constants';

export default function CategoryItemDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { inventories, loading: inventoriesLoading } = useSelector((state) => state.inventory);
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
    const collaborators = selectedCategory.sharable_groups;
    dispatch(categoryItemDetailsActions.addItemsInCategory({ id, rowSelected, collaborators }));
    resetSelection();
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
      <RowHeader
        title={selectedCategory?.name ? `${selectedCategory.name} Overview` : 'Category Overview'}
        caption="View details of selected category"
      />
      <DetailsCard selectedItem={selectedCategory} selectedImage={selectedCategoryImage} isViewingCategory />
      <RowHeader
        title="Items"
        caption={`Total ${itemsInCategory?.length || 0} item(s)`}
        primaryButtonTextLabel="Add Items"
        primaryStartIcon={<AddRounded />}
        handleClickPrimaryButton={handleOpenModal}
      />
      <DataTable
        rows={itemsInCategory}
        columns={ITEMS_IN_CATEGORY_HEADER}
        isEmpty={itemsInCategory === null}
        subtitle={'Associate items into category to begin.'}
      />
      <RowHeader title="Graph" caption="Graph details for last 10 recently updated" />
      <Box sx={{ position: 'relative', width: 'calc(100% - 1rem)' }}>
        <BarChart
          legendLabel="Name Vs Cost"
          data={
            itemsInCategory
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
        <SimpleModal title={`Add items to ${selectedCategory?.name}`} handleClose={resetSelection} maxSize="md">
          <Button variant="outlined" disabled={rowSelected.length <= 0} sx={{ mt: '1rem' }} onClick={addItems}>
            Add Selected items
          </Button>
          <TableComponent
            isLoading={inventoriesLoading}
            hideCheckBox={false}
            hideIconButton={true}
            hideMoreDetailsButton={true}
            data={inventories.filter((inventory) => !itemsInCategory?.some((item) => item.item_id === inventory.id))}
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
