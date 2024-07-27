import PropTypes from 'prop-types';
import { LocationOnRounded } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  zeroPadding: {
    padding: theme.spacing(0),
  },
}));

const RetrieveUserLocation = ({ setLocation }) => {
  const classes = useStyles();
  const handleLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const foundCoordinates = { lat: position.coords.latitude || 0, long: position.coords.longitude || 0 };
      localStorage.setItem('client_location', JSON.stringify(foundCoordinates));
      return setLocation(foundCoordinates);
    });
  };

  return (
    <Tooltip title="Find approximate location">
      <IconButton
        onClick={handleLocation}
        disableRipple={true}
        className={classes.zeroPadding}
        data-tour="5"
        size="large">
        <LocationOnRounded />
      </IconButton>
    </Tooltip>
  );
};

RetrieveUserLocation.defaultProps = {
  setLocation: () => {},
};

RetrieveUserLocation.propTypes = {
  setLocation: PropTypes.func,
};

export default RetrieveUserLocation;
