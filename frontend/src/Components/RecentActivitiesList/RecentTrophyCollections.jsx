import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import RecentItemTabs from './RecentItemTabs';
import { makeStyles } from '@material-ui/core';
import { RECENT_TROPHY_COLLECTION_TABS } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
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

  return <RecentItemTabs rowData={formattedData} />;
};

export default RecentTrophyCollections;
