import RecentActivity from './RecentActivity';
import EmptyComponent from '../../util/EmptyComponent';
import { Box } from '@material-ui/core';
import LoadingSkeleton from '../../util/LoadingSkeleton';
import { useSelector } from 'react-redux';

const RecentActivities = () => {
  const { loading, recentActivities } = useSelector((state) => state.profile);

  if (loading) {
    return <LoadingSkeleton width={`calc(100% - 1rem)`} height={'20rem'} />;
  }
  if (recentActivities.length <= 0) {
    return <EmptyComponent shouldRedirect={true} path={'/'} subtitle="Create or volunteer for any event" />;
  } else {
    return (
      <Box>
        {recentActivities.map((event, index) => (
          <RecentActivity key={index} index={index} activity={event} />
        ))}
      </Box>
    );
  }
};

export default RecentActivities;
