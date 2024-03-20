import { Box } from '@material-ui/core';
import RecentActivities from './RecentActivities';
import { makeStyles } from '@material-ui/core/styles';
import RecentTrophyCollections from './RecentTrophyCollections';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(0, 1),
    height: `calc(100vh - 20rem)`,
    overflow: 'auto',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: '0.925rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  recentActivitiesList: {
    flexGrow: 1,
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const RecentActivitiesListContainer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.contentContainer}>
        <RecentTrophyCollections />
        <Box className={classes.recentActivitiesList}>
          <RecentActivities />
        </Box>
      </Box>
    </Box>
  );
};

export default RecentActivitiesListContainer;
