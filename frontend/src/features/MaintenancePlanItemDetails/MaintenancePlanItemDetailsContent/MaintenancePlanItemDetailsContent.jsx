import { Paper } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

import RowHeader from '../../../common/RowHeader';
import { pluralizeWord } from '../../../common/utils';
import DataTable from '../../../common/DataTable/DataTable';
import { ITEMS_IN_MAINTENANCE_PLAN_HEADER } from '../../MaintenancePlanList/constants';

export default function MaintenancePlanItemDetailsContent({ totalItems, handleOpenModal }) {
  return (
    <Paper elevation={1} sx={{ padding: '1rem' }}>
      <RowHeader
        title="Items"
        caption={`Total ${pluralizeWord('item', totalItems?.length || 0)}`}
        primaryButtonTextLabel="Add Items"
        primaryStartIcon={<AddRounded />}
        handleClickPrimaryButton={handleOpenModal}
      />
      <DataTable
        rows={totalItems}
        isEmpty={totalItems === null}
        columns={ITEMS_IN_MAINTENANCE_PLAN_HEADER}
        subtitle={'Associate items into maintenance plan to begin.'}
      />
    </Paper>
  );
}
