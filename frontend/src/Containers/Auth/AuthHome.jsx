import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Container } from '@material-ui/core';
import AppBar from '../../stories/AuthAppBar/AuthAppBar';
import AuthFooter from '../../stories/AuthFooter/AuthFooter';
import Authenticator from '../../stories/Authenticator/Authenticator';
import InviteSection from '../../stories/InviteSection/InviteSection';

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
    <Container maxWidth="lg">
      <AppBar title={'Mashed'} titleVariant={'h5'} elevation={0} />
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
  );
};

export default AuthHome;
