import PropTypes from 'prop-types';
import { Box, TextField, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    gap: theme.spacing(2),
  },
  text: {
    color: theme.palette.primary.main,
    fontSize: '0.725rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
  },
}));

const ViewSharableGroups = ({ selectedEvent, setEditSharableGroups }) => {
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [sharableGroups, setSharableGroups] = useState([]);

  useEffect(() => {
    setOptions(selectedEvent?.sharable_groups || []);
  }, [selectedEvent]);

  return (
    <Box className={classes.container}>
      <Autocomplete
        multiple
        options={options}
        value={sharableGroups}
        onChange={(event, newValue) => {
          setSharableGroups(newValue);
        }}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Share with other people ..."
            placeholder="Currently sharing with ..."
          />
        )}
      />
      <Box className={classes.rowContainer}>
        <ButtonComponent text={'Save'} />
        <ButtonComponent text={'Cancel'} onClick={() => setEditSharableGroups(false)} />
      </Box>
    </Box>
  );
};

ViewSharableGroups.defaultProps = {
  selectedEvent: {},
  setEditSharableGroups: () => {},
};

ViewSharableGroups.propTypes = {
  selectedEvent: PropTypes.object,
  setEditSharableGroups: PropTypes.func,
};

export default ViewSharableGroups;
