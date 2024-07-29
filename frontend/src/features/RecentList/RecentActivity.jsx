import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineOppositeContent,
} from '@mui/lab';
import { CreateNewFolderRounded, LocalAtmRounded } from '@mui/icons-material';

const StyledTimelineItem = ({ color, icon, label }) => {
  return (
    <TimelineItem sx={{ alignItems: 'center' }}>
      <TimelineOppositeContent display="none" />
      <TimelineSeparator>
        <TimelineDot color={color}>{icon}</TimelineDot>
      </TimelineSeparator>
      <TimelineContent variant="caption">{label}</TimelineContent>
    </TimelineItem>
  );
};

const RecentActivity = ({ activity }) => {
  dayjs.extend(relativeTime);
  return (
    <>
      <Stack
        key={activity.id}
        sx={{ bgcolor: 'secondary.light', borderRadius: '0.2rem', p: 1, alignItems: 'flex-start' }}
      >
        <Timeline sx={{ m: 0, p: 0 }}>
          <StyledTimelineItem
            color="primary"
            icon={<CreateNewFolderRounded fontSize="small" />}
            label={`Participated in ${activity.title}`}
          />
          {activity?.expense_name?.length >= 1 ? (
            <StyledTimelineItem
              color="error"
              icon={<LocalAtmRounded fontSize="small" />}
              label={`Bought ${activity?.expense_name.length} item(s)`}
            />
          ) : null}
        </Timeline>
        <Typography variant="caption" alignSelf="flex-end">{`Created around ${dayjs(
          activity?.created_at
        ).fromNow()} by ${activity?.creator}`}</Typography>
      </Stack>
    </>
  );
};

RecentActivity.defaultProps = {
  activity: {},
};

RecentActivity.propTypes = {
  activity: PropTypes.object,
};

export default RecentActivity;
