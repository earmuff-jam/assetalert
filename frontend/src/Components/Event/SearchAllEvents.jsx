import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Autocomplete } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import RetrieveUserLocation from './RetrieveUserLocation';
import { FiberManualRecordRounded } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '1.125rem',
    letterSpacing: '0.0125rem',
  },
  optionText: {
    fontSize: '0.825rem',
    letterSpacing: '0.0125rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusDot: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: theme.spacing(2),
    margin: '0 auto',
    alignSelf: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  warningStatusDot: {
    color: theme.palette.warning.main,
    backgroundColor: theme.palette.warning.main,
  },
  emptyGap: {
    flexGrow: 1,
  },
}));

const SearchAllEvents = ({ setLocation, events, setSearchValue }) => {
  const classes = useStyles();
  const [options, setOptions] = useState([]);

  const handleInputChange = (field, value) => {
    setSearchValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (events.length > 0) {
      setOptions([...events]);
    } else {
      setOptions([]);
    }
  }, [events]);

  return (
    <Box className={classes.rowContainer}>
      <RetrieveUserLocation setLocation={setLocation} />
      <Autocomplete
        id="search-events-autocomplete"
        fullWidth
        options={options}
        onChange={(e, value) => {
          const selectedEventId = value?.id || '';
          return handleInputChange('id', selectedEventId);
        }}
        getOptionLabel={(option) => option.title}
        renderOption={(params) => (
          <Box className={classes.columnContainer}>
            <Box className={classes.rowContainer}>
              <Typography className={classes.optionText}>{params.title}</Typography>
              <Box className={classes.emptyGap}></Box>
              <FiberManualRecordRounded
                className={classNames(classes.statusDot, { [classes.warningStatusDot]: params.deactivated })}
              />
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} placeholder="Search" variant="standard" className={classes.text} />
        )}
        forcePopupIcon={true}
      />
    </Box>
  );
};

SearchAllEvents.defaultProps = {
  events: [],
  setSearchValue: () => {},
  setLocation: () => {},
};

SearchAllEvents.propTypes = {
  events: PropTypes.array,
  setSearchValue: PropTypes.func,
  setLocation: PropTypes.func,
};

export default SearchAllEvents;
