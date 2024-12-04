import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { ADD_NOTES_FORM_FIELDS } from '../constants';
import { useDispatch } from 'react-redux';
import { AddRounded, CheckCircleRounded } from '@mui/icons-material';
import { notesActions } from '../notesSlice';
import ColorPicker from '../../../common/ColorPicker';
import dayjs from 'dayjs';
import AddNoteHeader from './AddNoteHeader';
import AddNoteStatusOptions from './AddNoteStatusOptions';
import CustomDatePicker from '../../../common/DatePicker/CustomDatePicker';
import AddNoteLocationPicker from './AddNoteLocationPicker';
import { STATUS_OPTIONS } from '@common/StatusOptions/constants';

const AddNote = ({ setEditMode, setSelectedNoteID, noteID, notes }) => {
  const dispatch = useDispatch();

  const [planColor, setPlanColor] = useState('#f7f7f7');
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const [completionDate, setCompletionDate] = useState(dayjs());
  const [formFields, setFormFields] = useState(ADD_NOTES_FORM_FIELDS);
  const [status, setStatus] = useState(STATUS_OPTIONS[0].label);

  const handleColorChange = (newValue) => {
    setPlanColor(newValue);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

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
      color: planColor,
      status: status,
      location: location,
      completionDate: completionDate.toISOString(),
      updated_by: userID,
    };

    if (noteID) {
      dispatch(notesActions.updateNote(formattedDraftNotes));
    } else {
      dispatch(notesActions.createNote(formattedDraftNotes));
    }

    setEditMode(false);
    setSelectedNoteID(null);
    setPlanColor('#f7f7f7');
    setStatus(STATUS_OPTIONS[0].label);
    setFormFields(ADD_NOTES_FORM_FIELDS);
    enqueueSnackbar(noteID ? 'Successfully updated existing item.' : 'Successfully added new item.', {
      variant: 'success',
    });
  };

  useEffect(() => {
    if (noteID !== null) {
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

      if (draftNote?.completionDate) {
        setCompletionDate(dayjs(draftNote.completionDate));
      }

      setPlanColor(draftNote.color);
      setStatus(draftNote.status_name);
      setLocation(draftNote.location);
      setFormFields(updatedFormFields);
    } else {
      setFormFields(ADD_NOTES_FORM_FIELDS);
      setStatus(STATUS_OPTIONS[0].label);
      setPlanColor('#f7f7f7');
    }
  }, [noteID]);

  return (
    <Stack spacing={1}>
      <AddNoteHeader formFields={formFields} handleInput={handleInput} setLocation={setLocation} />
      <AddNoteStatusOptions label="Selected status" name="status" value={status} handleStatus={handleStatus} />
      <ColorPicker label="Assign Color" value={planColor} handleChange={handleColorChange} />
      <CustomDatePicker
        label="Assign estimated completion date"
        completionDate={completionDate}
        setCompletionDate={setCompletionDate}
      />
      <AddNoteLocationPicker
        subtitle="Select location"
        location={location}
        setLocation={setLocation}
        editMode={true}
        displayLocationPicker={location?.lat}
      />
      <Button onClick={submit} variant="outlined" startIcon={noteID ? <CheckCircleRounded /> : <AddRounded />}>
        {noteID ? 'Save' : 'Add'}
      </Button>
    </Stack>
  );
};

export default AddNote;
