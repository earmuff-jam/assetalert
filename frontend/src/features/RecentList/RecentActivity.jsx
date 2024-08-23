import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineOppositeContent,
} from '@mui/lab';
import { CreateNewFolderRounded } from '@mui/icons-material';
import { RECENT_ACTIVITY_TYPE_MAPPER } from './constants';
import { capitalizeFirstLetter } from '../common/utils';

const StyledTimelineItem = ({ color = '', icon, label = '', secondaryLabel = '' }) => {
  return (
    <TimelineItem sx={{ alignItems: 'center' }}>
      <TimelineOppositeContent display="none" />
      <TimelineSeparator>
        <TimelineDot color={color}>{icon}</TimelineDot>
      </TimelineSeparator>
      <Stack>
        <TimelineContent variant="caption">{label}</TimelineContent>
        <TimelineContent variant="caption">{secondaryLabel}</TimelineContent>
      </Stack>
    </TimelineItem>
  );
};

const RecentActivity = ({ activity }) => {
  dayjs.extend(relativeTime);
  return (
    <Stack
      key={activity.id}
      sx={{ backgroundColor: 'background.default', borderRadius: '0.2rem', p: 1, alignItems: 'flex-start' }}
    >
      <Timeline sx={{ m: 0, p: 0 }}>
        <StyledTimelineItem
          color="primary"
          icon={<CreateNewFolderRounded fontSize="small" />}
          label={`${capitalizeFirstLetter(activity.custom_action)} ${activity.title}`}
          secondaryLabel={`${RECENT_ACTIVITY_TYPE_MAPPER[activity.type].display}`}
        />
      </Timeline>
      <Typography variant="caption" alignSelf="flex-end">
        {`Occured around ${dayjs(activity?.created_at).fromNow()} by ${activity?.creator}`}
      </Typography>
    </Stack>
  );
};

export default RecentActivity;
