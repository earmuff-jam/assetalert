import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyComponent from '../../util/EmptyComponent';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container } from '@material-ui/core';
import { CancelRounded, DoneRounded } from '@material-ui/icons';
import EasyEdit, { Types } from 'react-easy-edit';
import { eventActions } from '../../Containers/Event/eventSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import List from '../DrawerListComponent/List';
import { VIEW_EXPENSE_LIST_COLUMN_HEADERS } from './constants';

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
}));

const ViewExpenseList = ({ disabled }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);

  const { loading, expenses } = useSelector((state) => state.event);
  const { loading: userDetailsLoading, profileDetails } = useSelector((state) => state.profile);

  // removing unwanted values from the display column
  const filteredItems = expenses?.map((item) => {
    const { id, eventID, category_id, category_name, sharable_groups, created_by, updated_by, ...rest } = item;
    return rest;
  });

  const save = (value, rowIndex, column) => {
    const row = expenses.filter((v, index) => index === rowIndex).find((v) => true);
    const { id: itemID, eventID } = row;
    const userID = !userDetailsLoading && profileDetails.id;
    // dispatch(eventActions.updateItemDetails({ itemID, eventID, userID, value, column }));
  };

  const columns = Object.keys(!loading && expenses?.length > 0 && expenses[0]); // for header purpose

  const columnHeaderFormatter = (column) => {
    const header = VIEW_EXPENSE_LIST_COLUMN_HEADERS[column];
    // Apply a modifier function if defined
    const formattedTitle = header?.modifier ? header.modifier(header.title) : header?.displayName;
    return formattedTitle;
  };

  const rowFormatter = (row, column, rowIndex) => {
    // if any of the row includes timestamp we modify it
    if (['created_at', 'updated_at'].includes(column)) {
      return dayjs(row[column]).fromNow();
    }
    const inputColumns = ['item_name', 'item_cost', 'notes', 'purchase_location'];
    // if the selected event is disabled, no edit for expenses
    if (inputColumns.includes(column) && !disabled) {
      return (
        <EasyEdit
          type={Types.TEXT}
          onSave={(value) => {
            // the column.key is the db column name
            save(value, rowIndex, VIEW_EXPENSE_LIST_COLUMN_HEADERS[column].key);
          }}
          onCancel={(o) => o}
          placeholder={row[column]}
          saveButtonLabel={<DoneRounded />}
          cancelButtonLabel={<CancelRounded />}
          attributes={{ name: 'awesome-input', id: 1 }}
          instructions={`Currently editing ${column}`}
        />
      );
    }
    return row[column];
  };

  if (loading) {
    return (
      <div className={classes.spinnerContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (!expenses || expenses.length === 0) {
    return <EmptyComponent subtitle="Add an expense." />;
  }

  return (
    <Container maxWidth="lg">
      <List
        title={'View current expenses'}
        subtitle={`Total Expense Count: ${expenses.length > 0 ? expenses.length : 0}`}
        tooltipTitle={'download expense list'}
        fileName={'Cumulative Expense Report.xlsx'}
        sheetName={'Expense Report Sheet'}
        data={expenses}
        columns={columns}
        filteredData={filteredItems}
        columnHeaderFormatter={columnHeaderFormatter}
        rowFormatter={rowFormatter}
      />
    </Container>
  );
};

export default ViewExpenseList;
