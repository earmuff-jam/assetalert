import { useParams } from 'react-router-dom';
import CategoryItemCard from './CategoryItemCard';
import DataTable from './DataTable';
import { Skeleton, Stack } from '@mui/material';
import HeaderWithButton from '../../common/HeaderWithButton';
import { AddRounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { categoryActions } from '../categoriesSlice';
import PieBarChart from '../../../util/Chart/PieBarChart';
import EmptyComponent from '../../../util/EmptyComponent';

export default function CategoryItem() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCategory, itemsInCategory = [], loading = false } = useSelector((state) => state.categories);

  const itemColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    {
      field: 'min_items',
      headerName: 'Min Items',
      type: 'number',
      width: 90,
    },
    {
      field: 'max_items',
      headerName: 'Max Items',
      type: 'number',
      width: 90,
    },
    {
      field: 'sharable_groups',
      headerName: 'Sharing with',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.name || ''} ${row.description || ''}`,
    },
  ];

  const itemRows = [
    { id: 1, description: 'Snow', name: 'Jon', max_items: 35, min_items: 3 },
    { id: 2, description: 'Lannister', name: 'Cersei', max_items: 42, min_items: 4 },
    { id: 3, description: 'Lannister', name: 'Jaime', max_items: 45, min_items: 5 },
    { id: 4, description: 'Stark', name: 'Arya', max_items: 16, min_items: 1 },
    { id: 5, description: 'Targaryen', name: 'Daenerys', max_items: null, min_items: null },
    { id: 6, description: 'Melisandre', name: null, max_items: 150, min_items: 1 },
    { id: 7, description: 'Clifford', name: 'Ferrara', max_items: 44, min_items: 4 },
    { id: 8, description: 'Frances', name: 'Rossini', max_items: 36, min_items: 3 },
    { id: 9, description: 'Roxie', name: 'Harvey', max_items: 65, min_items: 5 },
  ];

  useEffect(() => {
    if (id) {
      dispatch(categoryActions.getItemsForCategory(id));
      dispatch(categoryActions.getCategory(id));
    }
  }, [id]);

  if (loading) {
    return <Skeleton width="80rem" height="20rem" />;
  }

  return (
    <Stack direction="column" spacing="1rem">
      <HeaderWithButton title={selectedCategory?.name ? `${selectedCategory.name} Overview` : 'Category Overview'} />
      <CategoryItemCard selectedCategory={selectedCategory} />
      <HeaderWithButton
        title="Items"
        secondaryTitle={`Total ${itemRows.length || 0} item(s)`}
        primaryButtonTextLabel="Add Items"
        primaryStartIcon={<AddRounded />}
      />
      <DataTable rows={itemRows} columns={itemColumns} isEmpty={itemsInCategory === null} />
      <HeaderWithButton title="History" />

      <Stack
        direction="row"
        spacing="1rem"
        justifyContent={itemsInCategory === null ? 'center' : 'space-between'}
        sx={{ flexGrow: 1 }}
      >
        {itemsInCategory ? (
          <>
            <Stack>
              <DataTable rows={itemRows} columns={itemColumns} />
            </Stack>
            <Stack>
              <PieBarChart
                chartType="pie"
                legendLabel="Need attention"
                data={[0, 1, 1 - (0 + 2)].map((v, index) => ({
                  label: ['under categories', 'under maintenance', 'unassigned'][index],
                  count: v,
                  color: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(211, 211, 211)'][index],
                }))}
                backgroundColor="rgba(75, 192, 192, 0.4)"
                borderColor="rgba(75, 192, 192, 1)"
              />
            </Stack>
          </>
        ) : (
          <Stack display="flex" justifyContent="center">
            <EmptyComponent subtitle={'Associate items into category to begin.'} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
