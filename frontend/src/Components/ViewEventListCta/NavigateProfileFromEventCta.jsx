import React from 'react';
import { useNavigate } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Button, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  text: {
    fontSize: '0.925rem',
  },
}));

const NavigateProfileFromEventCta = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.container}>
      <Typography className={classes.text} gutterBottom>
        Explore options to change your profile and avatars.
      </Typography>
      <Button onClick={() => navigate('/profile')}> View profile </Button>
    </Box>
  );
};

export default NavigateProfileFromEventCta;
