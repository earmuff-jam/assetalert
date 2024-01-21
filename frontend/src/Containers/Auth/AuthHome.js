import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Container, Paper, Typography } from '@material-ui/core';
import AuthFooter from '../../Components/Auth/AuthFooter';
import Authenticator from '../../Components/Auth/Authenticator';
import AuthHeroSection from '../../Components/Auth/AuthHeroSection';

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
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
    color: theme.palette.common.black,
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
        <Paper className={classes.appBar}>
          <Typography variant="h6" className={classes.text}>
            Mashed
            <img src={`${process.env.PUBLIC_URL}/mashed-logo.png`} className={classes.logo} alt="company logo" />
          </Typography>
        </Paper>
        <Grid container className={classes.root}>
          <Grid item xs={12} md={6}>
            <Box>
              <AuthHeroSection />
            </Box>
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
