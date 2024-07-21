import { useState } from 'react';
import { Box, Stack } from '@mui/material';
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
    <Stack>
      <Title title={'Find meaning to volunteer'} displaySubtitle={true} />
      <Title title={signUpView ? 'Sign Up' : 'Sign In'} headingVariant={'general'} displaySubtitle={false} />
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
