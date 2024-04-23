import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import List from '../DrawerListComponent/List';
import EasyEdit, { Types } from 'react-easy-edit';
import relativeTime from 'dayjs/plugin/relativeTime';

import EmptyComponent from '../../util/EmptyComponent';
import LoadingSkeleton from '../../util/LoadingSkeleton';
import { VIEW_EXPENSE_LIST_COLUMN_HEADERS } from './constants';
import { CancelRounded, DoneRounded } from '@material-ui/icons';

const ViewExpenseList = ({ disabled }) => {
  dayjs.extend(relativeTime);

  const { loading, expenses } = useSelector((state) => state.event);

  // removing unwanted values from the display column
  const filteredItems = expenses?.map((item) => {
    // eslint-disable-next-line
    const { eventID, category_id, category_name, sharable_groups, created_by, updated_by, ...rest } = item;
    return rest;
  });

  const columns = Object.keys(!loading && expenses?.length > 0 && expenses[0]); // for header purpose
  const revisitedCols = columns.filter((v) => v != 'id');

  const columnHeaderFormatter = (column) => {
    const header = VIEW_EXPENSE_LIST_COLUMN_HEADERS[column];
    // Apply a modifier function if defined
    const formattedTitle = header?.modifier ? header.modifier(header.title) : header?.displayName;
    return formattedTitle;
  };

  const rowFormatter = (row, column) => {
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
    return <LoadingSkeleton height={'20rem'} width={'20rem'} />;
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
        columns={revisitedCols}
        filteredData={filteredItems}
        columnHeaderFormatter={columnHeaderFormatter}
        rowFormatter={rowFormatter}
        modifyHeightVariant={true}
      />
    </Container>
  );
};

ViewExpenseList.defaultProps = {
  disabled: false,
};

ViewExpenseList.propTypes = {
  disabled: PropTypes.bool,
};

export default ViewExpenseList;
