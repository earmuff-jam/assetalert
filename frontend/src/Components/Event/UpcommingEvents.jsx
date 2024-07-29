import { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Box, IconButton } from '@mui/material';
import { TurnedInRounded, TurnedInNotRounded, PersonAddRounded, DoneRounded } from '@mui/icons-material';

import dayjs from 'dayjs';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import relativeTime from 'dayjs/plugin/relativeTime';
import { updateCommunityEventDetails } from '../../actions';

const useStyles = makeStyles((theme) => ({
  eventBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
  },
  eventBarOnSelection: {
    transition: 'box-shadow 0.3s ease',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
  },
  eventName: {
    fontWeight: 'bold',
    fontSize: theme.spacing(2.2),
    marginRight: theme.spacing(2),
  },
  iconButton: {
    padding: 0,
    margin: 0,
  },
  teaser: {
    fontStyle: 'italic',
  },
}));

const UpcommingEvents = (props) => {
  const { event, selectedUserEmail, handleSelectedEvent, selectedEvent } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);

  const [isJoined, setIsJoined] = useState(false);
  const [isUserRegisteredEvent, setIsUserRegisteredEvent] = useState(false);

  const handleSetIsJoined = () => {
    const request = { eventID: event.id, userEmail: selectedUserEmail };
    dispatch(updateCommunityEventDetails(request));
    setIsJoined(!isJoined);
  };

  const handleSetIsUserRegisteredEvent = () => setIsUserRegisteredEvent(!isUserRegisteredEvent);

  useEffect(() => {
    const found = event.attendees?.filter((v) => v === selectedUserEmail).length > 0;
    setIsJoined(found);
  }, [selectedUserEmail, event.attendees]);

  return (
    <div
      className={classNames(classes.eventBar, {
        [classes.eventBarOnSelection]: selectedEvent.id === event.id,
      })}
      onClick={(ev) => handleSelectedEvent(ev, event)}
    >
      <div>
        <div className={classes.eventName}>{event.name}</div>
        <span>
          Starts {dayjs(event.date).fromNow()} • {event.location}
        </span>
        <br />
        <span className={classes.teaser}> {event.teaser}</span>
      </div>
      <Box>
        <IconButton
          className={classes.iconButton}
          disabled={isJoined}
          onClick={() => handleSetIsJoined()}
          size="large">
          {isJoined ? <DoneRounded color="primary" /> : <PersonAddRounded color="primary" />}
        </IconButton>
        <IconButton
          className={classes.iconButton}
          onClick={() => handleSetIsUserRegisteredEvent()}
          size="large">
          {isUserRegisteredEvent ? <TurnedInRounded color="primary" /> : <TurnedInNotRounded color="primary" />}
        </IconButton>
      </Box>
    </div>
  );
};

export default UpcommingEvents;
