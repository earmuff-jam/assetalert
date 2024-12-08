import { MenuOutlined } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

export default function AppToolbarTitle({ onClick }) {
  return (
    <>
      <IconButton size="small" onClick={onClick}>
        <MenuOutlined fontSize="small" />
      </IconButton>
      <Typography variant="h6" color="text.secondary" sx={{ flexGrow: 1 }}>
        AssetAlert
      </Typography>
    </>
  );
}
