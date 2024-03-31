import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import dayjs from 'dayjs';
import List from '../DrawerListComponent/List';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDispatch, useSelector } from 'react-redux';
import EmptyComponent from '../../util/EmptyComponent';
import { VIEW_CURRENT_SUPPLIES_COLUMNS } from './constants';
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

  const tableOptions = {
    filterType: 'checkbox',
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

  return (
    <List
      title={'View current supplies'}
      subtitle={`Inventory Count: ${items.length > 0 ? items.length : `0`}`}
      tooltipTitle={'download inventory list'}
      fileName={'Event Inventory.xlsx'}
      sheetName={'Inventory Sheet'}
      data={items}
      columns={VIEW_CURRENT_SUPPLIES_COLUMNS}
      filteredData={filteredItems}
      tableOptions={tableOptions}
      applyHeightVariant={true} // gives space to drawer component to close
    />
  );
};

export default ViewItemDetail;
