import { Card, CardContent } from '@mui/material';
import HomeContentCardRowItem from './HomeContentCardItem/HomeContentCardRowItem';

export default function HomeContent({ assets = [], categories = [], maintenancePlans = [] }) {
  return (
    <Card>
      <CardContent>
        <HomeContentCardRowItem assets={assets} categories={categories} maintenancePlans={maintenancePlans} />
      </CardContent>
    </Card>
  );
}
