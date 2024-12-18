import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { Divider, Stack, Typography } from '@mui/material';

import UserStats from '@features/Profile/UserStats/UserStats';
import { profileActions } from '@features/Profile/profileSlice';

export default function UserStatus({ profileStats = {}, onlySmallScreen }) {
  const dispatch = useDispatch();

  const DRAFT_PROFILE_STATS = [
    {
      id: 1,
      label: 'Created Categories',
      caption: 'The total number of categories created',
      value: profileStats?.totalCategories,
      color: 'rgb(255, 99, 132)',
    },
    {
      id: 2,
      label: 'Created Maintenance Plans',
      caption: 'The total number of maintenance plans created',
      value: profileStats?.totalMaintenancePlans,
      color: 'rgb(54, 162, 235)',
    },
    {
      id: 3,
      label: 'Created assets',
      caption: 'The total number of assets created',
      value: profileStats?.totalAssets,
      color: 'rgb(255, 205, 86)',
    },
  ];

  const total = DRAFT_PROFILE_STATS.map(({ value }) => value).reduce((acc, el) => acc + el, 0);

  useEffect(() => {
    dispatch(profileActions.getProfileStats());
  }, []);

  return (
    <>
      <Typography variant="h5" color="text.secondary">
        Profile Stats
      </Typography>
      <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
      <Stack
        direction={onlySmallScreen ? 'column' : 'row'}
        justifyContent={'space-between'}
        useFlexGap
        flexWrap="wrap"
        spacing={2}
      >
        {DRAFT_PROFILE_STATS.map((v) => (
          <Stack key={v.id} alignItems={'center'} spacing={0}>
            <Typography variant="subtitle2" color="text.secondary">
              {v.label}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {v.value}
            </Typography>
            <UserStats label={v.label} value={v.value} color={v.color} total={total} />
          </Stack>
        ))}
      </Stack>
    </>
  );
}
