import { Card, CardContent, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { DeleteRounded, TrendingUpRounded } from '@mui/icons-material';
import { useState } from 'react';
import { ConfirmationBoxModal, DisplayNoMatchingRecordsComponent } from '../../common/utils';

const Category = () => {
  const isLoading = false;
  const data = [];

  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);

  const handleDelete = (item) => {
    if (!item.is_deleteable) {
      return;
    }
    setOpenDialog(true);
    setIdToDelete(item.id);
  };

  const reset = () => {
    setOpenDialog(false);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      // unknown id to delete. protect from confirmation box
      return;
    }
    // deleteCategory.mutate(id);
    reset();
  };

  if (isLoading) {
    return <Skeleton variant="rounded" animation="wave" height="100%" width="100%" />;
  }
  if (data.length <= 0) {
    return <DisplayNoMatchingRecordsComponent />;
  }

  return (
    <>
      <Stack>
        <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
          {data.map((item, index) => (
            <Stack key={index} flexGrow={1}>
              <Tooltip title={item.category_description}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent>
                    <Stack direction="row">
                      <Stack flexGrow={1}>
                        <Typography variant="h6" component="h3">
                          {item.category_name}
                        </Typography>
                        <Stack direction="row" alignItems="center" useFlexGap spacing={1}>
                          <TrendingUpRounded color={index % 2 == 0 ? 'success' : 'error'} />
                          <Typography variant="caption">Total {item?.totalAssignedItems?.length ?? 0} items</Typography>
                        </Stack>
                      </Stack>
                      <IconButton onClick={() => handleDelete(item)}>
                        <DeleteRounded />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Tooltip>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <ConfirmationBoxModal
        openDialog={openDialog}
        title="Confirm deletion"
        text="Confirm deletion of selected category? Deletion is permanent and cannot be undone."
        textVariant="body2"
        handleClose={reset}
        maxSize="sm"
        deleteID={idToDelete}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default Category;
