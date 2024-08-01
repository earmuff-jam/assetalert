import { LocationOnRounded } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

const RetrieveUserLocation = ({ setLocation }) => {
  const handleLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const foundCoordinates = { lat: position.coords.latitude || 0, lon: position.coords.longitude || 0 };
      localStorage.setItem('client_location', JSON.stringify(foundCoordinates));
      return setLocation(foundCoordinates);
    });
  };

  return (
    <Tooltip title="Assign approximate location">
      <IconButton onClick={handleLocation} disableRipple={true} size="small">
        <LocationOnRounded fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default RetrieveUserLocation;
