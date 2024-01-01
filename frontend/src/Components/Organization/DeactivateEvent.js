import React, { useState } from 'react';
import { TextField, Button, makeStyles, FormControl, FormHelperText, CircularProgress, Link } from '@material-ui/core';

import {
  EVENT_FORM,
  EVENT_FORM_ERROR,
  EVENT_FORM_TOUCHED,
  EXISTING_PROJECTS_MSG,
  EXISTING_PROJECTS_NOT_FOUND_MSG,
} from './constants';

import { produce } from 'immer';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { homeActions } from '../../Containers/Home/homeSlice';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1, 0),
  },
  textFieldHelperText: {
    textAlign: 'center',
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: {
    underline: 'none',
  },
}));

const DeactivateEvent = ({ events }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const eventsLength = events.length <= 0;
  const [event, setEvent] = useState(EVENT_FORM);
  const [errors, setErrors] = useState(EVENT_FORM_ERROR);
  const [touched, setTouched] = useState(EVENT_FORM_TOUCHED);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userID = localStorage.getItem('userID');
    dispatch(
      homeActions.updateEvent({
        ...event,
        id: event.eventID,
        deactivated_reason: event.reason,
        deactivated: true,
        updated_by: userID,
      })
    );
    setEvent(EVENT_FORM);
    enqueueSnackbar(`Successfully deactivated event.`, {
      variant: 'success',
    });
  };

  const handleInputChange = (field, value) => {
    setEvent((prev) =>
      produce(prev, (draft) => {
        draft[field] = value;
      })
    );
    setTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
    // Validate the field
    validateField(field, value);
  };

  const validateField = (field, value) => {
    let error = '';
    switch (field) {
      case 'eventID':
        if (!value) {
          error = 'Event must be selected';
        }
        break;
      case 'reason':
        if (!value) {
          error = 'Reason is required';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const isFormValid = () => {
    return Object.values(errors).every((error) => !error) && Object.values(touched).every((touch) => touch);
  };

  const noExistingProjects = () => {
    const prologue = `${EXISTING_PROJECTS_NOT_FOUND_MSG} Would you like to `;

    return (
      <div>
        {prologue}
        <Link href="/" variant="inherit" className={classes.link}>
          create an event?
        </Link>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        {eventsLength ? (
          <div className={classes.spinnerContainer}>
            <CircularProgress />
          </div>
        ) : (
          <React.Fragment>
            <Autocomplete
              id="selected-event"
              options={events}
              onChange={(_, value) => handleInputChange('eventID', value ? value.id : '')}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Event" variant="standard" />}
            />
            <TextField
              fullWidth
              className={classes.textField}
              label="Reason"
              variant="outlined"
              multiline
              minRows={5}
              value={event.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              required
              error={touched.reason && !!errors.reason}
              helperText={touched.reason && errors.reason}
            />
          </React.Fragment>
        )}

        <FormControl fullWidth>
          <FormHelperText className={classes.textFieldHelperText}>
            {!eventsLength ? EXISTING_PROJECTS_MSG : noExistingProjects()}
          </FormHelperText>
        </FormControl>
        {!eventsLength && (
          <Button
            className={classes.submitButton}
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isFormValid()}
          >
            Deactivate Event
          </Button>
        )}
      </form>
    </div>
  );
};

export default DeactivateEvent;
