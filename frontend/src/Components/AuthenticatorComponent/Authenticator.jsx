import { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/material';
import Title from '../TitleComponent/Title';
import { useSelector } from 'react-redux';
import Signup from './Signup';
import { FaceRounded, PersonAddRounded } from '@mui/icons-material';
import ChipComponent from '../ChipComponent/ChipComponent';
import Login from './Login';

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
    fontSize: '0.975rem',
  },
  errorText: {
    fontWeight: 'bold',
    color: theme.palette.error.dark,
  },
  leftAlignContent: {
    display: 'flex',
    alignSelf: 'inherit',
  },
}));

const Authenticator = () => {
  const classes = useStyles();

  const { loading, error } = useSelector((state) => state.auth);
  const hasServerError = !loading && error;

  const [signUpView, setSignUpView] = useState(false);

  return (
    <Box className={classes.root}>
      <Title title={'Find meaning to volunteer'} displaySubtitle={true} />
      <Title title={signUpView ? 'Sign Up' : 'Sign In'} headingVariant={'general'} displaySubtitle={false} />
      {signUpView ? <Signup setSignUpView={setSignUpView} /> : <Login />}
      <Title
        title={signUpView ? `Already have an account ?` : `Do not have an account ?`}
        headingVariant={'general'}
        titleStyle={classes.titleText}
        displaySubtitle={false}
      />
      {hasServerError ? <span className={classes.errorText}>Error</span> : null}
      <Box className={classes.leftAlignContent}>
        <ChipComponent
          icon={signUpView ? <FaceRounded /> : <PersonAddRounded />}
          label={signUpView ? 'Login' : 'Create Account'}
          onClick={() => setSignUpView(!signUpView)}
          variant={'outlined'}
        />
      </Box>
    </Box>
  );
};

export default Authenticator;
