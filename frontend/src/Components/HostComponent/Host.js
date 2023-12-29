import React from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  makeStyles,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import { BUILD_TABLE_CONSTANTS } from '../Event/constants';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  blueTableCell: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
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
    <Table>
      <TableBody>
        {BUILD_TABLE_CONSTANTS(selectedEvent).map((row) => (
          <TableRow key={row.label}>
            <TableCell className={classes.blueTableCell}>{row.label}</TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Host;
