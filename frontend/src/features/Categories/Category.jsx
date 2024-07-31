import { Card, CardActions, CardContent, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { DeleteRounded, EditNoteRounded, TrendingUpRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ConfirmationBoxModal, DisplayNoMatchingRecordsComponent } from '../common/utils';
import { useDispatch } from 'react-redux';
import { categoryActions } from './categoriesSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Category = ({ categories, loading, setSelectedCategoryID, setDisplayModal }) => {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);

  const handleDelete = (id) => {
    setOpenDialog(true);
    setIdToDelete(id);
  };

  const handleEdit = (id) => {
    setDisplayModal(true);
    setSelectedCategoryID(id);
  };

  const reset = () => {
    setOpenDialog(false);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      return;
    }
    dispatch(categoryActions.removeCategory({ id }));
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

  return (
    <>
      <Stack>
        <Stack spacing={{ xs: 1 }} direction="row" useFlexGap flexWrap="wrap">
          {categories.map((item, index) => (
            <Stack key={index} flexGrow={1}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Tooltip title={item.category_description}>
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
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(item.id)}
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                      >
                        <DeleteRounded fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(item.id)}
                        disableRipple
                        disableFocusRipple
                        disableTouchRipple
                      >
                        <EditNoteRounded fontSize="small" />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Tooltip>

                <CardActions sx={{ alignSelf: 'flex-end' }}>
                  {item.updated_at === null ? (
                    <Typography variant="caption" color="text.secondary">
                      Never updated
                    </Typography>
                  ) : (
                    <Tooltip title={`Last updated around ${dayjs(item?.updated_at).fromNow()}`}>
                      <Typography variant="caption" color="text.secondary">
                        {dayjs(item?.updated_at).fromNow()}
                      </Typography>
                    </Tooltip>
                  )}
                </CardActions>
              </Card>
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
