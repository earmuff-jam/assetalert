import AddNote from './AddNote';
import NotesDetails from './NotesDetails';
import { useEffect, useState } from 'react';
import Title from '../DialogComponent/Title';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Dialog } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import TextComponent from '../TextFieldComponent/TextComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { AddRounded, ImportExportRounded } from '@mui/icons-material';
import { profileActions } from '../../Containers/Profile/profileSlice';

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  emptyGap: {
    flexGrow: 1,
  },
  headingText: {
    fontSize: '1.6rem',
    letterSpacing: '0.0125rem',
    color: theme.palette.text.secondary,
  },
}));

const Notes = () => {
  const classes = useStyles();
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
    <Box>
      <Box className={classes.rowContainer}>
        <TextComponent value={'Rough Notes'} gutterBottom={true} loading={false} textStyle={classes.headingText} />
        <Box className={classes.emptyGap}></Box>
        <ButtonComponent
          buttonVariant={'text'}
          disabled={true}
          icon={<ImportExportRounded />}
          showIcon={true}
          text={'Sort'}
          onClick={() => {}}
        />
        <ButtonComponent
          buttonVariant={'text'}
          icon={<AddRounded />}
          showIcon={true}
          text={'Add new notes'}
          onClick={handleEditMode}
        />
        {editMode && (
          <Dialog open={editMode} width={'md'} fullWidth={true}>
            <Title onClose={resetData}>Add New Note</Title>
            <AddNote setEditMode={setEditMode} setSelectedNoteID={setSelectedNoteID} noteID={selecteNoteID} />
          </Dialog>
        )}
      </Box>
      <Box>
        <NotesDetails notes={notes} loading={loading} setEditMode={setEditMode} setSelectedNoteID={setSelectedNoteID} />
      </Box>
    </Box>
  );
};

export default Notes;
