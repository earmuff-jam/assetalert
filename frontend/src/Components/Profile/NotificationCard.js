import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { DoneRounded, InfoRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: '20rem',
    maxHeight: '20rem',
  },
  text: {
    fontSize: '0.725rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  subtitle: {
    fontSize: '0.925rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
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

const NotificationCard = ({ notifications }) => {
  const classes = useStyles();

  const handleClick = () => {
    // should set the isViewed to true in the db
  };
  return (
    <Box className={classes.root}>
      <List dense={true}>
        {notifications?.map((v) => (
          <ListItem key={v.id} className={classes.list} button onClick={handleClick}>
            <InfoRounded className={classNames(classes.icon, { [classes.notificationViewed]: v.is_viewed })} />
            <ListItemText
              classes={{
                primary: classNames(classes.text, classes.bold),
                secondary: classNames(classes.text, classes.italics),
                root: classNames(classes.listItem),
              }}
              primary={v.title}
              secondary={`${v.creator_name} at ${v.created_at}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NotificationCard;
