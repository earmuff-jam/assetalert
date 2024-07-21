import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '0.975rem',
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
