import { homeActions } from './homeSlice';
import { useEffect, useState } from 'react';
import { Grid, Box, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';
import CreateNewEvent from '../../Components/Home/CreateNewEvent';
import HomePageHeaderMap from '../../Components/Home/HomePageHeaderMap';
import ViewEventListDetails from '../../Components/ViewEventsListDetails/ViewEventListDetails';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: `calc(100% - 2rem)`,
    minHeight: '100vh',
    margin: '0 auto',
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading: eventsLoading, events } = useSelector((state) => state.home);
  const currentEvents = (!eventsLoading && events) || [];

  const [location, setLocation] = useState({ lat: 0, long: 0 });

  useEffect(() => {
    dispatch(homeActions.getUsername());
    dispatch(homeActions.getEvents());
    dispatch(homeActions.getCauseList());
    dispatch(homeActions.getProjectTypes());
    dispatch(homeActions.getAllStatesUS());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const clientLocationCoordinates = localStorage.getItem('client_location');
    const parsedClientLocationCoordinates = JSON.parse(clientLocationCoordinates);
    setLocation(parsedClientLocationCoordinates);
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={6} data-tour="0">
          <Paper>
            <CreateNewEvent />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} data-tour="2">
          <HomePageHeaderMap eventList={currentEvents} isLoading={eventsLoading} location={location} />
        </Grid>
        <Grid item xs={12}>
          <ViewEventListDetails currentEvents={currentEvents} isLoading={eventsLoading} setLocation={setLocation} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
