import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CancelRounded, DoneRounded } from '@material-ui/icons';
import { CircularProgress, Container } from '@material-ui/core';
import dayjs from 'dayjs';
import List from '../DrawerListComponent/List';
import EasyEdit, { Types } from 'react-easy-edit';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDispatch, useSelector } from 'react-redux';
import EmptyComponent from '../../util/EmptyComponent';
import { VIEW_ITEMS_COLUMN_HEADERS } from './constants';
import { eventActions } from '../../Containers/Event/eventSlice';

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
}));

const ViewItemDetail = ({ disabled }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);

  const { loading, items } = useSelector((state) => state.event);
  const { loading: userDetailsLoading, profileDetails } = useSelector((state) => state.profile);

  // removing unwanted values from the display column
  const filteredItems = items?.map((item) => {
    const { id, eventID, storage_location_id, created_by, updated_by, ...rest } = item;
    return rest;
  });

  const save = (value, rowIndex, column) => {
    const row = items.filter((v, index) => index === rowIndex).find((v) => true);
    const { id: itemID, eventID } = row;
    const userID = !userDetailsLoading && profileDetails.id;
    dispatch(eventActions.updateItemDetails({ itemID, eventID, userID, value, column }));
  };

  const columns = Object.keys(!loading && items.length > 0 && items[0]); // for header purpose

  const columnHeaderFormatter = (column) => {
    const header = VIEW_ITEMS_COLUMN_HEADERS[column];
    // Apply a modifier function if defined
    const formattedTitle = header?.modifier ? header.modifier(header.title) : header?.displayName;
    return formattedTitle;
  };

  const rowFormatter = (row, column, rowIndex) => {
    // if any of the row includes timestamp we modify it
    if (['created_at', 'updated_at'].includes(column)) {
      return dayjs(row[column]).fromNow();
    }
    const inputColumns = ['bought_at', 'unit_price', 'quantity', 'name', 'description'];
    // if the selected event is disabled, no edit for items
    if (inputColumns.includes(column) && !disabled) {
      return (
        <EasyEdit
          type={Types.TEXT}
          onSave={(value) => {
            // the column.key is the db column name
            save(value, rowIndex, VIEW_ITEMS_COLUMN_HEADERS[column].key);
          }}
          onCancel={(o) => o}
          placeholder={row[column].toString()}
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

  if (!items || items.length === 0) {
    return <EmptyComponent subtitle="Add an item." />;
  }

  console.log(columns);

  return (
    <Container maxWidth="lg">
      <List
        title={'View current supplies'}
        subtitle={`Inventory Count: ${items.length > 0 ? items.length : `0`}`}
        tooltipTitle={'download inventory list'}
        fileName={'Event Inventory.xlsx'}
        sheetName={'Inventory Sheet'}
        data={items}
        columns={columns}
        filteredData={filteredItems}
        columnHeaderFormatter={columnHeaderFormatter}
        rowFormatter={rowFormatter}
      />
    </Container>
  );
};

export default ViewItemDetail;
