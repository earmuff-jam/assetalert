import RecentActivity from './RecentActivity';
import { ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Skeleton, Typography } from '@mui/material';
import { EmptyComponent } from '../common/utils';

const RecentActivities = () => {
  const recentActivities = [];
  const loading = false;

  if (loading) {
    return <Skeleton width={`calc(100% - 1rem)`} height={'20rem'} />;
  }
  if (recentActivities.length <= 0) {
    return <EmptyComponent subtitle="Add assets to view details about them" />;
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
