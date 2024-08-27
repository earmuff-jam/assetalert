import { DataGrid } from '@mui/x-data-grid';
import EmptyComponent from '../../../util/EmptyComponent';
import { Box } from '@mui/material';

export default function DataTable({ rows, columns, isEmpty }) {
  if (isEmpty) {
    return <EmptyComponent subtitle={'Associate items into category to begin.'} />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'table',
        tableLayout: 'fixed',
        height: "10rem"
      }}
    >
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
    </Box>
  );
}
