import { useState } from 'react';
import {
  ExpandLess,
  ExpandMore,
  AllInboxRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
  PushPinRounded,
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
  Typography,
} from '@mui/material';

import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MENU_ACTION_BAR_DEFAULT_LIST, PINNED_DEFAULT_INSET_MENU_LIST } from './constants';

export default function MenuActionBar({ openDrawer, handleDrawerClose, smScreenSizeAndHigher, lgScreenSizeAndHigher }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { favItems = [] } = useSelector((state) => state.profile);
  const [openPinnedResources, setOpenPinnedResources] = useState(true);

  // the timeout allows to close the drawer first before navigation occurs.
  // Without this, the drawer behaves weird.
  const handleMenuItemClick = (to) => {
    !lgScreenSizeAndHigher && handleDrawerClose();
    setTimeout(() => {
      navigate(to);
    }, 200);
  };

  const handlePinnedResourceClick = () => setOpenPinnedResources(!openPinnedResources);

  const formattedPinnedMenuItemList = favItems.map((v) => ({
    id: v.id,
    label: v.category_name || v.maintenance_plan_name,
    to: v.category_name ? `/category/${v.category_id}` : `/plan/${v.maintenance_plan_id}`,
    icon: <PushPinRounded fontSize="small" sx={{ transform: 'rotate(45deg)' }} color="warning" />,
  }));

  return (
    <Stack display="flex">
      <Drawer
        variant="persistent"
        open={openDrawer}
        onClose={handleDrawerClose}
        aria-modal="true"
        PaperProps={
          smScreenSizeAndHigher
            ? {
                sx: {
                  width: 300,
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
                },
              }
            : {
                sx: {
                  width: '100%',
                },
              }
        }
      >
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem' }}>
          <Typography variant="h5">AssetAlert</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightRounded /> : <ChevronLeftRounded />}
          </IconButton>
        </Stack>
        <Divider />
        <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader">
          {MENU_ACTION_BAR_DEFAULT_LIST.map((v) => (
            <ListItemButton key={v.id} selected={pathname === v.to} onClick={() => handleMenuItemClick(v.to)}>
              <ListItemIcon sx={{ color: pathname === v.to && theme.palette.primary.main }}>{v.icon}</ListItemIcon>
              <ListItemText primary={v.label} />
            </ListItemButton>
          ))}

          <ListItemButton onClick={handlePinnedResourceClick}>
            <ListItemIcon>
              <AllInboxRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Pinned Resources" />
            {openPinnedResources ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
          </ListItemButton>

          <Collapse in={openPinnedResources} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {PINNED_DEFAULT_INSET_MENU_LIST.concat(formattedPinnedMenuItemList).map((v) => (
                <ListItemButton
                  key={v.id}
                  sx={{ pl: 4 }}
                  selected={pathname === v.to}
                  onClick={() => handleMenuItemClick(v.to)}
                >
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
