import { TableBody, TableCell, TableRow } from '@mui/material';

import CustomCheckboxTableCell from './CustomCheckboxTableCell';
import CustomShowActionsTableCell from './CustomShowActionsTableCell';

export default function CustomTableBody({
  data,
  columns,
  rowSelected,
  hideCheckBox,
  handleRowSelection,
  rowFormatter,
  showActions,
  handleEdit,
  onRowSelect,
  hideIconButton,
  hideMoreDetailsButton,
}) {
  return (
    <TableBody>
      {data.map((row) => {
        const isSelected = (id) => rowSelected.indexOf(id) !== -1;
        const selectedID = row.id;
        const isItemSelected = isSelected(selectedID);
        return (
          <TableRow hover key={row.id}>
            {!hideCheckBox && (
              <CustomCheckboxTableCell
                selectedID={selectedID}
                isItemSelected={isItemSelected}
                handleRowSelection={handleRowSelection}
              />
            )}
            {Object.keys(columns).map((colKey) => {
              const column = columns[colKey];
              return (
                <TableCell key={column.id} size="small">
                  {rowFormatter(row, column.colName, column)}
                </TableCell>
              );
            })}
            {showActions && (
              <CustomShowActionsTableCell
                row={row}
                selectedID={selectedID}
                handleEdit={handleEdit}
                onRowSelect={onRowSelect}
                hideIconButton={hideIconButton}
                hideMoreDetailsButton={hideMoreDetailsButton}
              />
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
