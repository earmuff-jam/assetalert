import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import NotificationCard from './NotificationCard';
import EmptyNotificationCard from './EmptyNotificationCard';

const Notification = ({ notifications, handleNotificationMenuSelect }) => {
  return (
    <Box>
      {notifications?.length <= 0 ? (
        <EmptyNotificationCard />
      ) : (
        <NotificationCard notifications={notifications} handleNotificationMenuSelect={handleNotificationMenuSelect} />
      )}
    </Box>
  );
};

Notification.defaultProps = {
  notifications: [],
  handleNotificationMenuSelect: () => {},
};

Notification.propTypes = {
  notifications: PropTypes.array,
  handleNotificationMenuSelect: PropTypes.func,
};

export default Notification;
