import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ExpandLess,
  ExpandMore,
  Inventory2Rounded,
  SettingsRounded,
  HomeRounded,
  PreviewRounded,
  AccountBoxRounded,
  AllInboxRounded,
  PushPinRounded,
  CategoryRounded,
  SummarizeRounded,
  ReportSharp,
  ChevronLeftRounded,
  ChevronRightRounded,
} from '@mui/icons-material';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Stack,
  Drawer,
  IconButton,
  Divider,
} from '@mui/material';
import { useTheme } from '@emotion/react';

export default function MenuActionBar({ openDrawer, handleDrawerClose }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [openSettings, setOpenSettings] = useState(true);
  const [openPinnedResources, setOpenPinnedResources] = useState(true);

  const parentMenuList = [
    {
      id: 1,
      icon: <HomeRounded fontSize="small" color="primary" />,
      label: 'Home',
      to: '/',
    },
    {
      id: 2,
      icon: <Inventory2Rounded fontSize="small" />,
      label: 'Assets',
      to: '/inventories/list',
    },
    {
      id: 3,
      icon: <CategoryRounded fontSize="small" />,
      label: 'Categories',
      to: '/categories/list',
    },
    {
      id: 4,
      icon: <SummarizeRounded fontSize="small" />,
      label: 'Maintenance plans',
      to: '/plans/list',
    },
    {
      id: 5,
      icon: <ReportSharp fontSize="small" />,
      label: 'Reports',
      to: '/reports',
    },
  ];

  const settingsChildren = [
    {
      id: 1,
      icon: <PreviewRounded fontSize="small" />,
      label: 'Appearance',
      to: '/profile/appearance',
    },
    {
      id: 2,
      icon: <AccountBoxRounded fontSize="small" />,
      label: 'Profile details',
      to: '/profile',
    },
  ];

  const pinnedChildren = [
    {
      id: 1,
      icon: <PushPinRounded fontSize="small" sx={{ transform: 'rotate(45deg)' }} color="warning" />,
      label: 'Recent Activities',
      to: '/recent/activities',
    },
    {
      id: 2,
      icon: <PushPinRounded fontSize="small" sx={{ transform: 'rotate(45deg)' }} color="warning" />,
      label: 'Personal Notes',
      to: '/profile/notes',
    },
  ];

  // the timeout allows to close the drawer first before navigation occurs. Without this, the drawer
  // behaves weird.
  const handleMenuItemClick = (to) => {
    handleDrawerClose();
    setTimeout(() => {
      navigate(to);
    }, 200);
  };

  const handleSettingsClick = () => setOpenSettings(!openSettings);
  const handlePinnedResourceClick = () => setOpenPinnedResources(!openPinnedResources);

  return (
    <Stack display="flex">
      <Drawer variant="temporary" open={openDrawer} onClose={handleDrawerClose} aria-modal="true">
        <IconButton onClick={handleDrawerClose} sx={{ alignSelf: 'flex-end' }}>
          {theme.direction === 'rtl' ? <ChevronRightRounded /> : <ChevronLeftRounded />}
        </IconButton>
        <Divider />
        <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader">
          {parentMenuList.map((v) => (
            <ListItemButton key={v.id} onClick={() => handleMenuItemClick(v.to)}>
              <ListItemIcon>{v.icon}</ListItemIcon>
              <ListItemText primary={v.label} />
            </ListItemButton>
          ))}

          <ListItemButton onClick={handleSettingsClick}>
            <ListItemIcon>
              <SettingsRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {openSettings ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </ListItemButton>

          <Collapse in={openSettings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {settingsChildren.map((v) => (
                <ListItemButton key={v.id} sx={{ pl: 4 }} onClick={() => handleMenuItemClick(v.to)}>
                  <ListItemIcon>{v.icon}</ListItemIcon>
                  <ListItemText primary={v.label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItemButton onClick={handlePinnedResourceClick}>
            <ListItemIcon>
              <AllInboxRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Pinned Resources" />
            {openPinnedResources ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </ListItemButton>

          <Collapse in={openPinnedResources} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {pinnedChildren.map((v) => (
                <ListItemButton key={v.id} sx={{ pl: 4 }} onClick={() => handleMenuItemClick(v.to)}>
                  <ListItemText primary={v.label} />
                  <ListItemIcon>{v.icon}</ListItemIcon>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </Drawer>
    </Stack>
  );
}
