import dayjs from 'dayjs';
import { useState } from 'react';

import { Skeleton } from '@mui/material';
import ItemCard from '@common/ItemCard/ItemCard';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ConfirmationBoxModal, EmptyComponent } from '@common/utils';

dayjs.extend(relativeTime);

const SectionCardContent = ({
  content,
  loading,
  displayModal,
  setDisplayModal,
  setSelectedID,
  removeItem,
  prefixURI,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);

  const handleDelete = (id) => {
    setOpenDialog(true);
    setIdToDelete(id);
  };

  const handleEdit = (id) => {
    setDisplayModal(true);
    setSelectedID(id);
  };
  const resetConfirmationBox = () => {
    setOpenDialog(false);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      return;
    }
    removeItem(id);
    resetConfirmationBox();
  };

  if (loading && !displayModal) {
    return <Skeleton height="10rem" />;
  }
  if (content?.length <= 0 || content == null) return <EmptyComponent />;

  return (
    <>
      <ItemCard data={content} handleEdit={handleEdit} handleDelete={handleDelete} prefixURI={prefixURI} />
      <ConfirmationBoxModal
        openDialog={openDialog}
        title="Confirm deletion"
        handleClose={resetConfirmationBox}
        maxSize="xs"
        deleteID={idToDelete}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default SectionCardContent;
