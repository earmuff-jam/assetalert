import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.main,
    display: 'flex',
    width: 'inherit',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: theme.spacing(1.8),
    color: theme.palette.common.white,
  },
}));

const SecondaryAppBar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.text}>Deactivated Event. Editing is prohibited.</Typography>
    </Box>
  );
};

export default SecondaryAppBar;
