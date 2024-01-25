import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyComponent from '../../util/EmptyComponent';
import { makeStyles } from '@material-ui/core/styles';
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
  Container,
} from '@material-ui/core';

import { CancelRounded, DoneRounded } from '@material-ui/icons';

import EasyEdit, { Types } from 'react-easy-edit';
import DownloadExcelButton from './DownloadExcelButton';
import { VIEW_ITEMS_COLUMN_HEADERS } from './constants';
import { eventActions } from '../../Containers/Event/eventSlice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    padding: theme.spacing(1),
    maxHeight: '40vh',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: '2.0rem',
    letterSpacing: '0.125rem',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
  },
  text: {
    fontSize: '0.925rem',
    fontWeight: 'lighter',
    color: theme.palette.error.dark,
    margin: theme.spacing(2),
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  dayjs.extend(relativeTime);

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
    <Container maxWidth="lg">
      <Typography className={classes.headerText}>View current supplies</Typography>
      <Box className={classes.tableWrapper}>
        <Box className={classes.rowContainer}>
          <Typography className={classes.text}>
            {`Inventory Count: ${items.length > 0 ? items.length : `0`}`}
          </Typography>
          {items.length > 0 && <DownloadExcelButton items={items} />}
        </Box>
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
    </Container>
  );
};

export default ViewItemDetail;
