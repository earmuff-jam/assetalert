import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import { Box, List, ListItem, ListItemText } from '@mui/material';

import dayjs from 'dayjs';
import classNames from 'classnames';
import { InfoRounded } from '@mui/icons-material';
import relativeTime from 'dayjs/plugin/relativeTime';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: '16rem',
    maxHeight: '20rem',
  },
  text: {
    fontSize: '0.725rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  captionText: {
    fontSize: '0.625rem',
    fontWeight: 'lighter',
    color: theme.palette.text.secondary,
  },
  bold: {
    fontWeight: 'bold',
  },
  italics: {
    fontStyle: 'italic',
  },
  icon: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  notificationViewed: {
    color: theme.palette.grey[400],
  },
  list: {
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  listItem: {
    margin: 0,
  },
}));

const NotificationCard = ({ notifications, handleNotificationMenuSelect }) => {
  const classes = useStyles();
  dayjs.extend(relativeTime);

  return (
    <Box className={classes.root}>
      <List dense={true}>
        {notifications?.map((v) => (
          <ListItem key={v.id} className={classes.list} button onClick={() => handleNotificationMenuSelect(v.id)}>
            <InfoRounded className={classNames(classes.icon, { [classes.notificationViewed]: v.is_viewed })} />
            <ListItemText
              classes={{
                primary: classNames(classes.text, classes.bold),
                secondary: classNames(classes.captionText, classes.italics),
                root: classNames(classes.listItem),
              }}
              primary={v.title}
              secondary={`${v.creator_name || 'Viewed'} around ${dayjs(v.updated_at).fromNow()}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

NotificationCard.defaultProps = {
  notifications: [],
  handleNotificationMenuSelect: () => {},
};

NotificationCard.propTypes = {
  notifications: PropTypes.array,
  handleNotificationMenuSelect: PropTypes.func,
};

export default NotificationCard;
