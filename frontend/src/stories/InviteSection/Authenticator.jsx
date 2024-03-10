import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Box } from '@material-ui/core';

import Title from '../Title/Title';
import { useSelector } from 'react-redux';
import Login from '../../Components/Auth/Login';
import Signup from '../../Components/Auth/Signup';
import { FaceRounded, PersonAddRounded } from '@material-ui/icons';

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
  titleText: {
    fontSize: '1.2rem',
    fontWeight: 'lighter',
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
}));

const Authenticator = () => {
  const classes = useStyles();

  const { loading, error } = useSelector((state) => state.auth);
  const hasServerError = !loading && error;

  const [signUpView, setSignUpView] = useState(false);

  return (
    <Box className={classes.root}>
      <Title title={'Find meaning to volunteer'} displaySubtitle={'true'} />
      <Title title={signUpView ? 'Sign Up' : 'Sign In'} headingVariant={'general'} displaySubtitle={false} />
      {signUpView ? <Signup setSignUpView={setSignUpView} /> : <Login />}
      <Title
        title={signUpView ? `Already have an account ?` : `Do not have an account ?`}
        headingVariant={'general'}
        titleStyle={classes.titleText}
        displaySubtitle={false}
      />
      {hasServerError ? <span className={classes.errorText}>Error</span> : null}
      <div className={classes.row}>
        <Chip
          icon={signUpView ? <FaceRounded /> : <PersonAddRounded />}
          label={signUpView ? `Login` : `Create Account`}
          onClick={() => {
            setSignUpView(!signUpView);
          }}
          variant="outlined"
        />
      </div>
    </Box>
  );
};

export default Authenticator;
