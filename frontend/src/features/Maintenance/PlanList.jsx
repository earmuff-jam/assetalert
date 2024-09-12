import { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { AlarmAddRounded, DeleteRounded, EditNoteRounded } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { ConfirmationBoxModal, EmptyComponent } from '../common/utils';
import { maintenancePlanActions } from './maintenanceSlice';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);

const PlanList = ({ maintenancePlan, loading, setDisplayModal, setSelectedMaintenancePlanID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);

  const handleDelete = (id) => {
    setOpenDialog(true);
    setIdToDelete(id);
  };

  const handleEdit = (id) => {
    setDisplayModal(true);
    setSelectedMaintenancePlanID(id);
  };
  const resetConfirmationBox = () => {
    setOpenDialog(false);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      return;
    }
    dispatch(maintenancePlanActions.removePlan(id));
    resetConfirmationBox();
  };

  useEffect(() => {
    dispatch(maintenancePlanActions.getPlans());
  }, []);

  if (loading) {
    return <Skeleton height="10rem" />;
  }
  if (maintenancePlan?.length <= 0 || maintenancePlan == null) return <EmptyComponent />;

  return (
    <>
      <Stack>
        <Stack spacing={{ xs: 1 }}>
          {maintenancePlan.map((item, index) => (
            <Stack key={index} flexGrow={1}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '0.2rem',
                  borderLeft: '0.175rem solid',
                  borderColor: item.color ? `${item.color}` : 'primary.main',
                }}
              >
                <CardContent>
                  <Stack direction="row">
                    <Stack flexGrow={1}>
                      <Typography
                        variant="h6"
                        component="h3"
                        onClick={() => navigate(encodeURI(`/plan/${item.id}`))}
                        sx={{ cursor: 'pointer' }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="caption" flexWrap={1} color="text.secondary">
                        {item.description}
                      </Typography>
                      <Stack direction="row" alignItems="center" useFlexGap spacing={1}>
                        <AlarmAddRounded
                          fontSize="small"
                          sx={{ color: item.color ? `${item.color}` : 'primary.main' }}
                        />
                        <Typography variant="caption">{item?.max_items_limit} items limit </Typography>
                      </Stack>
                    </Stack>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(item.id)}
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                    >
                      <DeleteRounded fontSize="small" sx={{ color: 'error.main' }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(item.id)}
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                    >
                      <EditNoteRounded fontSize="small" sx={{ color: 'primary.main' }} />
                    </IconButton>
                  </Stack>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between' }}>
                  {item.updated_at === null ? (
                    <Typography variant="caption" color="text.secondary">
                      Never updated
                    </Typography>
                  ) : (
                    <Tooltip title={`Last updated around ${dayjs(item?.updated_at).fromNow()}`}>
                      <Typography variant="caption" color="text.secondary">
                        By {item.updator || 'anonymous'} {dayjs(item.updated_at).fromNow()}
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
        text="Confirm deletion of maintenance plan? Deletion is permanent and cannot be undone."
        textVariant="body2"
        handleClose={resetConfirmationBox}
        showSubmit={false}
        maxSize="sm"
        deleteID={idToDelete}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default PlanList;
