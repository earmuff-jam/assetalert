import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Title from '../TitleComponent/Title';
import { useSelector } from 'react-redux';
import Signup from './Signup';
import { FaceRounded, PersonAddRounded } from '@mui/icons-material';
import ChipComponent from '../ChipComponent/ChipComponent';
import Login from './Login';

const Authenticator = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const hasServerError = !loading && error;

  const [signUpView, setSignUpView] = useState(false);

  return (
    <Stack width="80rem" spacing="1rem">
      <Typography variant="h5" color="error.main">
        Find meaning to volunteer
      </Typography>
      <Typography variant="caption">
        Sign up to be updated with events around your community. You can lend a hand, or even ask for one.
      </Typography>
      <Typography>{signUpView ? 'Sign Up' : 'Sign In'}</Typography>
      {signUpView ? <Signup setSignUpView={setSignUpView} /> : <Login />}
      <Title
        title={signUpView ? `Already have an account ?` : `Do not have an account ?`}
        headingVariant={'general'}
        titleStyle={{}}
        displaySubtitle={false}
      />
      {hasServerError ? <span>Error</span> : null}
      <Box>
        <ChipComponent
          icon={signUpView ? <FaceRounded /> : <PersonAddRounded />}
          label={signUpView ? 'Login' : 'Create Account'}
          onClick={() => setSignUpView(!signUpView)}
          variant={'outlined'}
        />
      </Box>
    </Stack>
  );
};

export default Authenticator;
