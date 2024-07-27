import { Stack } from '@mui/material';
import { useState } from 'react';
import { AddRounded } from '@mui/icons-material';
import SimpleModal from '../common/SimpleModal';
import AddCategory from './AddCategory';
import HeaderWithButton from '../common/HeaderWithButton';
import Category from './Category';

const CategoryList = () => {
  const [displayModal, setDisplayModal] = useState(false);

  const handleClose = () => setDisplayModal(false);
  const toggleModal = () => setDisplayModal(!displayModal);

  return (
    <Stack sx={{ py: 2 }}>
      <HeaderWithButton
        title="Categories"
        primaryButtonTextLabel="Add Category"
        primaryStartIcon={<AddRounded />}
        handleClickPrimaryButton={toggleModal}
      />
      <Category />
      {displayModal && (
        <SimpleModal title="Add New Category" handleClose={handleClose} maxSize="md">
          <AddCategory handleCloseAddCategory={handleClose} />
        </SimpleModal>
      )}
    </Stack>
  );
};

export default CategoryList;
