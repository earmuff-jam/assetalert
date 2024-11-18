import { CloseRounded } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton, Slide, Stack } from '@mui/material';
import SelectedRowItem from './SelectedRowItem';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function ViewItemDetails({ resetSelection, title, selectedRow, columns }) {
  return (
    <Dialog
      open
      keepMounted
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
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {title}
          <IconButton aria-label="close" onClick={resetSelection} color="error">
            <CloseRounded />
          </IconButton>
        </Stack>
      </DialogTitle>
      <SelectedRowItem selectedRow={selectedRow} columns={columns} />
    </Dialog>
  );
}
