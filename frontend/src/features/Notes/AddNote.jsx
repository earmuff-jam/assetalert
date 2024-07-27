import PropTypes from 'prop-types';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { ADD_NOTES_FORM_FIELDS } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { AddRounded, CheckCircleRounded } from '@mui/icons-material';
import { profileActions } from '../Profile/profileSlice';

const AddNote = ({ setEditMode, setSelectedNoteID, noteID }) => {
  const dispatch = useDispatch();

  const { loading, notes } = useSelector((state) => state.profile);
  const [formFields, setFormFields] = useState(ADD_NOTES_FORM_FIELDS);

  const handleInput = (event) => {
    const { name, value } = event.target;
    const updatedFormFields = Object.assign({}, formFields, {
      [name]: {
        ...formFields[name],
        value: value,
        errorMsg: '',
      },
    });

    for (const validator of updatedFormFields[name].validators) {
      if (validator.validate(value)) {
        updatedFormFields[name].errorMsg = validator.message;
        break;
      }
    }
    setFormFields(updatedFormFields);
  };

  const submit = () => {
    const containsErr = Object.values(formFields).some((el) => el.errorMsg);
    const userID = localStorage.getItem('userID');
    const requiredFormFields = Object.values(formFields).filter((v) => v.required);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => el.value.trim() === '');

    if (containsErr || isRequiredFieldsEmpty) {
      enqueueSnackbar('Cannot add new item.', {
        variant: 'error',
      });
      return;
    }

    const formattedNotes = Object.values(formFields).reduce((acc, el) => {
      if (el.value) {
        acc['noteID'] = noteID;
        acc[el.name] = el.value;
      }
      return acc;
    }, {});

    const formattedDraftNotes = {
      ...formattedNotes,
      updated_by: userID,
    };

    if (noteID) {
      // existing noteID support edit mode only
      dispatch(profileActions.updateExistingNote(formattedDraftNotes));
    } else {
      dispatch(profileActions.addNewNote(formattedDraftNotes));
    }

    setEditMode(false);
    setSelectedNoteID(null);
    setFormFields(ADD_NOTES_FORM_FIELDS);
    enqueueSnackbar(noteID ? 'Successfully updated existing item.' : 'Successfully added new item.', {
      variant: 'success',
    });
  };

  useEffect(() => {
    if (!loading && noteID !== null) {
      const selectedNote = notes.filter((v) => v.noteID === noteID);
      const draftNote = selectedNote[0];
      const updatedFormFields = Object.assign({}, formFields, {
        title: {
          ...formFields.title,
          value: draftNote?.title || '',
        },
        description: {
          ...formFields.description,
          value: draftNote?.description || '',
        },
      });
      setFormFields(updatedFormFields);
    } else {
      setFormFields(ADD_NOTES_FORM_FIELDS);
    }
    // eslint-disable-next-line
  }, [noteID]);

  return (
    <Stack spacing="1rem">
      {Object.values(formFields).map((v, index) => (
        <TextField
          key={index}
          id={v.name}
          name={v.name}
          label={v.label}
          value={v.value}
          placeholder={v.placeholder}
          onChange={handleInput}
          required={v.required}
          fullWidth={v.fullWidth}
          error={!!v.errorMsg}
          helperText={v.errorMsg}
          variant={v.variant}
          minRows={v.rows || 4}
          multiline={v.multiline || false}
        />
      ))}
      <Button
        onClick={submit}
        startIcon={noteID ? <CheckCircleRounded /> : <AddRounded />}
        sx={{ alignSelf: 'flex-start' }}
      >
        {noteID ? 'Edit Note' : 'Add Note'}
      </Button>
    </Stack>
  );
};

AddNote.defaultProps = {
  setEditMode: () => {},
  noteID: '',
  setSelectedNoteID: () => {},
};

AddNote.propTypes = {
  setEditMode: PropTypes.func,
  setSelectedNoteID: PropTypes.func,
  noteID: PropTypes.string,
};

export default AddNote;
