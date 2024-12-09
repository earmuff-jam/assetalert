import { Card, CardContent } from '@mui/material';

export default function OverviewCardWrapper({ children }) {
  return (
    <Card sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
