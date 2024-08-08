import {
  Checkbox,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { EditRounded, FileOpenRounded } from '@mui/icons-material';
import { EmptyComponent } from '../common/utils';

/**
 * TableComponent React Function - Displays the inventory table
 * @param {boolean} hideActionMenu - determines if extra functionality should be present, like selection of rows, defaults: false
 * @param {boolean} isLoading - determines if the selected data is still in loading state
 * @param {Array<Object>} columns - the columns to display for the table
 * @param {Function} rowFormatter - the row formatter to format each row
 * @param {Array<Object>} data - the data to display for each row in the table
 * @param {Array<String>} rowSelected - the array of IDs that represent each item
 * @param {Array<Object>} onRowSelect - the array of inventory items that is selected
 * @param {Function} handleRowSelection - the function that is used to handle selection of rows
 * @param {Function} handleEdit - the function that is used to handle editing capabilities
 */
const TableComponent = ({
  hideActionMenu = false,
  isLoading,
  columns,
  data,
  rowFormatter,
  rowSelected,
  onRowSelect,
  handleRowSelection,
  handleEdit,
}) => {
  if (isLoading) return <Skeleton variant="rounded" animation="wave" height="10vh" width="100%" />;
  if (!data || data.length === 0) {
    return <EmptyComponent />;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {!hideActionMenu ? (
              <TableCell padding="checkbox">
                <Stack direction="row" alignItems="center">
                  <Checkbox size="small" onClick={(ev) => handleRowSelection(ev, 'all')} />
                  <Typography fontWeight="bold">Action</Typography>
                </Stack>
              </TableCell>
            ) : null}
            {Object.keys(columns).map((colKey) => {
              const column = columns[colKey];
              return (
                <TableCell key={column.id}>
                  <Typography fontWeight="bold">{column.label}</Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => {
            const isSelected = (id) => rowSelected.indexOf(id) !== -1;
            const selectedID = row.id;
            const isItemSelected = isSelected(selectedID);
            // fix titleColor issues
            const title = '';
            const color = '';
            // const { title, color } = generateTitleColor(row, isCategory, override);
            return (
              <Tooltip key={rowIndex} title={title}>
                <TableRow hover>
                  {!hideActionMenu ? (
                    <TableCell padding="checkbox">
                      <Stack direction="row">
                        <Checkbox
                          checked={isItemSelected}
                          color="primary"
                          size="small"
                          onClick={(event) => handleRowSelection(event, selectedID)}
                          inputProps={{ 'aria-labelledby': 'labelId' }}
                        />
                        <IconButton onClick={() => handleEdit(selectedID)} size="small">
                          <EditRounded color="primary" fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => onRowSelect(row)}>
                          <FileOpenRounded color="primary" fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  ) : null}
                  {Object.keys(columns).map((colKey) => {
                    const column = columns[colKey];
                    return <TableCell key={column.id}>{rowFormatter(row, column.colName, color)}</TableCell>;
                  })}
                </TableRow>
              </Tooltip>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
