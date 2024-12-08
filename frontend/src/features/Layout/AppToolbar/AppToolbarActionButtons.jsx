import { useDispatch } from 'react-redux';

import { IconButton, Stack, Tooltip } from '@mui/material';
import { authActions } from '@features/LandingPage/authSlice';
import { profileActions } from '@features/Profile/profileSlice';
import { DarkModeRounded, LightModeOutlined, LogoutRounded } from '@mui/icons-material';

export default function AppToolbarActionButtons({ profileDetails, smScreenSizeAndHigher }) {
  const dispatch = useDispatch();

  const handleAppearance = () => {
    const draftData = { ...profileDetails, appearance: !profileDetails.appearance || false };
    dispatch(profileActions.updateProfileDetails({ draftData }));
  };

  const handleLogout = () => {
    dispatch(authActions.getLogout());
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Stack direction="row" spacing="0.1rem">
      {!smScreenSizeAndHigher ? (
        <>
          <IconButton size="small" onClick={handleAppearance}>
            {profileDetails?.appearance ? <LightModeOutlined fontSize="small" /> : <DarkModeRounded fontSize="small" />}
          </IconButton>
          <IconButton size="small" onClick={handleLogout}>
            <LogoutRounded fontSize="small" />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton size="small" onClick={() => handleAppearance()}>
            {profileDetails?.appearance ? <LightModeOutlined fontSize="small" /> : <DarkModeRounded fontSize="small" />}
          </IconButton>
          <Tooltip title="log out">
            <IconButton size="small" onClick={handleLogout}>
              <LogoutRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Stack>
  );
}
