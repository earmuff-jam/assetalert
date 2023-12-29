import React from 'react';
// import { makeStyles } from '@material-ui/styles';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.error.main,
    display: 'flex',
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
      <Typography className={classes.text}>
        Deactivated Event. Editing is prohibited.
      </Typography>
    </Box>
  );
};

export default SecondaryAppBar;
