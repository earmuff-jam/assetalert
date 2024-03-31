import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Container } from '@material-ui/core';
import dayjs from 'dayjs';
import List from '../DrawerListComponent/List';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSelector } from 'react-redux';
import EmptyComponent from '../../util/EmptyComponent';
import { VIEW_CURRENT_SUPPLIES_COLUMNS } from './constants';
import LoadingSkeleton from '../../util/LoadingSkeleton';

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
  dayjs.extend(relativeTime);

  const { loading, expenses } = useSelector((state) => state.event);
  const { loading: userDetailsLoading, profileDetails } = useSelector((state) => state.profile);

  // removing unwanted values from the display column
  const filteredItems = expenses?.map((item) => {
    // eslint-disable-next-line
    const { id, eventID, category_id, category_name, sharable_groups, created_by, updated_by, ...rest } = item;
    return rest;
  });

  const save = (value, rowIndex, column) => {
    const row = expenses.filter((index) => index === rowIndex).find(() => true);
    const { id: itemID, eventID } = row;
    const userID = !userDetailsLoading && profileDetails.id;
    console.debug(userID, itemID, eventID, value, column);
    // dispatch(eventActions.updateItemDetails({ itemID, eventID, userID, value, column }));
  };

  const tableOptions = {
    filterType: 'checkbox',
    elevation: 0,
    // customRowRender: rowFormatter
  };

  if (loading) {
    return (
      <div className={classes.spinnerContainer}>
        <LoadingSkeleton width={`calc(100% - 12rem)`} height={`calc(100% - 12rem)`} />
      </div>
    );
  }

  if (!expenses || expenses.length === 0) {
    return <EmptyComponent subtitle="Add an expense." />;
  }

  return (
    <List
      title={'View current expenses'}
      subtitle={`Total Expense Count: ${expenses.length > 0 ? expenses.length : 0}`}
      tooltipTitle={'download expense list'}
      fileName={'Cumulative Expense Report.xlsx'}
      sheetName={'Expense Report Sheet'}
      data={expenses}
      columns={VIEW_CURRENT_SUPPLIES_COLUMNS}
      filteredData={filteredItems}
      tableOptions={tableOptions}
      applyHeightVariant={true} // gives space to drawer component to close
    />
  );
};

ViewExpenseList.defaultProps = {
  disabled: false,
};

ViewExpenseList.propTypes = {
  disabled: PropTypes.bool,
};

export default ViewExpenseList;
