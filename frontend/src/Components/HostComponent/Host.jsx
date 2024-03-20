import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { BUILD_TABLE_CONSTANTS } from '../Event/constants';
import { Table, TableBody, TableCell, TableRow, CircularProgress } from '@material-ui/core';

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
    fontSize: '0.825rem',
    fontFamily: 'Roboto',
  },
  bolderText: {
    fontWeight: 'bold',
  },
  tableRow: {
    '& td': {
      padding: theme.spacing(1.25),
      borderBottom: 'none',
    },
  },
  darkbackgroundColor: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.grey[100],
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
            <TableCell
              className={classNames(classes.text, classes.bolderText, {
                [classes.darkbackgroundColor]: row.id % 2 === 0,
              })}
            >
              {row.label}
            </TableCell>
            <TableCell
              className={classNames(
                classes.text,
                classes.columnContainer,
                { [classes.emptyGap]: row.id === 5 },
                { [classes.darkbackgroundColor]: row.id % 2 === 0 }
              )}
            >
              {row.value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

Host.defaultProps = {
  selectedEvent: {},
};

Host.propTypes = {
  selectedEvent: PropTypes.object,
};
export default Host;
