import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField, IconButton, CircularProgress } from '@material-ui/core';

import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { DoneRounded } from '@material-ui/icons';

import EmptyComponent from '../../util/EmptyComponent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { eventActions } from '../../Containers/Event/eventSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  headerText: {
    fontSize: '2.0rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
  },
  text: {
    fontSize: '0.925rem',
  },
  aside: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

const ImpactTracking = ({ eventID, userID, requiredSkills, isChecked, disabled }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [activities, setActivities] = useState([]);
  const [volunteerHours, setVolunteerHours] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  const isErrorVolunteerHours = volunteerHours.length && (volunteerHours < 0 || isNaN(volunteerHours));

  const resetForm = () => {
    setVolunteerHours('');
    setSelectedActivity('');
  };

  const handleSubmit = () => {
    const requiredFields = [selectedActivity, volunteerHours];
    if (requiredFields?.some((v) => v.length === 0)) {
      enqueueSnackbar('Cannot update empty fields.', {
        variant: 'error',
      });
      return;
    }

    const submittedData = {
      volunteer_hours: Math.ceil(volunteerHours).toString(),
      volunteeringActivity: selectedActivity,
      skill_name: selectedActivity,
      eventID: eventID,
      userID: userID,
    };
    dispatch(eventActions.addVolunteeringHours(submittedData));
    enqueueSnackbar('Successfully added volunteering hours.', {
      variant: 'success',
    });
    resetForm();
  };

  useEffect(() => {
    if (Array.isArray(requiredSkills) && requiredSkills.length >= 0) {
      setActivities(requiredSkills);
    }
  }, [requiredSkills]);

  if (requiredSkills?.length <= 0) {
    return (
      <div className={classes.spinnerContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (!isChecked) {
    return (
      <>
        <EmptyComponent subtitle="Rsvp to log volunteering hours." />
      </>
    );
  }

  return (
    <Box className={classes.root}>
      <Typography className={classes.text} gutterBottom>
        Log volunteer hours and track activities
      </Typography>
      <div className={classes.aside}>
        <Autocomplete
          id="volunteering-activities-selector"
          options={activities}
          value={selectedActivity || ''}
          disabled={disabled}
          onChange={(_, value) => setSelectedActivity(value)}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label="Volunteering on" variant="outlined" />}
        />
        <TextField
          className={classes.text}
          id="volunteerHours"
          disabled={disabled}
          variant="standard"
          fullWidth
          label="Volunteer hours"
          value={volunteerHours}
          onChange={(e) => setVolunteerHours(e.target.value)}
          error={isErrorVolunteerHours.length ?? false}
          helperText={isErrorVolunteerHours ? 'Volunteer Hours are required ' : null}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSubmit} disabled={disabled}>
                <DoneRounded />
              </IconButton>
            ),
          }}
        />
      </div>
    </Box>
  );
};

export default ImpactTracking;
