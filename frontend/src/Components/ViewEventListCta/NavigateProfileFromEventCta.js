import React, { useState } from 'react';

import Title from '../DialogComponent/Title';
import { Box, Button, Dialog, Typography, makeStyles } from '@material-ui/core';
import AddCommunityEvent from '../AddCommunityEvent/AddCommunityEvent';
import { useNavigate } from 'react-router-dom';

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
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const NavigateProfileFromEventCta = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.container}>
      <Typography className={classes.text} gutterBottom>
        Explore the profile page for customization for reports. You can also change your settings in the profile page.
      </Typography>
      <Button onClick={() => navigate('/profile')}> View profile </Button>
    </Box>
  );
};

export default NavigateProfileFromEventCta;
