import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import { profileActions } from '../Profile/profileSlice';
import { DeleteRounded, EditRounded, ExpandMoreRounded } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { categorizeNotes, ConfirmationBoxModal, DisplayNoMatchingRecordsComponent } from '../common/utils';

const NotesDetails = ({ notes, loading, setEditMode, setSelectedNoteID }) => {
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);

  const [deleteID, setDeleteID] = useState(-1);
  const [formattedNotes, setFormattedNotes] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const reset = () => {
    setConfirmDelete(false);
    setDeleteID(-1);
  };

  const handleConfirmDelete = () => {
    removeSelectedNote(deleteID);
    setConfirmDelete(false);
  };

  const removeSelectedNote = (noteID) => {
    const formattedDraftNotes = {
      noteID: noteID,
      updated_by: localStorage.getItem('userID'),
    };
    dispatch(profileActions.removeSelectedNote(formattedDraftNotes));
    enqueueSnackbar('Successfully removed notes.', {
      variant: 'success',
    });
  };

  useEffect(() => {
    if (Array.isArray(notes) && notes.length >= 0) {
      const transformedData = categorizeNotes(notes);
      setFormattedNotes(transformedData);
    }
  }, [loading, notes]);

  if (loading) {
    return <Skeleton width={`calc(100% - 1rem)`} height={'2rem'} />;
  }

  if (!notes || notes.length === 0) {
    return <DisplayNoMatchingRecordsComponent subtitle="Add new notes." />;
  }

  return (
    <div>
      {formattedNotes.map((v, index) => (
        <Accordion key={index} elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1a-content" id="panel1a-header">
            <Stack direction="row" spacing={{ xs: 1 }}>
              <Typography variant="body1">{v.category}</Typography>
              <Chip label={v.totalNotes} size="small" />
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing="1rem">
              {v.details.map((note, index) => (
                <Stack
                  key={index}
                  sx={{ bgcolor: 'secondary.light', justifyContent: 'space-between', flexGrow: 1, p: 1, borderRadius: '0.2rem' }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6">{note.note_title}</Typography>
                    <Stack direction="row" alignSelf="flex-end">
                      <IconButton
                        onClick={() => {
                          setConfirmDelete(true);
                          setDeleteID(note.noteID);
                        }}
                        size="small"
                      >
                        <DeleteRounded fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setEditMode(true);
                          setSelectedNoteID(note.noteID);
                        }}
                        size="small"
                      >
                        <EditRounded fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Typography variant="body2">{note.note_description}</Typography>
                  <Typography variant="caption" alignSelf="flex-end">{note.updator}</Typography>
                  <Typography variant="caption" alignSelf="flex-end">{dayjs(note.updated_at).fromNow()}</Typography>
                </Stack>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
      <ConfirmationBoxModal
        openDialog={confirmDelete}
        title="Confirm deletion"
        text="Confirm deletion of selected note? Deletion is permanent and cannot be undone."
        textVariant="body2"
        handleClose={reset}
        maxSize="sm"
        deleteID={deleteID}
        confirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

NotesDetails.defaultProps = {
  notes: [],
  loading: false,
  setEditMode: () => {},
  setSelectedNoteID: () => {},
};

NotesDetails.propTypes = {
  setEditMode: PropTypes.func,
  setSelectedNoteID: PropTypes.func,
  notes: PropTypes.array,
  loading: PropTypes.bool,
};

export default NotesDetails;
