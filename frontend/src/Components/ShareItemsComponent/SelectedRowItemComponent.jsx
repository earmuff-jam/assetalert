import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SHARED_INVENTORY_ITEMS } from './constants';
import EmptyComponent from '../../util/EmptyComponent';
import { BUILD_TABLE_CONSTANTS } from '../Event/constants';
import { Table, TableBody, TableCell, TableRow, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  blueTableCell: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
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

const SelectedRowItemComponent = ({ selectedRow }) => {
  const classes = useStyles();

  if (Object.keys(selectedRow).length === 0) {
    return <EmptyComponent subtitle="Select a row to display more details..." />;
  }

  return (
    <Table>
      <TableBody>
        {BUILD_TABLE_CONSTANTS(SHARED_INVENTORY_ITEMS)(selectedRow).map((row) => (
          <TableRow key={row.id} className={classes.tableRow}>
            <TableCell className={classNames(classes.text, classes.blueTableCell)}>{row.id}</TableCell>
            <TableCell
              className={classNames(classes.text, classes.bolderText, {
                [classes.darkbackgroundColor]: row.id % 2 === 0,
              })}
            >
              {row.label}
            </TableCell>
            <TableCell className={classes.text}>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

SelectedRowItemComponent.defaultProps = {
  selectedRow: {},
};

SelectedRowItemComponent.propTypes = {
  selectedRow: PropTypes.object,
};

export default SelectedRowItemComponent;
