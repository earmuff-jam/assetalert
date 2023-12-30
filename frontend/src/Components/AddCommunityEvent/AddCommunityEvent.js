import React, { useEffect, useState } from 'react';
import { TextField, Button, makeStyles, Box, Tooltip } from '@material-ui/core';

import moment from 'moment';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';

import { enqueueSnackbar } from 'notistack';
import { InfoRounded } from '@material-ui/icons';
import { SKILLS_REQUIRED_OPTIONS } from '../Organization/constants';
import { useDispatch, useSelector } from 'react-redux';
import { homeActions } from '../../Containers/Home/homeSlice';
import { BLANK_NEW_EVENT, BLANK_NEW_EVENT_ERROR, BLANK_NEW_EVENT_TOUCHED } from './constants';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  bottomGap: {
    marginBottom: theme.spacing(1),
  },
}));

const AddCommunityEvent = ({ setEditMode }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userID = localStorage.getItem('userID');
  const { loading, causeList, projectTypes, allStatesUS } = useSelector((state) => state.home);

  const [project, setProject] = useState(BLANK_NEW_EVENT);
  const [errors, setErrors] = useState(BLANK_NEW_EVENT_ERROR);
  const [touched, setTouched] = useState(BLANK_NEW_EVENT_TOUCHED);

  const [causeOptions, setCauseOptions] = useState([]);
  const [allStatesList, setAllStatesList] = useState([]);
  const [projectTypeOptions, setProjectTypeOptions] = useState([]);

  const handleInputChange = (field, value) => {
    setProject((prevProject) => ({
      ...prevProject,
      [field]: value,
    }));
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
      case 'title':
        if (!value) {
          error = 'Title is required.';
        }
        break;
      case 'cause':
        if (!value) {
          error = 'Cause is required.';
        }
        break;
      case 'max_attendees':
        if (isNaN(value) || parseInt(value) <= 0) {
          error = 'Max Attendees must be a positive number.';
        }
        break;

      case 'street':
        if (!value) {
          error = 'Street Address is required.';
        }
        break;

      case 'city':
        if (!value) {
          error = 'City is required.';
        }
        break;

      case 'state':
        if (!value || value.length !== 2) {
          error = 'State is required in the form of XX';
        }
        break;

      case 'zip':
        // You can add more specific validation for zip code here
        if (isNaN(value) || parseInt(value) <= 0) {
          error = 'Zip code is required and must be +ve in nature';
        }
        break;

      case 'project_type':
        if (!value) {
          error = 'Type of project is required.';
        }
        break;

      case 'comments':
        break;

      case 'required_total_man_hours':
        if (isNaN(value) || parseFloat(value) <= 0) {
          error = 'Hours of Effort must be a positive number.';
        }
        if (!value) {
          error = 'Hours of Effort is required';
        }
        break;

      case 'skills_required':
        if (!Array.isArray(value) || value.length <= 0) {
          error = 'Skills are required';
        }
        break;

      case 'start_date':
        if (!value) {
          error = 'Start date is required.';
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

  const handleNavigation = (path) => navigate(path);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDate = moment().toISOString();
    const draftEvent = {
      ...project,
      max_attendees: parseInt(project.max_attendees),
      required_total_man_hours: parseInt(project.required_total_man_hours),
      start_date: moment(project.start_date, 'YYYY-MM-DDTHH:mm').format(),
      created_at: currentDate,
      updated_at: currentDate,
      created_by: userID,
      updated_by: userID,
      attendees: [userID],
      sharable_groups: [userID],
    };

    dispatch(homeActions.createEvent({ draftEvent }));
    setEditMode(false);
    setProject(BLANK_NEW_EVENT);
    enqueueSnackbar('Successfully added new community event.', {
      variant: 'success',
    });
  };

  useEffect(() => {
    if (!loading && causeList) {
      setCauseOptions(causeList);
    }
    if (!loading && projectTypes) {
      setProjectTypeOptions(projectTypes);
    }
    if (!loading && allStatesUS) {
      setAllStatesList(allStatesUS);
    }
  }, [causeList, loading, projectTypes, allStatesUS]);

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          className={classes.textField}
          label="Title"
          variant="standard"
          value={project.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          required
          error={touched.title && !!errors.title}
          helperText={touched.title && errors.title}
        />
        <Box className={classnames(classes.rowContainer, classes.bottomGap)}>
          <Autocomplete
            id="cause-autocomplete"
            fullWidth
            options={causeOptions}
            onChange={(e, value) => {
              const projectCause = value?.cause || '';
              return handleInputChange('cause', projectCause);
            }}
            getOptionLabel={(option) => option.cause}
            renderInput={(params) => <TextField {...params} label="Cause" variant="standard" />}
          />
          <Autocomplete
            id="project-type-autocomplete"
            fullWidth
            options={projectTypeOptions}
            onChange={(e, value) => {
              const typeOfProject = value?.type || '';
              return handleInputChange('project_type', typeOfProject);
            }}
            getOptionLabel={(option) => option.type}
            renderInput={(params) => <TextField {...params} label="Project Type" variant="standard" />}
            error={touched.project_type && !!errors.project_type ? true : undefined}
          />
        </Box>
        <TextField
          fullWidth
          className={classes.textField}
          label="Street Address"
          variant="standard"
          value={project.street}
          onChange={(e) => handleInputChange('street', e.target.value)}
          required
          error={touched.street && !!errors.street}
          helperText={touched.street && errors.street}
        />
        <Box className={classnames(classes.rowContainer, classes.bottomGap)}>
          <TextField
            className={classes.textField}
            label="City"
            fullWidth
            variant="standard"
            value={project.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            required
            error={touched.city && !!errors.city}
            helperText={touched.city && errors.city}
          />
          <Autocomplete
            id="project-type-autocomplete"
            fullWidth
            options={allStatesList}
            onChange={(e, value) => {
              const state = value?.abbreviation || '';
              return handleInputChange('state', state);
            }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="US State" variant="standard" />}
            error={touched.project_type && !!errors.project_type}
            helperText={touched.project_type && errors.project_type}
          />
        </Box>
        <Box className={classnames(classes.rowContainer, classes.marginBottom)}>
          <TextField
            required
            fullWidth
            label="Zip code"
            variant="standard"
            value={project.zip}
            className={classes.textField}
            error={touched.zip && !!errors.zip}
            helperText={touched.zip && errors.zip}
            onChange={(e) => handleInputChange('zip', e.target.value)}
          />
          <TextField
            required
            fullWidth
            variant="standard"
            label="Max Attendees"
            value={project.max_attendees}
            className={classes.textField}
            error={touched.max_attendees && !!errors.max_attendees}
            helperText={touched.max_attendees && errors.max_attendees}
            onChange={(e) => handleInputChange('max_attendees', e.target.value)}
          />
        </Box>
        <TextField
          fullWidth
          required
          className={classes.textField}
          label="Description"
          variant="outlined"
          multiline
          minRows={3}
          value={project.comments}
          onChange={(e) => handleInputChange('comments', e.target.value)}
        />
        <Box className={classnames(classes.rowContainer, classes.bottomGap)}>
          <Autocomplete
            id="selected-event"
            multiple
            fullWidth
            forcePopup
            options={SKILLS_REQUIRED_OPTIONS}
            onChange={(e, value) => {
              // value here is an array of items
              return handleInputChange('skills_required', value);
            }}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label="Volunteering" variant="standard" />}
            error={touched.skills_required && !!errors.skills_required}
            helperText={touched.skills_required && errors.skills_required}
          />
        </Box>
        <Box className={classes.rowContainer}>
          <TextField
            fullWidth
            required
            label="Start DateTime"
            variant="standard"
            type="datetime-local"
            value={project.start_date}
            className={classes.textField}
            onChange={(e) => handleInputChange('start_date', e.target.value)}
            error={touched.start_date && !!errors.start_date}
            helperText={touched.start_date && errors.start_date}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            required
            className={classes.textField}
            label="Effort hours"
            placeholder="The total estimated effort required"
            variant="standard"
            value={project.required_total_man_hours}
            onChange={(e) => handleInputChange('required_total_man_hours', e.target.value)}
            error={touched.required_total_man_hours && !!errors.required_total_man_hours}
            helperText={touched.required_total_man_hours && errors.required_total_man_hours}
            InputProps={{
              endAdornment: (
                <Tooltip title="total labor hours required for the project">
                  <InfoRounded />
                </Tooltip>
              ),
            }}
          />
        </Box>
        <Box>
          <Button
            className={classes.addButton}
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isFormValid()}
            onClick={() => handleNavigation('/')}
          >
            Add Event
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddCommunityEvent;
