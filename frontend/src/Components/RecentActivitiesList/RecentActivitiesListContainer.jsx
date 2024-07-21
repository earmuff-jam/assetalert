import { Box } from '@mui/material';
import RecentActivities from './RecentActivities';
import makeStyles from '@mui/styles/makeStyles';
import RecentTrophyCollections from './RecentTrophyCollections';
import TextComponent from '../TextFieldComponent/TextComponent';

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
  headingText: {
    fontSize: '1.6rem',
    letterSpacing: '0.0125rem',
    color: theme.palette.text.secondary,
  },
  text: {
    fontSize: '0.925rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  recentActivitiesList: {
    flexGrow: 1,
  },
  emptyGap: {
    flexGrow: 1,
  },
}));

const RecentActivitiesListContainer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.contentContainer}>
        <TextComponent
          value={'Recent Activities'}
          gutterBottom={true}
          loading={false}
          textStyle={classes.headingText}
        />
        <Box className={classes.emptyGap}></Box>
        <RecentTrophyCollections />
      </Box>
      <Box className={classes.contentContainer}>
        <Box className={classes.recentActivitiesList}>
          <RecentActivities />
        </Box>
      </Box>
    </Box>
  );
};

export default RecentActivitiesListContainer;
