import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Signup from './Signup';
import { FaceRounded, PersonAddRounded } from '@mui/icons-material';
import Login from './Login';

const Authenticator = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const hasServerError = !loading && error;

  const [signUpView, setSignUpView] = useState(false);

  return (
    <Stack width="80rem">
      <Typography variant="h5" color="error.main">
        Find meaning to your assets
      </Typography>
      <Stack spacing="1rem" sx={{ my: 2 }}>
        <Typography>{signUpView ? 'Sign Up' : 'Sign In'}</Typography>
        {signUpView ? <Signup setSignUpView={setSignUpView} /> : <Login />}
      </Stack>
      <Typography variant="h5">{signUpView ? `Already have an account ?` : `Do not have an account ?`}</Typography>
      <Typography variant="caption">
        {signUpView ? `Login to manage your account.` : `Create an account to keep track of all your inventories`}
      </Typography>
      {hasServerError ? <span>Error</span> : null}
      <Box>
        <Button onClick={() => setSignUpView(!signUpView)}>
          <Stack direction="row" gap="1rem">
            {signUpView ? <FaceRounded /> : <PersonAddRounded />}
            {signUpView ? 'Login' : 'Create Account'}
          </Stack>
        </Button>
      </Box>
    </Stack>
  );
};

export default Authenticator;
