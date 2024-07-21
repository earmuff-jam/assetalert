import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  PushPinOutlined,
  ExpandLess,
  ExpandMore,
  Inventory2Rounded,
  SettingsRounded,
  StarOutline,
  InboxOutlined,
} from '@mui/icons-material';

import { ListSubheader, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';

export default function MenuActionBar() {
  const navigate = useNavigate();
  const [openSettings, setOpenSettings] = useState(true);
  const [openPinnedResources, setOpenPinnedResources] = useState(true);
  const { loading: userNameLoading, username } = useSelector((state) => state.home);

  const menuList = [
    {
      id: 1,
      icon: <StarOutline />,
      label: 'Starred Inventories',
      to: '/',
    },
    {
      id: 2,
      icon: <Inventory2Rounded />,
      label: 'All Inventories',
      to: '/',
    },
  ];

  const handleSettingsClick = () => setOpenSettings(!openSettings);
  const handlePinnedResourceClick = () => setOpenPinnedResources(!openPinnedResources);

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {username?.length > 0 ? `Welcome ${username} !` : 'Welcome User !'}
        </ListSubheader>
      }
    >
      {menuList.map((v) => (
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
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PushPinOutlined />
            </ListItemIcon>
            <ListItemText primary="Appearance" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PushPinOutlined />
            </ListItemIcon>
            <ListItemText primary="Profile details" />
          </ListItemButton>
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
