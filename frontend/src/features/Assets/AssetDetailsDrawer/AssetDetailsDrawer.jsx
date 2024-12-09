import React from 'react';

import { Dialog, Slide } from '@mui/material';
import ViewAssetDetailsHeader from '@features/Assets/AssetDetailsDrawer/AssetDetailsDrawerHeader';
import AssetDetailsDrawerContent from '@features/Assets/AssetDetailsDrawer/AssetDetailsDrawerContent';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function AssetDetailsDrawer({ resetSelection, title, selectedRow, columns }) {
  return (
    <Dialog
      open
      keepMounted
      maxWidth={'xs'}
      onClose={resetSelection}
      aria-labelledby="detailed-inventory-item"
      scroll="paper"
      TransitionComponent={Transition}
      sx={{
        '& .MuiDialog-container': {
          justifyContent: 'flex-end',
        },
      }}
    >
      <ViewAssetDetailsHeader title={title} resetSelection={resetSelection} />
      <AssetDetailsDrawerContent selectedRow={selectedRow} columns={columns} />
    </Dialog>
  );
}
