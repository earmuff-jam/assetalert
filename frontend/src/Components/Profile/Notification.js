import React from 'react';
import { Box } from '@material-ui/core';
import NotificationCard from './NotificationCard';
import EmptyNotificationCard from './EmptyNotificationCard';

const Notification = ({ notifications }) => {
  return (
    <Box>
      {notifications?.length <= 0 ? <EmptyNotificationCard /> : <NotificationCard notifications={notifications} />}
    </Box>
  );
};

export default Notification;
