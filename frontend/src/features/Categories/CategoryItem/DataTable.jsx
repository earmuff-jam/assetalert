import { DataGrid } from '@mui/x-data-grid';
import EmptyComponent from '../../../util/EmptyComponent';
import { Stack } from '@mui/material';

export default function DataTable({ rows, columns, isEmpty }) {
  if (isEmpty) {
    return <EmptyComponent subtitle={'Associate items into category to begin.'} />;
  }

  return (
    <Stack style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Stack>
  );
}
