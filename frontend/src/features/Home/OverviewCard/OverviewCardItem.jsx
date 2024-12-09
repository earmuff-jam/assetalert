import { pluralizeWord } from '@common/utils';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';

export default function OverviewCardItem({ tooltipTitle, dataLabel, icon, label, color, word = 'asset', handleClick }) {
  return (
    <Tooltip title={tooltipTitle}>
      <Stack textAlign="center" onClick={handleClick} sx={{ cursor: handleClick ? 'pointer' : 'inherit' }}>
        <Typography variant="h3" color={color}>
          {dataLabel}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <IconButton disabled size="small">
            {icon}
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            {pluralizeWord(word, dataLabel)}
          </Typography>
        </Stack>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
      </Stack>
    </Tooltip>
  );
}
