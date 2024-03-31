import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import EmptyComponent from '../../util/EmptyComponent';
import SearchAllEvents from '../Event/SearchAllEvents';
import ViewFilteredEventList from './ViewFilteredEventList';
import { Typography, Grid, Box, Divider } from '@material-ui/core';
import LoadingSkeleton from '../../util/LoadingSkeleton';

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
    color: theme.palette.primary.main,
    fontSize: '1.125rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
  },
  errorText: {
    color: theme.palette.error.dark,
  },
  searchContainer: {
    alignSelf: 'start',
    width: '25%',
    paddingBottom: theme.spacing(1),
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

const ViewEventListDetails = ({ currentEvents, isLoading }) => {
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
  }, [searchValue, currentEvents]);

  if (isLoading || noAvailableProjects) {
    return <LoadingSkeleton width={`calc(100% - 1rem)`} height={'20rem'} />;
  }

  return (
    <Box className={classes.container} data-tour="4">
      <Typography gutterBottom className={classNames(classes.header, classes.errorText)}>
        View all active events
      </Typography>
      <Box className={classes.searchContainer}>
        <SearchAllEvents events={filteredOptions} setSearchValue={setSearchValue} />
      </Box>
      <Divider className={classes.divider} />
      {noAvailableProjects ? (
        <div className={classes.emptyProjectContainer}>
          <EmptyComponent />
        </div>
      ) : (
        <Grid container className={classes.cardContainer} data-tour="5">
          <ViewFilteredEventList filteredOptions={currentEvents} handleNavigate={handleNavigate} />
        </Grid>
      )}
    </Box>
  );
};

ViewEventListDetails.defaultProps = {
  currentEvents: [],
  isLoading: true,
};

ViewEventListDetails.propTypes = {
  currentEvents: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default ViewEventListDetails;
