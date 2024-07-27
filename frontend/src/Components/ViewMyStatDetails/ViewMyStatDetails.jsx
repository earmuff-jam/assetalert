import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Badge, Typography } from '@mui/material';
import { EmojiPeopleRounded, EventRounded } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing(1, 0),
  },
  title: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    color: '#555555',
  },
  text: {
    fontSize: theme.spacing(1.2),
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const ViewMyStatDetails = ({ createdEventsCount, volunteeringDetailsCount }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        {' '}
        My Stats
      </Typography>
      <div className={classes.rowContainer}>
        <div className={classes.statsContainer}>
          <Badge badgeContent={createdEventsCount} color="error" overlap="rectangular">
            <EventRounded />
          </Badge>
          <Typography className={classes.text}> Created Events</Typography>
        </div>
        <div className={classes.statsContainer}>
          <Badge badgeContent={volunteeringDetailsCount} color="error" overlap="rectangular">
            <EmojiPeopleRounded />
          </Badge>
          <Typography className={classes.text}> Volunteered Events</Typography>
        </div>
      </div>
    </div>
  );
};

export default ViewMyStatDetails;
