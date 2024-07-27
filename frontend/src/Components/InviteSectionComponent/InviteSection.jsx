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
        label="Learn what your assets can offer."
        caption="Own stuffs but have a hard time managing it? Let us offer to consolidate all your assets into one single platform. Keep records
        of purchases and even manage items via geotracking capabilities. Lets try it out."
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
