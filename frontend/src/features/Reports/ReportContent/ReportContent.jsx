import dayjs from 'dayjs';

import RowHeader from '../../../common/RowHeader';
import DataTable from '../../../common/DataTable/DataTable';
import { ITEMS_IN_MAINTENANCE_PLAN_HEADER } from '../../MaintenancePlanList/constants';

export default function ReportContent({ sinceValue, inventories }) {
  return (
    <>
      <RowHeader title="Asset Details" caption={`Asset movement since ${dayjs(sinceValue).fromNow()}`} />
      <DataTable
        rows={inventories}
        columns={ITEMS_IN_MAINTENANCE_PLAN_HEADER}
        subtitle={'Associate items into maintenance plan to begin.'}
      />
    </>
  );
}
