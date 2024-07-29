import AddNote from './AddNote';
import NotesDetails from './NotesDetails';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Stack, Typography } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { profileActions } from '../Profile/profileSlice';
import SimpleModal from '../common/SimpleModal';

const Notes = () => {
  const dispatch = useDispatch();
  const { loading, notes } = useSelector((state) => state.profile);

  const [editMode, setEditMode] = useState(false);
  const [selecteNoteID, setSelectedNoteID] = useState(null);

  const handleEditMode = () => setEditMode(!editMode);

  const resetData = () => {
    setEditMode(false);
    setSelectedNoteID(null);
  };

  useEffect(() => {
    dispatch(profileActions.getUserNotes());
  }, []);

  return (
    <Stack spacing="1rem">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" gutterBottom>
          Rough Notes
        </Typography>
        <Button startIcon={<AddRounded />} onClick={handleEditMode}>
          Add note
        </Button>
      </Stack>
      {editMode && (
        <SimpleModal title="Add New Note" handleClose={resetData} maxSize="sm">
          <AddNote setEditMode={setEditMode} setSelectedNoteID={setSelectedNoteID} noteID={selecteNoteID} />
        </SimpleModal>
      )}
      <NotesDetails notes={notes} loading={loading} setEditMode={setEditMode} setSelectedNoteID={setSelectedNoteID} />
    </Stack>
  );
};

export default Notes;
