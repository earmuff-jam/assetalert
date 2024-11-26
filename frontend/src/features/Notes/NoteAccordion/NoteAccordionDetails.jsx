import dayjs from 'dayjs';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { AccordionDetails, Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { STATUS_OPTIONS } from '../constants';

export default function NoteAccordionDetails({
  details,
  setEditMode,
  setSelectedNoteID,
  setConfirmDelete,
  setDeleteID,
}) {
  return (
    <AccordionDetails>
      <Stack spacing="1rem">
        {details.map((note, index) => (
          <Stack
            key={index}
            sx={{
              justifyContent: 'space-between',
              flexGrow: 1,
              p: 1,
              borderRadius: '0.2rem',
              borderLeft: '0.175rem solid',
              borderColor: note.color ? `${note.color}` : 'primary.main',
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">{note.title}</Typography>
              <Stack direction="row" alignSelf="flex-end">
                <IconButton
                  onClick={() => {
                    setConfirmDelete(true);
                    setDeleteID(note.noteID);
                  }}
                  size="small"
                >
                  <DeleteRounded fontSize="small" color="error" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setEditMode(true);
                    setSelectedNoteID(note.noteID);
                  }}
                  size="small"
                >
                  <EditRounded fontSize="small" color="primary" />
                </IconButton>
              </Stack>
            </Stack>
            <Typography variant="body2">{note.description}</Typography>
            <Row>
              <>
                <Box>
                  <Typography variant="caption">
                    By {note.updator} {dayjs(note.updated_at).fromNow()}
                  </Typography>
                </Box>
                <Tooltip title={STATUS_OPTIONS.find((v) => v.label.toLowerCase() === note.status_name)?.display}>
                  <Stack direction="row" spacing="0.2rem" alignItems="center" alignSelf="flex-end">
                    {STATUS_OPTIONS.find((v) => v.label.toLowerCase() === note.status_name)?.icon}
                  </Stack>
                </Tooltip>
              </>
            </Row>
          </Stack>
        ))}
      </Stack>
    </AccordionDetails>
  );
}

const Row = ({ children }) => {
  return (
    <Stack direction="row" spacing="0.2rem" alignItems="center" justifyContent="space-between">
      {children}
    </Stack>
  );
};
