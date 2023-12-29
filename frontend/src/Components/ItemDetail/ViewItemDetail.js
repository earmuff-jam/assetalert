import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyComponent from '../../util/EmptyComponent';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  makeStyles,
} from '@material-ui/core';

import { CancelRounded, DoneRounded } from '@material-ui/icons';

import moment from 'moment/moment';
import EasyEdit, { Types } from 'react-easy-edit';
import DownloadExcelButton from './DownloadExcelButton';
import { VIEW_ITEMS_COLUMN_HEADERS } from './constants';
import { eventActions } from '../../Containers/Event/eventSlice';

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    padding: theme.spacing(1),
    maxHeight: '40vh',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: '1.2rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
  },
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
  const { loading, items } = useSelector((state) => state.event);
  const { loading: userDetailsLoading, profileDetails } = useSelector((state) => state.profile);

  // removing unwanted values from the display column
  const formattedItems = items?.map((item) => {
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

  const formatColumnHeader = (column) => {
    const header = VIEW_ITEMS_COLUMN_HEADERS[column];
    // Apply a modifier function if defined
    const formattedTitle = header?.modifier ? header.modifier(header.title) : header?.displayName;
    return formattedTitle;
  };

  const formatRow = (row, column, rowIndex) => {
    // if any of the row includes timestamp we modify it
    if (['created_at', 'updated_at'].includes(column)) {
      return moment(row[column]).fromNow();
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

  if (!items || items.length === 0) {
    return <EmptyComponent subtitle="Add an item." />;
  }

  return (
    <>
      <Typography className={classes.text}>View current supplies</Typography>
      <Box className={classes.tableWrapper}>
        <Typography>
          {`Viewing ${items.length > 0 ? items.length : `0`} items in inventory`}
          {items.length > 0 && <DownloadExcelButton items={items} />}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column} className={classes.tableHeaderCell}>
                    {formatColumnHeader(column)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {formattedItems.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column}>{formatRow(row, column, rowIndex)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ViewItemDetail;
