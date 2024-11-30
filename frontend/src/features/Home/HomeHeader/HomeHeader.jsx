import dayjs from 'dayjs';

import { Card, CardContent, IconButton, Stack, Skeleton, Typography } from '@mui/material';
import { CategoryRounded, EngineeringRounded, WarningRounded } from '@mui/icons-material';

import RowHeader from '../../../common/RowHeader';
import { pluralizeWord } from '../../../common/utils';

export default function HomeHeader({ categories = [], maintenancePlans = [], assets = [] }) {
  const totalPastDueItems = assets.filter((v) => dayjs(v.returntime).isBefore(dayjs())).length || 0;
  const totalItemsUnderCategory = categories.reduce((acc, el) => {
    if (el.items && el.items[0] != '') {
      acc += el.items.length;
    }
    return acc;
  }, 0);

  const totalItemsUnderMaintenancePlans = maintenancePlans.reduce((acc, el) => {
    if (el.items && el.items[0] != '') {
      acc += el.items.length;
    }
    return acc;
  }, 0);

  return (
    <>
      <RowHeader title="Asset Summary" />
      <Stack direction="row" spacing={{ xs: 1 }} useFlexGap flexWrap="wrap">
        <CardItem>
          <ColumnItem
            label="assigned categories"
            icon={<CategoryRounded />}
            color="primary"
            dataLabel={totalItemsUnderCategory}
            loading={false}
          />
        </CardItem>
        <CardItem>
          <ColumnItem
            label="assigned maintenance plan"
            icon={<EngineeringRounded />}
            color="primary"
            dataLabel={totalItemsUnderMaintenancePlans}
            loading={false}
          />
        </CardItem>
        <CardItem>
          <ColumnItem
            label="past return deadline"
            icon={<WarningRounded />}
            color="error"
            dataLabel={totalPastDueItems}
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

const ColumnItem = ({ label, dataLabel, icon, color, loading }) => {
  if (loading) return <Skeleton height="1rem" />;
  return (
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
  );
};
