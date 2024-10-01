import { Box, Button, IconButton, Menu, MenuItem, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AddRounded, FileDownload, FilterAltRounded, SortRounded } from '@mui/icons-material';
import SimpleModal from '../common/SimpleModal';
import AddCategory from './AddCategory';
import HeaderWithButton from '../common/HeaderWithButton';
import Category from './Category';
import { useSelector } from 'react-redux';
import { STATUS_OPTIONS } from '../Notes/constants';

const CategoryList = ({ displayConcise = false }) => {
  const { categories = [], loading } = useSelector((state) => state.categories);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sortingOrder, setSortingOrder] = useState(true); // false ascending
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedCategoryID, setSelectedCategoryID] = useState('');

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index, optionLabel) => {
    const draftStatusOption = STATUS_OPTIONS.filter((v) => v.label === optionLabel);
    setSelectedFilters(draftStatusOption);
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setDisplayModal(false);
    setSelectedCategoryID('');
  };

  const toggleSort = () => setSortingOrder(!sortingOrder);
  const toggleModal = () => setDisplayModal(!displayModal);

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

  const filterAndBuildCategories = (displayConcise, categories, selectedFilters) => {
    if (displayConcise) {
      return categories?.slice(0, 4);
    } else if (selectedFilters.length > 0) {
      const flattenedArr = selectedFilters.map((v) => v.label);
      return categories.filter((element) => flattenedArr.includes(element.status_name));
    } else {
      return sortedData;
    }
  };

  return (
    <Stack sx={{ py: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderWithButton
          title="Categories"
          secondaryTitle={
            displayConcise
              ? `Viewing recent 4 out of ${categories?.length} categories`
              : 'Organize items into categories for easy access.'
          }
        />
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
        <Stack sx={{ flexDirection: 'row', gap: '1rem', mb: '1rem' }}>
          <IconButton size="small" onClick={handleOpenMenu}>
            <FilterAltRounded fontSize="small" />
          </IconButton>
          <Tooltip title={`${sortingOrder ? 'DESC' : 'ASC'}`}>
            <IconButton size="small" onClick={toggleSort}>
              <SortRounded fontSize="small" />
            </IconButton>
          </Tooltip>
          <Menu
            id="filter-sort-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            slotProps={{
              root: { sx: { '.MuiList-root': { padding: 0 } } },
            }}
          >
            <Paper sx={{ width: 200 }}>
              <Typography variant="h6" sx={{ paddingLeft: '0.5rem', paddingTop: '0.5rem' }}>
                Filter results:
              </Typography>
              {STATUS_OPTIONS.map((option, index) => (
                <MenuItem
                  key={index}
                  id={option.label}
                  selected={index === selectedFilters}
                  onClick={(event) => handleMenuItemClick(event, index, option.label)}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                    <Box>{option.display}</Box>
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                      {option.icon}
                    </Box>
                  </Stack>
                </MenuItem>
              ))}
            </Paper>
          </Menu>
        </Stack>
      )}
      <Category
        // categories={displayConcise ? categories?.slice(0, 4) : sortedData.filter(v => v.status_name === selectedFilters.find(() => true).label)} // sorted data is after sort method
        categories={filterAndBuildCategories(displayConcise, categories, selectedFilters)} // sorted data is after sort method
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
