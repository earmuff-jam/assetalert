import { EmptyComponent } from '@common/utils';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { BUILD_TABLE_CONSTANTS } from '@features/Assets/constants';

export default function AssetDetailsDrawerContent({ selectedRow = {}, columns = [] }) {
  if (Object.keys(selectedRow).length === 0) {
    return <EmptyComponent />;
  }

  return (
    <Table>
      <TableBody>
        {BUILD_TABLE_CONSTANTS(columns)(selectedRow).map(({ id, label, value }) => (
          <TableRow key={label}>
            <TableCell>{id}</TableCell>
            <TableCell>{label}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
