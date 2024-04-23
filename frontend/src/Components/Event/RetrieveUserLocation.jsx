import PropTypes from 'prop-types';
import { LocationOnRounded } from '@material-ui/icons';
import { IconButton, Tooltip, makeStyles } from '@material-ui/core';

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
      <IconButton onClick={handleLocation} disableRipple={true} className={classes.zeroPadding}>
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
