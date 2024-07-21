import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import { Paper, Typography } from '@mui/material';
import { BarChartRounded } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(0, 2),
    borderRadius: theme.spacing(0),
  },
  text: {
    fontSize: '2.0rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
  },
  logo: {
    display: 'flex',
    alignSelf: 'end',
    width: '1rem',
    height: '1rem',
    paddingBottom: '0.3rem',
    color: theme.palette.primary.main,
  },
}));

const AuthAppBar = ({ title, titleVariant, elevation }) => {
  const classes = useStyles();

  return (
    <Paper elevation={elevation} className={classes.root}>
      <Typography variant={titleVariant} className={classes.text}>
        {title}
      </Typography>
      <BarChartRounded className={classes.logo} />
    </Paper>
  );
};

AuthAppBar.defaultProps = {
  title: 'Mashed',
  titleVariant: 'h5',
  elevation: 0,
};

AuthAppBar.propTypes = {
  title: PropTypes.string,
  titleVariant: PropTypes.string,
  elevation: PropTypes.number,
};

export default AuthAppBar;
