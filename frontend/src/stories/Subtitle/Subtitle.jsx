import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '1.2rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
  },
}));

const Subtitle = ({ subtitle, showIcon, icon }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.text}>
      {subtitle}
      {showIcon ? icon : null}
    </Typography>
  );
};

Subtitle.defaultProps = {
  subtitle: 'Mashed',
  showIcon: false,
  icon: {},
};

Subtitle.propTypes = {
  subtitle: PropTypes.string,
  showIcon: PropTypes.bool,
  icon: PropTypes.object,
};

export default Subtitle;
