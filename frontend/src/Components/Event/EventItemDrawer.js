import React from 'react';
import { Drawer } from '@material-ui/core';
import ViewItemDetail from '../ItemDetail/ViewItemDetail';

const EventItemDrawer = ({ open, disabled, userDetail, toggleDrawer, shouldDisableViewItemList }) => {
  return (
    <Drawer anchor={'top'} open={open} onClose={() => toggleDrawer(false)}>
      <ViewItemDetail disabled={shouldDisableViewItemList(disabled, userDetail)} />
    </Drawer>
  );
};

export default EventItemDrawer;
