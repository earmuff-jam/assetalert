import { useState } from 'react';

import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { AllInboxRounded, BookmarkRounded, ExpandLess, ExpandMore } from '@mui/icons-material';

import { Collapse, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';

import MenuActionBarTitle from '@features/Layout/MenuActionBar/MenuActionBarTitle';
import MenuActionBarListItem from '@features/Layout/MenuActionBar/MenuActionBarListItem';
import { MENU_ACTION_BAR_DEFAULT_LIST, PINNED_DEFAULT_INSET_MENU_LIST } from '@features/Layout/constants';

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
    icon: <BookmarkRounded fontSize="small" color="warning" />,
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
        <MenuActionBarTitle theme={theme} handleDrawerClose={handleDrawerClose} />
        <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader" disablePadding>
          {MENU_ACTION_BAR_DEFAULT_LIST.map((item) => (
            <MenuActionBarListItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              isSelected={pathname === item.to}
              handleClick={() => handleMenuItemClick(item.to)}
            />
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
              {PINNED_DEFAULT_INSET_MENU_LIST.concat(formattedPinnedMenuItemList).map((item) => (
                <MenuActionBarListItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  rowReverse
                  isSelected={pathname === item.to}
                  handleClick={() => handleMenuItemClick(item.to)}
                />
              ))}
            </List>
          </Collapse>
        </List>
      </Drawer>
    </Stack>
  );
}
