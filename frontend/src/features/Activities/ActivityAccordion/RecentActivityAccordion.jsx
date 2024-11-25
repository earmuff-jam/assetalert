import { Accordion, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from '../../Profile/profileSlice';
import ActivityAccordionSummary from './ActivityAccordionSummary';
import ActivityAccordionDetails from './ActivityAccordionDetails';
import { RECENT_ACTIVITY_TYPE_MAPPER } from '../constants';
import { EmptyComponent } from '../../../utils/utils';

const RecentActivityAccordion = () => {
  const dispatch = useDispatch();
  const { recentActivities = [], loading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!loading && recentActivities?.length === 0) {
      dispatch(profileActions.getRecentActivities());
    }
  }, [loading, recentActivities?.length]);

  if (loading) {
    return <Skeleton height="20rem" />;
  }
  if (recentActivities == null || recentActivities?.length <= 0) {
    return <EmptyComponent subtitle="Add assets to view details about them" />;
  }

  return (
    <>
      {recentActivities.map((activity, index) => (
        <Accordion key={index} elevation={0} disableGutters>
          <ActivityAccordionSummary
            title={activity.title}
            label={activity.custom_action}
            prefix={RECENT_ACTIVITY_TYPE_MAPPER[activity.type].display}
          />
          <ActivityAccordionDetails index={index} activity={activity} />
        </Accordion>
      ))}
    </>
  );
};

export default RecentActivityAccordion;
