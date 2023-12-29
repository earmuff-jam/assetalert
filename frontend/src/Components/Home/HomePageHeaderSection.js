import { Typography, makeStyles } from '@material-ui/core';
import React from 'react';

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
