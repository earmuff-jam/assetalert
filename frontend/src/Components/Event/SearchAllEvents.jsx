import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { FiberManualRecordRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Typography } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '1.125rem',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
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
    gap: theme.spacing(1),
    alignItems: 'start',
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

const SearchAllEvents = ({ events, setSearchValue }) => {
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
        <TextField {...params} label="Search ... " variant="standard" className={classes.text} />
      )}
    />
  );
};

export default SearchAllEvents;
