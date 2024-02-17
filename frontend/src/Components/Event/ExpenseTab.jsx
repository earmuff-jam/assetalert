import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';

import ExpenseChart from '../PieChart/ExpenseChart';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseDetails from '../ViewExpenseList/ExpenseDetails';
import { eventActions } from '../../Containers/Event/eventSlice';
import ViewExpenseListHeader from '../ViewExpenseList/ViewExpenseListHeader';

const ExpenseTab = ({ eventID, userID, editingAllowed }) => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.event);

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
