import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { WarningRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20rem',
    minHeight: '20rem',
  },
  subtitle: {
    fontSize: '0.925rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  icon: {
    color: theme.palette.primary.main,
  }
}));

const EmptyNotificationCard = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>
        <WarningRounded className={classes.icon}/>
      </Box>
      <Typography className={classes.subtitle}> No new notifications</Typography>
    </Box>
  );
};

export default EmptyNotificationCard;
