import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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

  const { loading: profilePageLoading, recentTrophies } = useSelector((state) => state.profile);
  const [formattedData, setFormattedData] = useState([...RECENT_TROPHY_COLLECTION_TABS]);

  useEffect(() => {
    if (Object.values(recentTrophies).length >= 0) {
      const draftData = formattedData.map((v, index) => ({ ...v, count: Object.values(recentTrophies)[index] }));
      setFormattedData(draftData);
    }
  }, [recentTrophies]);

  console.log(formattedData);

  return (
    <Box className={classes.root}>
      <TextComponent gutterBottom={false} loading={profilePageLoading} textStyle={classes.text} value={'Events'} />
      <RecentItemTabs rowData={formattedData.slice(0, 2)} />
      <Divider />
      <TextComponent gutterBottom={false} loading={profilePageLoading} textStyle={classes.text} value={'Issues'} />
      <RecentItemTabs rowData={formattedData.slice(2, 4)} />
      <Divider />
      <TextComponent gutterBottom={false} loading={profilePageLoading} textStyle={classes.text} value={'Expenses'} />
      <RecentItemTabs rowData={formattedData.slice(4, 6)} />
    </Box>
  );
};

export default RecentTrophyCollections;
