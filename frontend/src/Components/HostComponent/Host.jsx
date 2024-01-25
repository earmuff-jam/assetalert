import React from 'react';
import { BUILD_TABLE_CONSTANTS } from '../Event/constants';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableRow, CircularProgress } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: 'max-content',
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
  },
  blueTableCell: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontSize: '0.925rem',
  },
  tableRow: {
    '& td': {
      borderBottom: 'none',
    },
  },
  emptyGap: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
}));

const Host = ({ selectedEvent }) => {
  const classes = useStyles();

  if (selectedEvent === undefined || Object.keys(selectedEvent).length <= 0) {
    return (
      <div className={classes.spinnerContainer}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Table className={classes.container}>
      <TableBody>
        {BUILD_TABLE_CONSTANTS(selectedEvent).map((row) => (
          <TableRow key={row.id} className={classes.tableRow}>
            <TableCell className={classNames(classes.text, classes.blueTableCell)}>{row.id}</TableCell>
            <TableCell className={classNames(classes.text)}>{row.label}</TableCell>
            <TableCell
              className={classNames(classes.text, classes.columnContainer, { [classes.emptyGap]: row.id === 5 })}
            >
              {row.value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Host;
