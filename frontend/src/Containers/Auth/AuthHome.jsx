import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Container, Paper, Typography } from '@material-ui/core';
import AuthFooter from '../../Components/Auth/AuthFooter';
import Authenticator from '../../stories/InviteSection/Authenticator';
import AuthHeroSection from '../../Components/Auth/AuthHeroSection';
import InviteSection from '../../stories/InviteSection/InviteSection';
import AppBar from '../../stories/AppBar/AppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100%',
  },
  auth: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.1),
    },
  },
  appBar: {
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
  },
  text: {
    fontSize: '2.0rem',
    letterSpacing: '0.125rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
  },
  logo: {
    marginLeft: '1rem',
    width: '1rem',
    height: '1rem',
  },
}));

const AuthHome = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg">
        <AppBar />
        <Grid container className={classes.root}>
          <Grid item xs={12} md={6}>
            <InviteSection />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.auth}>
              <Authenticator />
            </Box>
          </Grid>
        </Grid>
        <AuthFooter />
      </Container>
    </>
  );
};

export default AuthHome;
