import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ExpandLess,
  ExpandMore,
  SettingsRounded,
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
  useMediaQuery,
  Typography,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { PARENT_MENU_LIST, PINNED_CHILDREN_MENU_LIST, SETTINGS_CHILDREN_MENU_LIST } from './constants';
import { useSelector } from 'react-redux';

export default function MenuActionBar({ openDrawer, handleDrawerClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const smallerAndHigher = useMediaQuery(theme.breakpoints.up('sm'));

  const { favItems = [] } = useSelector((state) => state.profile);

  const [openSettings, setOpenSettings] = useState(true);
  const [openPinnedResources, setOpenPinnedResources] = useState(true);

  // the timeout allows to close the drawer first before navigation occurs. 
  // Without this, the drawer behaves weird.
  const handleMenuItemClick = (to) => {
    handleDrawerClose();
    setTimeout(() => {
      navigate(to);
    }, 200);
  };

  const handleSettingsClick = () => setOpenSettings(!openSettings);
  const handlePinnedResourceClick = () => setOpenPinnedResources(!openPinnedResources);

  const formattedFavItemList = favItems.map((v) => ({
    id: v.id,
    label: v.category_name || v.maintenance_plan_name,
    to: v.category_name ? `category/${v.category_id}` : `plan/${v.maintenance_plan_id}`,
    icon: <PushPinRounded fontSize="small" sx={{ transform: 'rotate(45deg)' }} color="warning" />,
  }));

  return (
    <Stack display="flex">
      <Drawer
        variant="temporary"
        open={openDrawer}
        onClose={handleDrawerClose}
        aria-modal="true"
        PaperProps={
          smallerAndHigher
            ? {
                sx: {
                  width: 300,
                },
              }
            : {
                sx: {
                  width: '100%',
                },
              }
        }
      >
        <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
          <Typography variant="h5">AssetAlert</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightRounded /> : <ChevronLeftRounded />}
          </IconButton>
        </Stack>
        <Divider />
        <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader">
          {PARENT_MENU_LIST.map((v) => (
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
              {SETTINGS_CHILDREN_MENU_LIST.map((v) => (
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
              {PINNED_CHILDREN_MENU_LIST.concat(formattedFavItemList).map((v) => (
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
