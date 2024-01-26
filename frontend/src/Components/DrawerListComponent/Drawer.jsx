import React from 'react';
import { Drawer as DrawerComponent } from '@material-ui/core';

const Drawer = ({ open, toggleDrawer, children }) => {
  return (
    <DrawerComponent anchor={'top'} open={open} onClose={() => toggleDrawer(false)}>
      {children}
    </DrawerComponent>
  );
};

export default Drawer;
