import React from 'react';
import { BUILD_TABLE_CONSTANTS } from '../Event/constants';
import { Table, TableBody, TableCell, TableRow, makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: 'max-content',
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
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
    <Table className={classes.container}>
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
