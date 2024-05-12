import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import EmptyComponent from '../../util/EmptyComponent';
import SearchAllEvents from '../Event/SearchAllEvents';
import LoadingSkeleton from '../../util/LoadingSkeleton';
import ViewFilteredEventList from './ViewFilteredEventList';
import { Typography, Grid, Box, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: `calc(100% - 2rem)`,
    margin: '0 auto',
  },
  header: {
    fontSize: '1.6rem',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
  },
  errorText: {
    color: theme.palette.error.dark,
  },
  searchContainer: {
    alignSelf: 'start',
    width: '25%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
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
  divider: {
    margin: theme.spacing(2),
  },
}));

const BLANK_AUTOCOMPLETE_FORM = {
  id: '',
};

const ViewEventListDetails = ({ setLocation, currentEvents, isLoading }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const noAvailableProjects = currentEvents.length <= 0;
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchValue, setSearchValue] = useState(BLANK_AUTOCOMPLETE_FORM);

  const handleNavigate = (eventID) => {
    navigate(`/${eventID}`);
  };

  useEffect(() => {
    if (isLoading) return;
    if (searchValue?.id) {
      const filteredEvent = currentEvents?.filter((v) => v.id === searchValue.id);
      setFilteredOptions(filteredEvent);
    } else {
      const filteredEventByActivation = currentEvents?.filter((v) => !v.deactivated);
      setFilteredOptions(filteredEventByActivation);
    }
    // eslint-disable-next-line
  }, [searchValue, currentEvents]);

  if (isLoading) {
    return <LoadingSkeleton width={`calc(100% - 1rem)`} height={'20rem'} />;
  }

  if (noAvailableProjects) {
    return <EmptyComponent subtitle={'Create new event to begin'} />;
  }

  return (
    <Box className={classes.root}>
      <Typography gutterBottom className={classNames(classes.header, classes.errorText)}>
        View all events
      </Typography>
      <Box className={classes.searchContainer} data-tour="4">
        <SearchAllEvents events={currentEvents} setSearchValue={setSearchValue} setLocation={setLocation} />
      </Box>
      <Divider className={classes.divider} />
      {noAvailableProjects ? (
        <div className={classes.emptyProjectContainer}>
          <EmptyComponent />
        </div>
      ) : (
        <Grid container className={classes.cardContainer} data-tour="6">
          <ViewFilteredEventList filteredOptions={filteredOptions} handleNavigate={handleNavigate} />
        </Grid>
      )}
    </Box>
  );
};

ViewEventListDetails.defaultProps = {
  currentEvents: [],
  isLoading: true,
  setLocation: () => {},
};

ViewEventListDetails.propTypes = {
  currentEvents: PropTypes.array,
  isLoading: PropTypes.bool,
  setLocation: PropTypes.func,
};

export default ViewEventListDetails;
