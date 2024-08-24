import { Stack } from '@mui/material';
import RecentActivities from './RecentActivities';
import HeaderWithButton from '../common/HeaderWithButton';
import { DownloadRounded } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { profileActions } from '../Profile/profileSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const RecentList = () => {
  const dispatch = useDispatch();
  const downloadRecentActivities = () => {
    const last30Days = dayjs().subtract(30, 'days').format('YYYY-MM-DDTHH:mm:ssZ');
    dispatch(profileActions.downloadRecentActivities({ last30Days }));
  };

  return (
    <Stack>
      <HeaderWithButton
        title="Recent Activities"
        secondaryTitle="View all of your recent activities here. You can view all associated activities performed by yourself. Track changes for the last ten assets. Download all recent activities for the past 30 days."
        primaryButtonTextLabel="Export"
        primaryStartIcon={<DownloadRounded />}
        handleClickPrimaryButton={downloadRecentActivities}
      />
      <RecentActivities />
    </Stack>
  );
};

export default RecentList;
