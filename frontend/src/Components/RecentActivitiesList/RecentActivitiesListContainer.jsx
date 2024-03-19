import {
  EmojiEventsRounded,
  HighlightOffRounded,
  ReportRounded,
  LocalAtmRounded,
  TrackChangesRounded,
} from '@material-ui/icons';
import RecentItemTabs from './RecentItemTabs';
import RecentActivities from './RecentActivities';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Typography } from '@material-ui/core';

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
  profileContent: {
    display: 'flex',
    flexDirection: 'column',
    width: theme.spacing(32),
    padding: theme.spacing(1),
    gap: theme.spacing(1),
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

  const data = [
    {
      id: 1,
      title: 'Created Events',
      icon: <EmojiEventsRounded color="primary" />,
      tooltipPlacement: 'left-start',
      count: 10,
    },
    {
      id: 2,
      title: 'Volunteered Events',
      icon: <TrackChangesRounded color="error" />,
      tooltipPlacement: 'left-start',
      count: 2,
    },
    {
      id: 3,
      title: 'Issues Reported',
      icon: <ReportRounded color="error" />,
      tooltipPlacement: 'left-start',
      count: 1,
    },
    {
      id: 4,
      title: 'Deactivated Events',
      icon: <HighlightOffRounded color="inherit" />,
      tooltipPlacement: 'left-start',
      count: 2,
    },
    {
      id: 5,
      title: 'Expenses Reported',
      icon: <LocalAtmRounded color="error" />,
      tooltipPlacement: 'left-start',
      count: 2,
    },
    {
      id: 6,
      title: 'Inventories Updated',
      icon: <HighlightOffRounded color="inherit" />,
      tooltipPlacement: 'left-start',
      count: 2,
    },
  ];

  return (
    <Box className={classes.root}>
      <Box className={classes.contentContainer}>
        <Box className={classes.profileContent}>
          <Typography className={classes.text}>Events</Typography>
          <RecentItemTabs rowData={data.slice(0, 2)} />
          <Divider />
          <Typography className={classes.text}>Issues</Typography>
          <RecentItemTabs rowData={data.slice(2, 4)} />
          <Divider />
          <Typography className={classes.text}>Expenses</Typography>
          <RecentItemTabs rowData={data.slice(4, 6)} />
        </Box>
        <Box className={classes.recentActivitiesList}>
          <RecentActivities />
        </Box>
      </Box>
    </Box>
  );
};

export default RecentActivitiesListContainer;
