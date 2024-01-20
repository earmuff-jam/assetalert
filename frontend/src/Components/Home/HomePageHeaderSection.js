import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '1.6rem',
    fontWeight: 'lighter',
    textAlign: 'center',
    margin: theme.spacing(2, 0),
  },
}));

const HomePageHeaderSection = () => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.text} data-tour="1">
        Local Community Events Near You
      </Typography>
    </>
  );
};

export default HomePageHeaderSection;
