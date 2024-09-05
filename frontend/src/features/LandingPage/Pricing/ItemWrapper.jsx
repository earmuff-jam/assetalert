import { Button, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';

export const ItemWrapper = ({ title, pricing, perRatio, bulletList }) => {
  return (
    <Stack sx={{ border: '0.1px solid', borderColor: 'secondary.main', padding: '2rem' }}>
      <Typography variant="h4">{title}</Typography>
      <Stack direction="row" spacing="0.1rem" alignItems="flex-end" paddingBottom="1rem">
        <Typography variant="h1">{pricing}</Typography>
        <Typography variant="caption">{perRatio}</Typography>
      </Stack>
      <List>
        {bulletList.map((v) => (
          <ListItem sx={{ padding: '0.4rem', margin: '0rem' }} key={v}>
            <ListItemText>&bull;{` ${v}`} </ListItemText>
          </ListItem>
        ))}
      </List>
      <Button variant="contained">Learn More</Button>
    </Stack>
  );
};
