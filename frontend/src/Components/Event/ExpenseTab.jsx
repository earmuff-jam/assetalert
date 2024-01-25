import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import ExpenseChart from '../PieChart/ExpenseChart';
import ExpenseDetails from '../ViewExpenseList/ExpenseDetails';
import ViewExpenseListHeader from '../ViewExpenseList/ViewExpenseListHeader';
import { useDispatch, useSelector } from 'react-redux';
import { eventActions } from '../../Containers/Event/eventSlice';

const ExpenseTab = ({ eventID, userID, editingAllowed }) => {
  const dispatch = useDispatch();
  const { loading, expenses } = useSelector((state) => state.event);

  useEffect(() => {
    if (eventID) {
      dispatch(eventActions.getExpenseList({ eventID }));
    }
  }, []);

  return (
    <>
      <Box>
        <ViewExpenseListHeader />
        <ExpenseDetails eventID={eventID} userID={userID} editingAllowed={editingAllowed} />
      </Box>
      <ExpenseChart expenses={expenses || []} totalSkillLimit={0} />
    </>
  );
};

export default ExpenseTab;
