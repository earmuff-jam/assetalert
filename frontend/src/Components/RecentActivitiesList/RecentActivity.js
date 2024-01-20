import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Badge, Chip, Tooltip, Typography } from '@material-ui/core';

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
      {activity?.comments && <Typography className={classes.activityDescription}>{activity.comments}</Typography>}
      <Box>
        {activity.volunteer_hours && (
          <Box>
            <Typography variant="h5" className={classes.textColor} gutterBottom>
              Volunteered on
            </Typography>
            <Tooltip title={`${activity.volunteer_hours} hrs volunteered`}>
              <Badge variant="dot" color="primary" overlap="rectangular">
                <Chip className={classes.chip} size="small" label={activity.volunteeringActivity} />
              </Badge>
            </Tooltip>
          </Box>
        )}
      </Box>
      <div>
        {activity?.skills_required?.length > 1 ? (
          <Box>
            <Typography variant="h5" className={classes.textColor} gutterBottom>
              Requested help on
            </Typography>
            <div className={classes.chipContainer}>
              {activity?.skills_required.map((v, index) => (
                <Chip size="small" className={classes.chip} key={index} label={v} />
              ))}
            </div>
          </Box>
        ) : null}
      </div>
    </div>
  );
};

export default RecentActivity;
