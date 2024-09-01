import { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Signup from './Signup';
import { FaceRounded, PersonAddRounded } from '@mui/icons-material';
import Login from './Login';
import SimpleModal from '../common/SimpleModal';
import PwdReset from './PwdReset/PwdReset';

const Authenticator = () => {
  const { loading, error } = useSelector((state) => state.auth);

  const [signUpView, setSignUpView] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  const handleClose = () => setDisplayModal(false);

  const hasServerError = !loading && error;

  return (
    <>
      <Stack sx={{ width: { xs: '100%', sm: '80%' } }}>
        <Typography variant="h5" color="error.main">
          Track all your assets in one place
        </Typography>
        <Stack spacing="1rem" marginBottom="1rem">
          <Typography>{signUpView ? 'Sign Up' : 'Sign In'}</Typography>
          {signUpView ? <Signup setSignUpView={setSignUpView} /> : <Login />}
        </Stack>
        <Typography variant="h5">{signUpView ? 'Already have an account ?' : 'Do not have an account ? '}</Typography>
        <Stack direction="row" alignItems="center" spacing="0.1rem">
          <Typography variant="caption">
            {signUpView ? 'Login to manage your account.' : 'Keep an account to keep track of all your inventories.'}
          </Typography>
          <Typography variant="caption" sx={{ cursor: 'pointer', color: 'primary.main' }} onClick={setDisplayModal}>
            Forgot password
          </Typography>
        </Stack>
        {hasServerError ? <span>Error</span> : null}
        <Button
          startIcon={signUpView ? <FaceRounded /> : <PersonAddRounded />}
          onClick={() => setSignUpView(!signUpView)}
        >
          {signUpView ? 'Login' : 'Create Account'}
        </Button>
      </Stack>
      {displayModal && (
        <SimpleModal title="Forgot password" handleClose={handleClose} maxSize="md">
          <PwdReset handleCloseModal={handleClose} />
        </SimpleModal>
      )}
    </>
  );
};

export default Authenticator;
