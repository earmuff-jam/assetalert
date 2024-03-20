import RecentItemTabs from './RecentItemTabs';
import { Box, Divider, makeStyles } from '@material-ui/core';
import { RECENT_TROPHY_COLLECTION_TABS } from './constants';
import TextComponent from '../../stories/TextComponent/TextComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: theme.spacing(32),
    padding: theme.spacing(1),
    gap: theme.spacing(1),
  },
  text: {
    fontSize: '0.925rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
}));
const RecentTrophyCollections = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <TextComponent gutterBottom={false} loading={false} textStyle={classes.text} value={'Events'} />
      <RecentItemTabs rowData={RECENT_TROPHY_COLLECTION_TABS.slice(0, 2)} />
      <Divider />
      <TextComponent gutterBottom={false} loading={false} textStyle={classes.text} value={'Issues'} />
      <RecentItemTabs rowData={RECENT_TROPHY_COLLECTION_TABS.slice(2, 4)} />
      <Divider />
      <TextComponent gutterBottom={false} loading={false} textStyle={classes.text} value={'Expenses'} />
      <RecentItemTabs rowData={RECENT_TROPHY_COLLECTION_TABS.slice(4, 6)} />
    </Box>
  );
};

export default RecentTrophyCollections;
