import { Checkbox, Stack, TableCell } from '@mui/material';

export default function CustomCheckboxTableCell({ selectedID, isItemSelected, handleRowSelection }) {
  return (
    <TableCell size="small">
      <Stack direction="row" spacing={1}>
        <Checkbox
          checked={isItemSelected}
          color="primary"
          size="small"
          onClick={(event) => handleRowSelection(event, selectedID)}
          inputProps={{ 'aria-labelledby': 'labelId' }}
        />
      </Stack>
    </TableCell>
  );
}
