import { ExpandMoreRounded } from '@mui/icons-material';
import { AccordionSummary, Chip, Stack, Typography } from '@mui/material';

export default function NoteAccordionSummary({ title, totalNotes, color }) {
  return (
    <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1a-content" id="panel1a-header">
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Chip label={totalNotes} size="small" color={color} />
      </Stack>
    </AccordionSummary>
  );
}
