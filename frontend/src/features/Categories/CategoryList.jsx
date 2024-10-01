import { Button, IconButton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AddRounded, FileDownload } from '@mui/icons-material';
import SimpleModal from '../common/SimpleModal';
import AddCategory from './AddCategory';
import HeaderWithButton from '../common/HeaderWithButton';
import Category from './Category';
import { useSelector } from 'react-redux';
import FilterAndSortMenu from '../common/FilterAndSortMenu/FilterAndSortMenu';

const CategoryList = ({ displayConcise = false }) => {
  const { categories = [], loading } = useSelector((state) => state.categories);

  const [sortedData, setSortedData] = useState([]);
  const [sortingOrder, setSortingOrder] = useState(true); // false ascending

  const [displayModal, setDisplayModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedCategoryID, setSelectedCategoryID] = useState('');

  const handleClose = () => {
    setDisplayModal(false);
    setSelectedCategoryID('');
  };

  const toggleModal = () => setDisplayModal(!displayModal);

  const filterAndBuildCategories = (displayConcise, categories, selectedFilter) => {
    if (displayConcise) {
      return categories?.slice(0, 4);
    } else if (selectedFilter.length > 0) {
      return categories.filter((element) => element.status_name === selectedFilter);
    } else {
      return sortedData;
    }
  };

  const buildCaption = (displayConcise, selectedFilter) => {
    if (displayConcise) {
      return `Viewing recent 4 out of ${categories?.length} categories`;
    } else if (selectedFilter) {
      return `Applying ${selectedFilter} filter`;
    } else {
      return 'Organize items into categories.';
    }
  };

  useEffect(() => {
    if (sortingOrder) {
      if (categories.length > 0) {
        const draft = [...categories].sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
        setSortedData(draft);
      }
    } else {
      setSortedData(categories);
    }
  }, [sortingOrder, categories]);

  return (
    <Stack sx={{ py: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderWithButton title="Categories" secondaryTitle={buildCaption(displayConcise, selectedFilter)} />
        <Stack direction="row" spacing="1rem">
          <Button onClick={toggleModal} startIcon={<AddRounded />} variant="outlined">
            Add Category
          </Button>
          {!displayConcise && (
            <IconButton size="small">
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
      <Category
        categories={filterAndBuildCategories(displayConcise, categories, selectedFilter)} // sorted data is after sort method
        loading={loading}
        setSelectedCategoryID={setSelectedCategoryID}
        setDisplayModal={setDisplayModal}
      />
      {displayModal && (
        <SimpleModal title="Add New Category" handleClose={handleClose} maxSize="md">
          <AddCategory
            categories={categories}
            loading={loading}
            handleCloseAddCategory={handleClose}
            selectedCategoryID={selectedCategoryID}
            setSelectedCategoryID={setSelectedCategoryID}
          />
        </SimpleModal>
      )}
    </Stack>
  );
};

export default CategoryList;
