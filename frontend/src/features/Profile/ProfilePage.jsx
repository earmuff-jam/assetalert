import { Paper, Stack, Typography, useMediaQuery } from '@mui/material';
import UserDemographics from './UserDemographics';
import UserDetails from './UserDetails';
import UserStatus from './UserStatus';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import SimpleModal from '../common/SimpleModal';
import AppearanceSettings from './AppearanceSettings';
import ProfileContent from './ProfileContent';
import { useTheme } from '@emotion/react';

const ProfilePage = () => {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { profileDetails: data = {}, loading } = useSelector((state) => state.profile);
  const [editMode, setEditMode] = useState(false);

  return (
    <Stack spacing={2}>
      <Stack direction={onlySmallScreen ? 'column' : 'row'} spacing={1}>
        <UserDemographics data={data} handleEditMode={() => setEditMode(!editMode)} />
        <UserDetails data={data} />
      </Stack>
      <Paper sx={{ padding: '1rem' }}>
        <UserStatus data={data} onlySmallScreen={onlySmallScreen} />
      </Paper>
      <Paper sx={{ padding: '1rem' }}>
        <AppearanceSettings loading={loading} profileDetails={data} />
      </Paper>
      {editMode && (
        <SimpleModal
          open={editMode}
          handleClose={() => setEditMode(false)}
          maxSize={'sm'}
          title="Edit profile details"
          subtitle="Edit general details about yourself so others can notice you."
        >
          <ProfileContent />
        </SimpleModal>
      )}
    </Stack>
  );
};

export default ProfilePage;
