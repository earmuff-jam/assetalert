import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  row: {
    cursor: 'pointer',
  },
}));

dayjs.extend(relativeTime);

const TableComponent = ({ columns, options, displayReports, handleClick }) => {
  const classes = useStyles();
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((v) => (
            <TableCell key={v.id} align="center">
              {v.modifier(v.label)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {options?.map((item, index) => (
          <TableRow hover key={item.id} onClick={() => handleClick(item)} className={classes.row}>
            {!displayReports ? (
              <>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">{item?.description || 'N/A'}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">{item.location}</TableCell>
                <TableCell align="center">{dayjs(item.updated_at).fromNow()}</TableCell>
                <TableCell align="center">{item.updater_name}</TableCell>
              </>
            ) : (
              <>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="left">{item.subject}</TableCell>
                <TableCell align="left">{item?.description || 'N/A'}</TableCell>
                <TableCell align="center">{dayjs(item.updated_at).fromNow()}</TableCell>
                <TableCell align="center">{item.updator_name}</TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

TableComponent.defaultProps = {
  columns: [],
  options: [],
  displayReports: false,
  handleClick: () => {},
};

TableComponent.propTypes = {
  columns: PropTypes.array,
  options: PropTypes.array,
  displayReports: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default TableComponent;
