import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import RecentItemTabs from './RecentItemTabs';
import { RECENT_TROPHY_COLLECTION_TABS } from './constants';

const RecentTrophyCollections = () => {
  const { loading: profilePageLoading, recentTrophies } = useSelector((state) => state.profile);
  const [formattedData, setFormattedData] = useState([...RECENT_TROPHY_COLLECTION_TABS]);

  useEffect(() => {
    if (Object.values(recentTrophies).length >= 0) {
      const draftData = formattedData.map((v) => ({ ...v, count: recentTrophies[v.key] }));
      setFormattedData(draftData);
    }
    // eslint-disable-next-line
  }, [recentTrophies]);

  return <RecentItemTabs rowData={formattedData} loading={profilePageLoading} />;
};

export default RecentTrophyCollections;
