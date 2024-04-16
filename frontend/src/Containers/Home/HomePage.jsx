import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Paper } from '@material-ui/core';
import { homeActions } from './homeSlice';
import HomePageHeaderMap from '../../stories/Home/HomePageHeaderMap';
import CreateNewEvent from '../../stories/CreateNewEvent/CreateNewEvent';
import ViewEventListDetails from '../../Components/ViewEventsListDetails/ViewEventListDetails';

const useStyles = makeStyles((theme) => ({
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

  useEffect(() => {
    dispatch(homeActions.getUsername());
    dispatch(homeActions.getEvents());
    dispatch(homeActions.getCauseList());
    dispatch(homeActions.getProjectTypes());
    dispatch(homeActions.getAllStatesUS());
    // eslint-disable-next-line
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
          <HomePageHeaderMap eventList={currentEvents} isLoading={eventsLoading} />
        </Grid>
        <Grid item xs={12}>
          <ViewEventListDetails currentEvents={currentEvents} isLoading={eventsLoading} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
