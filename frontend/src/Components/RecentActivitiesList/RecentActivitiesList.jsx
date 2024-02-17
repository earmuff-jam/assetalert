import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import RecentActivity from './RecentActivity';
import EmptyComponent from '../../util/EmptyComponent';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(0, 1),
  },
  title: {
    margin: theme.spacing(2, 0),
    color: '#555555',
  },
  header: {
    backgroundColor: theme.palette.primary.light,
    color: '#fff',
  },
  tableContainer: {
    padding: theme.spacing(0, 3),
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const RecentActivitiesList = ({ usernameOrFullName }) => {
  const classes = useStyles();

  const { loading, recentActivities } = useSelector((state) => state.profile);

  if (loading) {
    return (
      <Box className={classes.spinnerContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Recent Activity
      </Typography>
      <Box>
        {recentActivities && recentActivities.length > 0 ? (
          recentActivities?.map((event, index) => (
            <RecentActivity key={index} activity={event} usernameOrFullName={usernameOrFullName} />
          ))
        ) : (
          <EmptyComponent shouldRedirect={true} path={'/'} subtitle="Create or volunteer for any event" />
        )}
      </Box>
    </Box>
  );
};

export default RecentActivitiesList;
