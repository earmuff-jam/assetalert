import React, { useState } from 'react';
import { makeStyles, Box, Button, Tooltip, Typography, IconButton, Dialog, Chip, Badge } from '@material-ui/core';

import { AddCircleRounded, ViewListRounded, BugReportRounded, FaceRounded } from '@material-ui/icons';

import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import EventItemDrawer from './EventItemDrawer';
import EventSplashDetails from './EventSplashDetails';
import { Title } from '../Organization/EditOrganzation';
import AddItemDetail from '../ItemDetail/AddItemDetail';
import { eventActions } from '../../Containers/Event/eventSlice';
import ReportCommunityEvent from '../Organization/ReportCommunityEvent';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(6),
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  editContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  icon: {
    width: theme.spacing(2),
  },
  btnRoot: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    '&.MuiButton-root:hover': { backgroundColor: theme.palette.primary.light },
  },
  dialogTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipContainer: {
    display: 'flex',
    gap: theme.spacing(3),
  },
}));

const Event = (props) => {
  const {
    onLeaveClick,
    onJoinClick,
    userDetail,
    eventID,
    selectedEvent,
    selectedImage,
    setSelectedImage,
    uploadedImage,
    setUploadedImage,
    reports,
    disabled, // if the project is deactivated
  } = props;

  const dispatch = useDispatch();
  const classes = useStyles();

  const location = `Near ${userDetail?.location?.display_name}`;

  const [editMode, setEditMode] = useState(false);
  const [display, setDisplay] = useState({ status: false, value: '' });

  const toggleDrawer = (status) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDisplay({ status: status, value: 'notch' });
    dispatch(eventActions.getItemList({ eventID }));
  };

  const toggleDisplayMode = (value) => {
    setDisplay(value);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setUploadedImage(null);
    const input = document.querySelector('input[type="file"]');
    if (input) {
      input.value = ''; // Reset the value of the input to clear the selected file (if possible)
    }
  };

  const handleSubmit = async (eventID) => {
    dispatch(eventActions.updateEventImage({ selectedImage: uploadedImage, eventID: eventID }));
    enqueueSnackbar('Successfully uploaded new event picture.', {
      variant: 'success',
    });
    setSelectedImage(uploadedImage);
    toggleEditMode();
  };

  return (
    <Box className={classes.rootContainer}>
      <EventSplashDetails
        eventID={eventID}
        editMode={editMode}
        handleRemove={handleRemove}
        handleSubmit={handleSubmit}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        toggleEditMode={toggleEditMode}
      />
      {/* <EventItemDrawer
        display={display}
        disabled={disabled}
        userDetail={userDetail}
        toggleDrawer={toggleDrawer}
        shouldDisableViewItemList={shouldDisableViewItemList}
      /> */}
      <Box className={classes.container}>
        <Box className={classes.formContainer}>
          <Tooltip title={location} placement="top-start">
            <Typography variant="h5" data-tour="1">
              {userDetail?.title || ''}
            </Typography>
          </Tooltip>
          <Box className={classes.chipContainer} data-tour="2">
            <Tooltip title="Users who join the event are members of the event.">
              <Chip
                size="small"
                icon={<FaceRounded />}
                label={` ${userDetail?.sharable_groups.length || 0} members `}
              />
            </Tooltip>
            <Tooltip title="Users who agree to participate in the event.">
              <Chip size="small" icon={<FaceRounded />} label={` ${userDetail?.attendees.length || 0} attendees `} />
            </Tooltip>
          </Box>
          <div>
            <Button
              data-tour="3"
              className={classes.btnRoot}
              variant="text"
              color={userDetail?.userIsMember ? 'secondary' : 'primary'}
              onClick={userDetail?.userIsMember ? onLeaveClick : onJoinClick}
            >
              {userDetail?.userIsMember ? 'Leave Event' : 'Join Event'}
            </Button>
            <Tooltip title="Report issue or problem within this event. Also displays the number of reports made against this event. Report can be of various reasons however if emergency please stop and dial 911.">
              <IconButton
                disabled={disabled}
                data-tour="4"
                onClick={() => toggleDisplayMode({ status: !display.status, value: '' })}
              >
                <Badge badgeContent={reports?.length || 0} color="error" overlap="rectangular">
                  <BugReportRounded />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton
              data-tour="5"
              onClick={() => {
                toggleDisplayMode({
                  status: !display.status,
                  value: 'container',
                });
                // storage location is the place used to fill the item for each event. Eg, Kitchen cabinet, storage etc
                dispatch(eventActions.getStorageLocations(eventID));
              }}
            >
              <Tooltip title="Create sharable items that are able to be shared within members regardless of the event status.">
                <AddCircleRounded />
              </Tooltip>
            </IconButton>
            <IconButton onClick={toggleDrawer(!display.status)} data-tour="6">
              <Tooltip title="View list of current supplies for the selected event.">
                <ViewListRounded />
              </Tooltip>
            </IconButton>
          </div>
          {display.value === '' && (
            <Dialog aria-labelledby="simple-dialog-title" open={display.status}>
              <Title
                onClose={() => toggleDisplayMode({ status: false, value: '' })}
                className={classes.dialogTitleContainer}
              >
                Report Unusual Activity
              </Title>
              <ReportCommunityEvent
                events={[selectedEvent]}
                onClose={() => toggleDisplayMode({ status: false, value: '' })}
              />
            </Dialog>
          )}

          {display.value === 'container' && (
            <Dialog aria-labelledby="simple-dialog-title" open={display.status}>
              <Title
                onClose={() => toggleDisplayMode({ status: false, value: 'container' })}
                className={classes.dialogTitleContainer}
              >
                Add New Item
              </Title>
              <AddItemDetail eventID={eventID} userID={userDetail.userID} toggleDisplayMode={toggleDisplayMode} />
            </Dialog>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Event;
