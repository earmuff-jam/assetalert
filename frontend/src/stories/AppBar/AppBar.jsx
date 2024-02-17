// import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
  },
  text: {
    fontSize: '2.0rem',
    letterSpacing: '0.125rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
  },
  logo: {
    marginLeft: '1rem',
    width: '1rem',
    height: '1rem',
  },
}));

const AppBar = ({ title }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.appBar}>
      <Typography variant="h6" className={classes.text}>
        {title}
        <img src={'mashed-logo.png'} className={classes.logo} alt="company logo" />
      </Typography>
    </Paper>
  );
};

AppBar.defaultProps = {
  title: 'Mashed',
};

AppBar.propTypes = {
  title: PropTypes.string,
};

export default AppBar;
