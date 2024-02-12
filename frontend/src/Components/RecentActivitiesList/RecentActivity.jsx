import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Badge, Chip, Tooltip, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
    overflow: 'auto',
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
  dayjs.extend(relativeTime);

  return (
    <Box className={classes.root}>
      <Typography className={classes.textColor}>
        {usernameOrFullName || 'Anonymous'} - {dayjs(activity.updated_at).fromNow()}
      </Typography>
      <Typography variant="h6" className={classes.activityTitle}>
        {activity.title}
      </Typography>
      {activity?.comments && <Typography className={classes.activityDescription}>{activity.comments}</Typography>}
      <Box>
        {activity.volunteering_hours > 0 && (
          <Box>
            <Typography variant="h5" className={classes.textColor} gutterBottom>
              Volunteered on
            </Typography>
            <Tooltip title={`Total ${activity.volunteering_hours} hrs volunteered`} placement="top-start">
              <Box className={classes.chipContainer}>
                {activity?.volunteering_skill?.map((v) => (
                  <Chip className={classes.chip} size="small" label={v} />
                ))}
              </Box>
            </Tooltip>
          </Box>
        )}
      </Box>
      <Box>
        {activity?.skills_required?.length > 1 ? (
          <Box>
            <Typography variant="h5" className={classes.textColor} gutterBottom>
              Requested help on
            </Typography>
            <Box className={classes.chipContainer}>
              {activity?.skills_required.map((v, index) => (
                <Chip size="small" className={classes.chip} key={index} label={v} />
              ))}
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box>
        {activity?.expense_name?.length > 1 ? (
          <Box>
            <Typography variant="h5" className={classes.textColor} gutterBottom>
              Expense listed on
            </Typography>
            <Tooltip title={`Total ${activity.expense_amount} expenses accured`} placement="top-start">
              <Box className={classes.chipContainer}>
                {activity?.expense_name.map((v, index) => (
                  <Chip size="small" className={classes.chip} key={index} label={v} />
                ))}
              </Box>
            </Tooltip>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default RecentActivity;
