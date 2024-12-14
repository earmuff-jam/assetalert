import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

export default function DataTable({ data, headerColumns }) {
  const columns = useMemo(() => headerColumns, []);

  const table = useMaterialReactTable({
    columns,
    data,
    muiTableContainerProps: { sx: { maxHeight: '600px' } },
    enableColumnResizing: true,
    enableDensityToggle: false,
    initialState: { density: 'compact' },
  });

  return <MaterialReactTable table={table} />;
}
