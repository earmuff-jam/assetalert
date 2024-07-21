import { Typography, Stack } from '@mui/material';
import { DonutLargeRounded, LibraryBooksRounded, TrackChangesRounded } from '@mui/icons-material';

export const Row = ({ icon, label, caption }) => {
  return (
    <Stack direction="row" spacing="1rem" alignItems="center">
      {icon}
      <Stack>
        <Typography variant="h6">{label}</Typography>
        <Typography variant="caption">{caption}</Typography>
      </Stack>
    </Stack>
  );
};

const InviteSection = () => {
  return (
    <Stack spacing="2rem">
      <Row
        icon={<LibraryBooksRounded />}
        label="Learn what you can offer."
        caption="Contribute your skills and time to make a positive impact on your community. Track them and maintain
          inventories of items. Volunteer for local events, help those in need, and be a part of meaningful initiatives."
      />
      <Row
        icon={<TrackChangesRounded />}
        label="Target inventory management."
        caption=" Utilize our digital platform to trace and track your inventories effectively. Set up maintenance plans and
          threshold limits for inventory items to ensure smooth operations. Enjoy easy access to all your inventory
          items, enabling seamless management and optimization of resources."
      />
      <Row
        icon={<DonutLargeRounded />}
        label="Visualize expense reports."
        caption="Visualize, analyze, and monitor spending habits with customizable graphs on demand. Log spending on events,
          projects, or initiatives, get approvals when necessary, and view comprehensive spending habits to make
          informed decisions and optimize resource allocation effectively."
      />
    </Stack>
  );
};

export default InviteSection;
