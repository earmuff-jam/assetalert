import { AddRounded } from '@mui/icons-material';
import DataTable from '../../../../common/DataTable/DataTable';
import RowHeader from '../../../../common/RowHeader';
import { ITEMS_IN_MAINTENANCE_PLAN_HEADER } from '../../../MaintenancePlanList/constants';

export default function ItemContent({ totalItems, handleOpenModal }) {
  return (
    <>
      <RowHeader
        title="Items"
        caption={`Total ${totalItems?.length || 0} item(s)`}
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
    </>
  );
}
