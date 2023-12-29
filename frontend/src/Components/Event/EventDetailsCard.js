import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import AddItemDetail from '../ItemDetail/AddItemDetail';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { LowPriorityRounded, SettingsRounded, CloseRounded, GroupRounded, BugReportRounded } from '@material-ui/icons';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Typography,
  IconButton,
  Dialog,
  Tooltip,
  Badge,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { eventActions } from '../../Containers/Event/eventSlice';
import Title from '../DialogComponent/Title';
import EventItemDrawer from './EventItemDrawer';
import ReportCommunityEvent from '../Organization/ReportCommunityEvent';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
  },
  header: {
    fontSize: '1.6rem',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
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

const EventDetailsCard = ({ disabled, userDetail, eventID, selectedEvent, reports, onLeave, onJoin }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [display, setDisplay] = useState(0);

  const handleViewItems = () => {
    setDisplay('View');
    dispatch(eventActions.getItemList({ eventID }));
  };

  const handleAddItem = () => {
    setDisplay('Add');
    dispatch(eventActions.getStorageLocations(eventID));
  };

  const handleReportEvent = () => {
    setDisplay('Report');
  };

  const toggleDrawer = (event) => {
    setDisplay(event);
    // only fetch api data first time load
    if (event) {
      dispatch(eventActions.getItemList({ eventID }));
    }
  };

  const shouldDisableViewItemList = (disabled, userDetail) => {
    if (disabled) {
      return true;
    }

    const user = userDetail?.userID;
    const sharableGroups = userDetail?.sharable_groups || [];

    if (sharableGroups.includes(user)) {
      return false;
    }
    return true;
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box className={classes.rowContainer}>
          <Box>
            <Typography className={classNames(classes.header, classes.errorText)} gutterBottom>
              {userDetail?.title || ''}
            </Typography>
            <Typography className={classes.text} gutterBottom>
              {userDetail?.description || 'Edit event details to add description'}
            </Typography>
          </Box>
          <Box className={classes.emptyGap}></Box>
          <Box>
            <Button
              data-tour="3"
              className={classes.btnRoot}
              variant="text"
              color={userDetail?.userIsMember ? 'error' : 'primary'}
              onClick={userDetail?.userIsMember ? onLeave : onJoin}
            >
              {userDetail?.userIsMember ? 'Leave Event' : 'Join Event'}
            </Button>

            <Tooltip title="Report issue or problem within this event. Also displays the number of reports made against this event. Report can be of various reasons however if emergency please stop and dial 911.">
              <IconButton disabled={disabled} onClick={handleReportEvent} data-tour="4">
                <Badge badgeContent={reports?.length || 0} color="error">
                  <BugReportRounded />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Configure event with custom settings">
              <IconButton>
                {/* settings to show the ability to leave event and / or volunteer event. */}
                <SettingsRounded />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box className={classNames(classes.rowContainer, classes.gutterBottom)}>
          <Tooltip title="Users who join the event are members of the event.">
            <Chip size="small" icon={<GroupRounded />} label={` ${userDetail?.sharable_groups.length || 0} members `} />
          </Tooltip>
          <Tooltip title="Users who agree to participate in the event.">
            <Chip size="small" icon={<GroupRounded />} label={` ${userDetail?.attendees.length || 0} attendees `} />
          </Tooltip>
        </Box>
        <Box className={classes.rowContainer}>
          {userDetail?.requiredSkills.map((v) => (
            <Chip size="small" icon={<LowPriorityRounded />} label={v} />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={handleAddItem}>Add Item</Button>
        <Button onClick={handleViewItems}>View Items</Button>
      </CardActions>
      <EventItemDrawer
        open={display === 'View'}
        disabled={disabled}
        userDetail={userDetail}
        toggleDrawer={toggleDrawer}
        shouldDisableViewItemList={shouldDisableViewItemList}
      />
      {display === 'Add' && (
        <Dialog open={display} width={'md'} fullWidth={true}>
          <Title onClose={() => setDisplay(0)}>Add New Item</Title>
          <AddItemDetail eventID={eventID} userID={userDetail.userID} setDisplayMode={setDisplay} />
        </Dialog>
      )}
      {display === 'Report' && (
        <Dialog open={display} width={'md'} fullWidth={true}>
          <Title onClose={() => setDisplay(0)}>Report Unusual Activity</Title>
          <ReportCommunityEvent events={[selectedEvent]} setDisplayMode={setDisplay} />
        </Dialog>
      )}
    </Card>
  );
};

export default EventDetailsCard;
