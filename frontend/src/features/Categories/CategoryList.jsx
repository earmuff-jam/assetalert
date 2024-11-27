import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { Stack } from '@mui/material';

import Category from './CategoryDetails/Category';
import SimpleModal from '../../common/SimpleModal';
import AddCategory from './AddCategory/AddCategory';
import CategoryHeader from './CategoryHeader/CategoryHeader';

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

  useEffect(() => {
    if (sortingOrder) {
      if (categories && categories.length > 0) {
        const draft = [...categories].sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
        setSortedData(draft);
      }
    } else {
      setSortedData(categories);
    }
  }, [sortingOrder, categories]);

  return (
    <Stack sx={{ py: 2 }}>
      <CategoryHeader
        categories={categories}
        toggleModal={toggleModal}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        displayConcise={displayConcise}
        disableDownloadIcon={Boolean(categories) && categories.length <= 0}
      />
      <Category
        categories={filterAndBuildCategories(displayConcise, categories, selectedFilter)} // sorted data is after sort method
        loading={loading}
        setSelectedCategoryID={setSelectedCategoryID}
        setDisplayModal={setDisplayModal}
      />
      {displayModal && (
        <SimpleModal title="Add New Category" handleClose={handleClose} maxSize="xs">
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
