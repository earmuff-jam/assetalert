import React, { useEffect, useState } from 'react';
import { Typography, Grid, makeStyles, CircularProgress, Box } from '@material-ui/core';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import EmptyComponent from '../../util/EmptyComponent';
import ViewFilteredEventList from './ViewFilteredEventList';
import SearchAllEvents from '../Organization/SearchAllEvents';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    fontSize: '1.6rem',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: theme.palette.error.dark,
  },
  searchContainer: {
    alignSelf: 'center',
    width: '100%',
    paddingBottom: theme.spacing(1),
  },
  text: {
    fontSize: '1.2rem',
    fontWeight: 'lighter',
    margin: theme.spacing(2, 0),
    color: theme.palette.text.secondary,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    justifyContent: 'center',
  },
  emptyProjectContainer: {
    margin: 'auto',
    width: '50%',
    padding: theme.spacing(7, 0),
  },
}));

const BLANK_AUTOCOMPLETE_FORM = {
  id: '',
};

const ViewEventListDetails = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currentEvents, loading } = props;

  const noAvailableProjects = currentEvents.length <= 0;
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchValue, setSearchValue] = useState(BLANK_AUTOCOMPLETE_FORM);

  const handleNavigate = (eventID) => {
    navigate(`/${eventID}`);
  };

  useEffect(() => {
    if (searchValue?.id) {
      const filteredEvent = currentEvents?.filter((v) => v.id === searchValue.id);
      setFilteredOptions(filteredEvent);
    } else {
      const filteredEventByActivation = currentEvents?.filter((v) => !v.is_activated); // is_activated should have been is_deactivated
      setFilteredOptions(filteredEventByActivation);
    }
  }, [searchValue, currentEvents]);

  if (loading) {
    return (
      <Box className={classes.spinnerContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.container}>
      <Typography gutterBottom className={classNames(classes.header, classes.errorText)}>
        View all active events
      </Typography>
      <Box className={classes.searchContainer}>
        <SearchAllEvents events={currentEvents} setSearchValue={setSearchValue} />
      </Box>
      {noAvailableProjects ? (
        <div className={classes.emptyProjectContainer}>
          <EmptyComponent />
        </div>
      ) : (
        <Grid container className={classes.cardContainer} data-tour="5">
          <ViewFilteredEventList filteredOptions={filteredOptions} handleNavigate={handleNavigate} />
        </Grid>
      )}
    </Box>
  );
};

export default ViewEventListDetails;
