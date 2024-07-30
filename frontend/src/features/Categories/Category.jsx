import { Card, CardContent, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { DeleteRounded, TrendingUpRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ConfirmationBoxModal, DisplayNoMatchingRecordsComponent } from '../common/utils';
import { useDispatch, useSelector } from 'react-redux';
import { categoryActions } from './categoriesSlice';

const Category = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);

  const handleDelete = (item) => {
    setOpenDialog(true);
    setIdToDelete(item.id);
  };

  const reset = () => {
    setOpenDialog(false);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      return;
    }
    dispatch(categoryActions.removeCategory(id));
    reset();
  };

  useEffect(() => {
    dispatch(categoryActions.getCategories());
  }, []);

  if (loading) {
    return <Skeleton variant="rounded" animation="wave" height="100%" width="100%" />;
  }
  if (categories.length <= 0) {
    return <DisplayNoMatchingRecordsComponent />;
  }

  console.log(categories);

  return (
    <>
      <Stack>
        <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
          {categories.map((item, index) => (
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
                      <IconButton onClick={() => handleDelete(item.id)}>
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
