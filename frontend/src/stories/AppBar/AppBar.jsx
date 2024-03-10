import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 1),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(0),
    backgroundColor: theme.palette.common.white,
  },
  text: {
    fontSize: '2.0rem',
    letterSpacing: '0.125rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
  },
  logo: {
    marginLeft: '0.2rem',
    width: '1rem',
    height: '1rem',
  },
}));

const AppBar = ({ title, titleVariant, elevation }) => {
  const classes = useStyles();

  return (
    <Paper elevation={elevation} className={classes.root}>
      <Typography variant={titleVariant} className={classes.text}>
        {title}
        <img src={'mashed-logo.png'} className={classes.logo} alt="company logo" />
      </Typography>
    </Paper>
  );
};

AppBar.defaultProps = {
  title: 'Mashed',
  titleVariant: 'h6',
  elevation: 0,
};

AppBar.propTypes = {
  title: PropTypes.string,
  titleVariant: PropTypes.string,
  elevation: PropTypes.string,
};

export default AppBar;
