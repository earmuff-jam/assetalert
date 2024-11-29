import { Paper } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

import RowHeader from '../../../common/RowHeader';
import DataTable from '../../../common/DataTable/DataTable';
import { ITEMS_IN_CATEGORY_HEADER } from '../../Categories/constants';
import { pluralizeWord } from '../../../common/utils';

export default function CategoryItemDetailsDataTable({ itemsInCategory, handleOpenModal }) {
  return (
    <Paper elevation={1} sx={{ padding: '1rem' }}>
      <RowHeader
        title="Items"
        caption={`Total ${pluralizeWord('item', itemsInCategory?.length || 0)}`}
        primaryButtonTextLabel="Add"
        primaryStartIcon={<AddRounded />}
        handleClickPrimaryButton={handleOpenModal}
      />
      <DataTable
        rows={itemsInCategory}
        columns={ITEMS_IN_CATEGORY_HEADER}
        isEmpty={itemsInCategory === null}
        subtitle={'Associate items into category to begin.'}
      />
    </Paper>
  );
}
