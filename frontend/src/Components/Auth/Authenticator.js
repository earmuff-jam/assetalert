import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Chip, Box } from '@material-ui/core';

import Signup from './Signup';
import Login from './Login';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { EmojiPeopleRounded, FaceRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  text: {
    fontSize: '1.2rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
  },
  header: {
    fontSize: '1.6rem',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  errorText: {
    color: theme.palette.error.dark,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(0, 2),
  },
  warningText: {
    color: theme.palette.error.main,
  },
}));

const Authenticator = () => {
  const classes = useStyles();

  const { loading, error } = useSelector((state) => state.auth);
  const hasServerError = !loading && error;

  const [signUpView, setSignUpView] = useState(false);

  return (
    <Box className={classes.root}>
      <Typography className={classNames(classes.header, classes.errorText)}>Find meaning to volunteer</Typography>
      <Typography className={classes.text}>
        Sign up to be updated with events around your community. You can lend a hand, or even ask for one.
        <EmojiPeopleRounded />
      </Typography>
      <Typography className={classes.header}>{signUpView ? 'Sign Up' : 'Sign In'}</Typography>
      {signUpView ? <Signup /> : <Login />}
      <Typography variant="body1" className={classes.text}>
        {signUpView ? `Already have an account ?` : `Do not have an account ?`}
      </Typography>
      <div className={classes.row}>
        <Chip
          icon={<FaceRounded />}
          label={signUpView ? `Login` : `Create Account`}
          onClick={() => {
            setSignUpView(!signUpView);
          }}
          variant="outlined"
        />
        {hasServerError ? <span>Error</span> : null}
      </div>
    </Box>
  );
};

export default Authenticator;
