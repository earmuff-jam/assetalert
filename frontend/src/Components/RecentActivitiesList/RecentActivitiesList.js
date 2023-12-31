import React, { useEffect, useState } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import RecentActivity from './RecentActivity';
import EmptyComponent from '../../util/EmptyComponent';

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
}));

/**
 * to merge two array and produce a new array with combined tasks. existing event can have volunteering done by the same user.
 * In this case, we need to consolidate the data. if there is an existing volunteering done to an event, we register the count
 * and activity of the user and append it to the existing key value pair. we then append all createdEvents by appending to the
 * existing combinedActivitiesMap.
 *
 *
 * @param {array} createdEvents - events that the user created
 * @param {array} volunteeredEvents - events that the user volunteered upon
 * @returns {array} combinedArray - combines createdEvents and volunteeredEvents. adds hours and skill that the user volunteered on.
 */
export const mergeUserCreatedEventsVolunteers = (createdEvents = [], volunteeredEvents = []) => {
  const combinedActivitiesMap = new Map();
  volunteeredEvents.forEach((volunteerEvent) => {
    const eventID = volunteerEvent.eventID;
    if (eventID) {
      if (!combinedActivitiesMap.has(eventID)) {
        combinedActivitiesMap.set(eventID, { ...volunteerEvent });
      } else {
        const existingEvent = combinedActivitiesMap.get(eventID);
        existingEvent.volunteer_hours = volunteerEvent.volunteer_hours;
        existingEvent.volunteeringActivity = volunteerEvent.volunteeringActivity;
        combinedActivitiesMap.set(eventID, existingEvent);
      }
    }
  });
  createdEvents.forEach((createdEvent) => {
    const eventID = createdEvent.id;
    if (eventID) {
      combinedActivitiesMap.set(eventID, { ...createdEvent, ...(combinedActivitiesMap.get(eventID) || {}) });
    }
  });
  const result = Array.from(combinedActivitiesMap.values());
  return result;
};

const RecentActivitiesList = ({ userCreatedEvents, volunteeringDetails, usernameOrFullName }) => {
  const classes = useStyles();

  const [combinedActivities, setCombinedActivities] = useState([]);

  useEffect(() => {
    const result = mergeUserCreatedEventsVolunteers(userCreatedEvents, volunteeringDetails);
    setCombinedActivities(result);
  }, [userCreatedEvents, volunteeringDetails]);

  if (combinedActivities?.length <= 0) {
    return <EmptyComponent shouldRedirect={true} path={'/'} subtitle="Create or volunteer for any event" />;
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Recent Activity
      </Typography>
      <Box>
        {combinedActivities?.map((event, index) => (
          <RecentActivity key={index} activity={event} usernameOrFullName={usernameOrFullName} />
        ))}
      </Box>
    </Box>
  );
};

export default RecentActivitiesList;
