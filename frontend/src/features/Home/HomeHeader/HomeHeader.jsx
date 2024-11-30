import { CategoryRounded, EngineeringRounded, WarningRounded } from '@mui/icons-material';
import { Card, CardContent, IconButton, Stack, Skeleton, Typography, Tooltip } from '@mui/material';

import RowHeader from '../../../common/RowHeader';
import { pluralizeWord } from '../../../common/utils';

export default function HomeHeader({
  assetsUnderCategories = [],
  assetsUnderMaintenancePlans = [],
  assetsPastDue = [],
}) {
  return (
    <>
      <RowHeader title="Asset Summary" />
      <Stack direction="row" spacing={{ xs: 1 }} useFlexGap flexWrap="wrap">
        <CardItem>
          <ColumnItem
            label="assigned categories"
            icon={<CategoryRounded />}
            color="primary"
            tooltipTitle={assetsUnderCategories.flatMap((v) => v.items).join(', ')}
            dataLabel={assetsUnderCategories.flatMap((v) => v.items).length}
            loading={false}
          />
        </CardItem>
        <CardItem>
          <ColumnItem
            label="assigned maintenance plan"
            icon={<EngineeringRounded />}
            color="primary"
            tooltipTitle={assetsUnderMaintenancePlans.flatMap((v) => v.items).join(', ')}
            dataLabel={assetsUnderMaintenancePlans.flatMap((v) => v.items).length}
            loading={false}
          />
        </CardItem>
        <CardItem>
          <ColumnItem
            label="past return deadline"
            icon={<WarningRounded />}
            color="error"
            tooltipTitle={assetsPastDue.join(', ')}
            dataLabel={assetsPastDue.length}
            loading={false}
          />
        </CardItem>
      </Stack>
    </>
  );
}

const CardItem = ({ children }) => (
  <Card sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
    <CardContent>{children}</CardContent>
  </Card>
);

const ColumnItem = ({ tooltipTitle, label, dataLabel, icon, color, loading }) => {
  if (loading) return <Skeleton height="1rem" />;
  return (
    <Tooltip title={tooltipTitle}>
      <Stack textAlign="center">
        <Typography variant="h4" color={color}>
          {dataLabel}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <IconButton disabled size="small">
            {icon}
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            {pluralizeWord('asset', dataLabel)}
          </Typography>
        </Stack>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
      </Stack>
    </Tooltip>
  );
};
