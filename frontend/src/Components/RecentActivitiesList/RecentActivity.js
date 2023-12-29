import React from 'react';
import moment from 'moment';

import { ArrowRightRounded, DoneRounded } from '@material-ui/icons';
import { Avatar, Badge, Chip, Tooltip, Typography, makeStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2),
    gap: theme.spacing(1),
    backgroundColor: theme.palette.grey[200],
    marginBottom: theme.spacing(1),
    borderRadius: theme.spacing(0.4),
  },
  textColor: {
    paddingTop: theme.spacing(1),
    color: theme.palette.primary.main,
    fontSize: theme.spacing(1.5),
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(1.2),
  },
  chip: {
    fontSize: theme.spacing(1.5),
  },
  activityTitle: {
    color: '#555555',
  },
  activityDescription: {
    fontSize: theme.spacing(1.5),
  },
}));

const RecentActivity = ({ activity, usernameOrFullName }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.textColor}>
        {usernameOrFullName || 'Anonymous'} - {moment(activity.start_date || activity.created_at).fromNow()}
      </Typography>
      <Typography variant="h6" className={classes.activityTitle}>
        {activity.title}
      </Typography>
      <Typography className={classes.activityDescription}>{activity.comments}</Typography>
      <Typography gutterBottom>
        {activity.volunteer_hours && (
          <Tooltip title={`${activity.volunteer_hours} hrs volunteered`}>
            <Badge variant="dot" color="primary">
              <Chip className={classes.chip} size="small" label={activity.volunteeringActivity} />
            </Badge>
          </Tooltip>
        )}
      </Typography>
      <div className={classes.chipContainer}>
        {activity?.skills_required?.length > 1
          ? activity?.skills_required.map((v, index) => (
              <Chip size="small" className={classes.chip} key={index} label={v} />
            ))
          : null}
      </div>
    </div>
  );
};

export default RecentActivity;
