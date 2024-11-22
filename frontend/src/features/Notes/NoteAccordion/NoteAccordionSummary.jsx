import { ExpandMoreRounded } from '@mui/icons-material';
import { AccordionSummary, Chip, Stack, Typography } from '@mui/material';

export default function NoteAccordionSummary({ noteCategory, totalNotes }) {
  return (
    <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1a-content" id="panel1a-header">
      <Stack direction="row" spacing={{ xs: 1 }}>
        <Typography variant="body1">{noteCategory}</Typography>
        <Chip label={totalNotes} size="small" />
      </Stack>
    </AccordionSummary>
  );
}
