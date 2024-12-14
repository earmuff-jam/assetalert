import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import RowHeader from '@common/RowHeader';
import DataTable from '@common/DataTable/DataTable';
import { ASSETS_IN_REPORTS_HEADER } from '@features/Reports/constants';

dayjs.extend(relativeTime);

export default function ReportContent({ sinceValue, assets }) {
  return (
    <>
      <RowHeader title="Asset Details" caption={`Asset movement since ${dayjs(sinceValue).fromNow()}`} />
      <DataTable data={assets} headerColumns={ASSETS_IN_REPORTS_HEADER} />
    </>
  );
}
