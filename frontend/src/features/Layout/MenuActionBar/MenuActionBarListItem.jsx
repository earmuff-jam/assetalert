import { useTheme } from '@emotion/react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export default function MenuActionBarListItem({ label, icon, isSelected, handleClick, rowReverse = false }) {
  const theme = useTheme();

  return (
    <ListItemButton selected={isSelected} onClick={handleClick} sx={{ flexDirection: rowReverse && 'row-reverse' }}>
      <ListItemIcon sx={{ color: isSelected && theme.palette.primary.main }}>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
}
