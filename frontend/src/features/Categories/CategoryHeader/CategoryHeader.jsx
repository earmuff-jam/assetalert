import { useDispatch } from 'react-redux';

import { Button, IconButton, Stack } from '@mui/material';
import { AddRounded, FileDownload } from '@mui/icons-material';

import RowHeader from '../../../common/RowHeader';
import { categoryActions } from '../categoriesSlice';
import FilterAndSortMenu from '../../../common/FilterAndSortMenu/FilterAndSortMenu';

export default function CategoryHeader({
  categories,
  toggleModal,
  selectedFilter,
  setSelectedFilter,
  sortingOrder,
  setSortingOrder,
  displayConcise,
  disableDownloadIcon,
}) {
  const dispatch = useDispatch();

  const downloadCategories = () => dispatch(categoryActions.download());

  const buildCaption = (displayConcise, selectedFilter) => {
    if (displayConcise) {
      return categories?.length ? `Viewing recently edited categories` : null;
    } else if (selectedFilter) {
      return `Applying ${selectedFilter} filter`;
    } else {
      return 'Organize items into categories.';
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RowHeader title="Categories" caption={buildCaption(displayConcise, selectedFilter)} />
        <Stack direction="row" spacing="1rem">
          <Button onClick={toggleModal} startIcon={<AddRounded />} variant="outlined">
            Add Category
          </Button>
          {!displayConcise && (
            <IconButton size="small" disabled={disableDownloadIcon} onClick={downloadCategories}>
              <FileDownload fontSize="small" />
            </IconButton>
          )}
        </Stack>
      </Stack>
      {!displayConcise && (
        <FilterAndSortMenu
          sortingOrder={sortingOrder}
          setSortingOrder={setSortingOrder}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      )}
    </>
  );
}
