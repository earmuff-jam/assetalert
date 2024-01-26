import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Dialog } from '@material-ui/core';
import Drawer from '../DrawerListComponent/Drawer';
import ViewExpenseList from './ViewExpenseList';
import Title from '../DialogComponent/Title';
import AddExpenseDetail from './AddExpenseDetail';
import { useDispatch } from 'react-redux';
import { eventActions } from '../../Containers/Event/eventSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  headerText: {
    fontSize: '2.0rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
  },
  text: {
    fontSize: '0.925rem',
  },
  aside: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

const ExpenseDetails = ({ eventID, userID, editingAllowed }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false); // display for drawer

  const toggleDrawer = (boolVal) => setOpenDrawer(boolVal);

  return (
    <Box className={classes.root}>
      <Box className={classes.rowContainer}>
        <Button
          disabled={editingAllowed}
          onClick={() => {
            setOpenDialog(true);
            dispatch(eventActions.getCategoryList());
          }}
        >
          Add Expense
        </Button>
        <Button onClick={() => setOpenDrawer(true)}>View Expense</Button>
      </Box>
      <Drawer open={openDrawer} toggleDrawer={toggleDrawer} disabled={editingAllowed}>
        <ViewExpenseList disabled={true} />
      </Drawer>
      <Dialog open={openDialog} width={'md'} fullWidth={true}>
        <Title onClose={() => setOpenDialog(false)}>Add New Expense</Title>
        <AddExpenseDetail eventID={eventID} userID={userID} setDisplayMode={() => setOpenDialog(false)} />
      </Dialog>
    </Box>
  );
};

export default ExpenseDetails;
