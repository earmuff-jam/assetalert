import { Paper } from '@mui/material';
import MaintenancePlanItemDetailsGraphContent from '@features/MaintenancePlanItemDetails/MaintenancePlanItemDetailsContent/MaintenancePlanItemDetailsGraphContent';

export default function MaintenancePlanItemDetailsGraph({ associatedAssets = [] }) {
  return (
    <Paper elevation={1} sx={{ padding: '1rem' }}>
      <MaintenancePlanItemDetailsGraphContent associatedAssets={associatedAssets} />
    </Paper>
  );
}
