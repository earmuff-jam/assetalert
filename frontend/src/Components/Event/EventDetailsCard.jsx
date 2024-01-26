import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import AddItemDetail from '../ItemDetail/AddItemDetail';
import { LowPriorityRounded, GroupRounded, BugReportRounded, EditRounded, DoneRounded } from '@material-ui/icons';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Dialog,
  Tooltip,
  Badge,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { eventActions } from '../../Containers/Event/eventSlice';
import Title from '../DialogComponent/Title';
import ReportCommunityEvent from '../CommunityEvent/ReportCommunityEvent';
import EditCommunityEvent from '../CommunityEvent/EditCommunityEvent';
import { enqueueSnackbar } from 'notistack';
import { homeActions } from '../../Containers/Home/homeSlice';
import EventProfile from './EventProfile';
import { isEditingAllowed } from './constants';
import ViewItemDetail from '../ItemDetail/ViewItemDetail';
import Drawer from '../DrawerListComponent/Drawer';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  columnVariant: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: theme.spacing(0),
    },
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  emptyGap: {
    flexGrow: 1,
  },
  errorText: {
    color: theme.palette.error.dark,
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  btnRoot: {
    color: theme.palette.primary.main,
  },
  text: {
    fontSize: '0.925rem',
  },
}));

const EventDetailsCard = ({
  disabled,
  userDetail,
  handleUserDetail,
  userDetailError,
  eventID,
  isDeactivated,
  setIsDeactivated,
  selectedEvent,
  reports,
  onLeave,
  onJoin,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const editingAllowed = isEditingAllowed(disabled, userDetail);

  const [display, setDisplay] = useState(0);
  const [editMode, setEditMode] = useState(false); // editing general fields for select event

  const toggleEditMode = () => {
    if (editMode) {
      const editingTitleLength = userDetail.title.length || 0;
      const editingAllocatedMembersCount = userDetail.totalAllocatedMembers.length || 0;
      if (
        editingTitleLength <= 0 ||
        editingTitleLength >= 100 ||
        isNaN(userDetail.totalAllocatedMembers) ||
        (isNaN(editingAllocatedMembersCount) && Number(editingAllocatedMembersCount) > 0) ||
        Object.values(userDetailError).filter(Boolean).length > 0
      ) {
        enqueueSnackbar('Unable to update event.', {
          variant: 'error',
        });
        return;
      }
      // userID is retrieved from local storage
      const userID = localStorage.getItem('userID');
      // flushGeneralEventDetails updates only selected event reducer
      // homeActions.updateEvent will update the db, this gives us ability to view
      // data as a two way binding mechanism.
      dispatch(
        eventActions.flushGeneralEventDetails({
          id: userDetail.id,
          title: userDetail.title,
          deactivated: isDeactivated,
          comments: userDetail.comments,
          max_attendees: Number(userDetail.totalAllocatedMembers),
          updated_by: userID,
        })
      );
      dispatch(
        homeActions.updateEvent({
          ...userDetail,
          id: userDetail.id,
          title: userDetail.title,
          deactivated: isDeactivated,
          comments: userDetail.comments,
          max_attendees: Number(userDetail.totalAllocatedMembers),
          updated_by: userID,
        })
      );
      enqueueSnackbar('Sucessfully updated event', {
        variant: 'success',
      });
    }
    setEditMode(!editMode);
  };
  const handleViewItems = () => {
    setDisplay('View');
    dispatch(eventActions.getItemList({ eventID }));
  };
  const handleAddItem = () => {
    setDisplay('Add');
    dispatch(eventActions.getStorageLocations(eventID));
  };
  const handleReportEvent = () => setDisplay('Report');
  const toggleDrawer = (event) => {
    setDisplay(event);
    // only fetch api data first time load
    if (event) {
      dispatch(eventActions.getItemList({ eventID }));
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box className={classNames(classes.rowContainer, classes.columnVariant)}>
          <EventProfile userDetail={userDetail} />
          <Box className={classes.emptyGap}></Box>
          <Box>
            <Button
              data-tour="3"
              variant="text"
              className={classes.btnRoot}
              onClick={userDetail?.userIsMember ? onLeave : onJoin}
            >
              {userDetail?.userIsMember ? 'Leave Event' : 'Join Event'}
            </Button>

            <Tooltip title="Report issue or problem within this event. Also displays the number of reports made against this event. Report can be of various reasons however if emergency please stop and dial 911.">
              <IconButton disabled={disabled} onClick={handleReportEvent} data-tour="4">
                <Badge badgeContent={reports?.length || 0} color="error" overlap="rectangular">
                  <BugReportRounded />
                </Badge>
              </IconButton>
            </Tooltip>
            {!editingAllowed && (
              <Tooltip title={!editMode ? 'Edit event' : 'Save changes'}>
                <IconButton onClick={toggleEditMode}>
                  {!editMode ? <EditRounded /> : <DoneRounded color="primary" />}
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
        <Box className={classNames(classes.rowContainer, classes.gutterBottom)} data-tour="5">
          <Tooltip title="Users who join the event are members of the event.">
            <Chip size="small" icon={<GroupRounded />} label={` ${userDetail?.sharable_groups.length || 0} members `} />
          </Tooltip>
          <Tooltip title="Users who agree to participate in the event.">
            <Chip size="small" icon={<GroupRounded />} label={` ${userDetail?.attendees.length || 0} attendees `} />
          </Tooltip>
        </Box>
        <Box className={classNames((classes.rowContainer, classes.chipContainer))} data-tour="6">
          {userDetail?.requiredSkills.length > 0 &&
            userDetail?.requiredSkills[0] !== '' &&
            userDetail?.requiredSkills.map((v, index) => (
              <Chip key={index} size="small" icon={<LowPriorityRounded />} label={v} />
            ))}
        </Box>
        <CardActions>
          <Button disabled={!userDetail?.userIsMember} onClick={handleAddItem} data-tour="7">
            Add Item
          </Button>
          <Button onClick={handleViewItems} data-tour="8">
            View Items
          </Button>
        </CardActions>
        {editMode && (
          <EditCommunityEvent
            userDetail={userDetail}
            handleUserDetail={handleUserDetail}
            isDeactivated={isDeactivated}
            setIsDeactivated={setIsDeactivated}
          />
        )}
      </CardContent>
      <Drawer open={display === 'View'} toggleDrawer={toggleDrawer}>
        <ViewItemDetail disabled={editingAllowed} />
      </Drawer>
      {display === 'Add' && (
        <Dialog open width={'md'} fullWidth={true}>
          <Title onClose={() => setDisplay(0)}>Add New Item</Title>
          <AddItemDetail eventID={eventID} userID={userDetail.userID} setDisplayMode={setDisplay} />
        </Dialog>
      )}
      {display === 'Report' && (
        <Dialog open width={'md'} fullWidth={true}>
          <Title onClose={() => setDisplay(0)}>Report Unusual Activity</Title>
          <ReportCommunityEvent events={[selectedEvent]} setDisplayMode={setDisplay} />
        </Dialog>
      )}
    </Card>
  );
};

export default EventDetailsCard;
