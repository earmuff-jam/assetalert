import { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Signup from './Signup';
import { FaceRounded, PersonAddRounded } from '@mui/icons-material';
import Login from './Login';

const Authenticator = () => {
  const { loading, error } = useSelector((state) => state.auth);

  const [signUpView, setSignUpView] = useState(false);
  const hasServerError = !loading && error;

  return (
    <Stack sx={{ width: { xs: '100%', sm: '80%' } }}>
      <Typography variant="h5" color="error.main">
        Track all your assets in one place
      </Typography>
      <Stack spacing="1rem" marginBottom="1rem">
        <Typography>{signUpView ? 'Sign Up' : 'Sign In'}</Typography>
        {signUpView ? <Signup setSignUpView={setSignUpView} /> : <Login />}
      </Stack>
      <Typography variant="h5">{signUpView ? `Already have an account? ` : `Do not have an account? `}</Typography>
      <Typography variant="caption">
        {signUpView ? `Login to manage your account.` : `Keep an account to keep track of all your inventories`}
      </Typography>
      {hasServerError ? <span>Error</span> : null}
      <Button
        startIcon={signUpView ? <FaceRounded /> : <PersonAddRounded />}
        onClick={() => setSignUpView(!signUpView)}
      >
        {signUpView ? 'Login' : 'Create Account'}
      </Button>
    </Stack>
  );
};

export default Authenticator;
