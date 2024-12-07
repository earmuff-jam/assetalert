import { Paper } from '@mui/material';
import RowHeader from '@common/RowHeader';
import MaintenancePlanItemDetailsGraphContent from '@features/MaintenancePlanItemDetails/MaintenancePlanItemDetailsContent/MaintenancePlanItemDetailsGraphContent';

export default function MaintenancePlanItemDetailsGraph({ associatedAssets = [] }) {
  return (
    <Paper elevation={1} sx={{ padding: '1rem' }}>
      <RowHeader title="Graph" caption="Graph details for last 10 recently updated" />
      <MaintenancePlanItemDetailsGraphContent associatedAssets={associatedAssets} />
    </Paper>
  );
}
