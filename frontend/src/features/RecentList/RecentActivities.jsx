import { useDispatch, useSelector } from 'react-redux';
import RecentActivity from './RecentActivity';
import { ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Skeleton, Typography } from '@mui/material';
import { DisplayNoMatchingRecordsComponent } from '../common/utils';
import { useEffect } from 'react';
import { profileActions } from '../Profile/profileSlice';

const RecentActivities = () => {
  const dispatch = useDispatch();
  const { loading, recentActivities } = useSelector((state) => state.profile);

  useEffect(() => {
  dispatch(profileActions.getRecentActivitiesList());
  }, []);

  if (loading) {
    return <Skeleton width={`calc(100% - 1rem)`} height={'20rem'} />;
  }
  if (recentActivities.length <= 0) {
    return <DisplayNoMatchingRecordsComponent subtitle="Add assets to view details about them" />;
  } else {
    return (
      <Box>
        {recentActivities.map((event, index) => (
          <Accordion key={index} elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />}>
              <Typography variant="h6">{event.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RecentActivity key={index} index={index} activity={event} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  }
};

export default RecentActivities;
