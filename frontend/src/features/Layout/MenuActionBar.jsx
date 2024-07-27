import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  PushPinOutlined,
  ExpandLess,
  ExpandMore,
  Inventory2Rounded,
  SettingsRounded,
  StarOutline,
  InboxOutlined,
  HomeRounded,
} from '@mui/icons-material';

import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Stack,
  Button,
} from '@mui/material';
import { authActions } from '../../Containers/Auth/authSlice';

export default function MenuActionBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSettings, setOpenSettings] = useState(true);
  const [openPinnedResources, setOpenPinnedResources] = useState(true);
  const { loading: userNameLoading, username } = useSelector((state) => state.home);

  const parentMenuList = [
    {
      id: 1,
      icon: <HomeRounded />,
      label: 'Home page',
      to: '/',
    },
    {
      id: 2,
      icon: <Inventory2Rounded />,
      label: 'All Inventories',
      to: '/inventories/list',
    },
  ];

  const settingsChildren = [
    {
      id: 1,
      icon: <SettingsRounded />,
      label: 'Appearance',
      to: '/profile',
    },
    {
      id: 2,
      icon: <PushPinOutlined />,
      label: 'Profile details',
      to: '/profile',
    },
  ];

  const handleSettingsClick = () => setOpenSettings(!openSettings);
  const handlePinnedResourceClick = () => setOpenPinnedResources(!openPinnedResources);

  const handleLogout = () => {
    dispatch(authActions.getLogout());
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Stack direction="row" justifyContent="space-between">
            {username?.length > 0 ? `Welcome ${username} !` : 'Welcome User !'}
            <Button onClick={handleLogout}>logout</Button>
          </Stack>
        </ListSubheader>
      }
    >
      {parentMenuList.map((v) => (
        <ListItemButton id={v.id} onClick={() => navigate(v.to)}>
          <ListItemIcon>{v.icon}</ListItemIcon>
          <ListItemText primary={v.label} />
        </ListItemButton>
      ))}

      <ListItemButton onClick={handleSettingsClick}>
        <ListItemIcon>
          <SettingsRounded />
        </ListItemIcon>
        <ListItemText primary="Settings" />
        {openSettings ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openSettings} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {settingsChildren.map((v) => (
            <ListItemButton id={v.id} onClick={() => navigate(v.to)}>
              <ListItemIcon>{v.icon}</ListItemIcon>
              <ListItemText primary={v.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <ListItemButton onClick={handlePinnedResourceClick}>
        <ListItemIcon>
          <InboxOutlined />
        </ListItemIcon>
        <ListItemText primary="Pinned Resources" />
        {openPinnedResources ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openPinnedResources} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PushPinOutlined />
            </ListItemIcon>
            <ListItemText primary="Personal Notes" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PushPinOutlined />
            </ListItemIcon>
            <ListItemText primary="Recent Activities" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
