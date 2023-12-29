import React, { useEffect, useState } from 'react';
import { Button, TextField, Tooltip, Typography, makeStyles } from '@material-ui/core';

import { produce } from 'immer';
import { enqueueSnackbar } from 'notistack';
import { ADD_ITEM_FORM_FIELDS } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { eventActions } from '../../Containers/Event/eventSlice';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
    padding: theme.spacing(4),
  },
  buttonContainer: {
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
  },
}));

const filter = createFilterOptions();

const AddItemDetail = ({ eventID, userID, setDisplayMode }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, storageLocations } = useSelector((state) => state.event);

  const [value, setValue] = useState({});
  const [options, setOptions] = useState([]);
  const [formFields, setFormFields] = useState(ADD_ITEM_FORM_FIELDS);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormFields(
      produce(formFields, (draft) => {
        draft[name].value = value;
        draft[name].errorMsg = '';

        for (const validator of draft[name].validators) {
          if (validator.validate(value)) {
            draft[name].errorMsg = validator.message;
            break;
          }
        }
      })
    );
  };

  const submit = () => {
    const formattedData = Object.values(formFields).reduce((acc, el) => {
      if (el.value) {
        if (el.name === 'quantity') {
          acc[el.name] = parseInt(el.value);
        } else {
          acc[el.name] = el.value;
        }
      }
      return acc;
    }, {});
    const storageLocationID = storageLocations.find((v) => v.location === value.location)?.id || value.location;
    const postFillLocation = {
      ...formattedData,
      location: storageLocationID,
      created_by: userID,
      eventID: eventID,
    };
    dispatch(eventActions.addItem(postFillLocation));
    setDisplayMode(0);
    setFormFields(ADD_ITEM_FORM_FIELDS);
    enqueueSnackbar('Successfully added new item.', {
      variant: 'success',
    });
  };

  useEffect(() => {
    if (!loading && Array.isArray(storageLocations)) {
      setOptions(storageLocations.map((v) => v.location));
    }
  }, [storageLocations, loading]);

  return (
    <div className={classes.container}>
      <Typography variant="caption" color="textSecondary" gutterBottom>
        Adding a item in an event allows for the ability to share information across the members of the group. Such
        shared items are stored with due process until the group is abandoned or until the creator removes the ability
        to share the items with other members.
      </Typography>
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
          error={v.errorMsg}
          helperText={v.errorMsg}
        />
      ))}
      <Autocomplete
        value={value}
        forcePopupIcon
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              location: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            setValue({
              location: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              location: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="autocomplete-location-details"
        options={options}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.location || '')}
        renderOption={(option) => option.location || option}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label="Location"
            variant="standard"
            placeholder="Where you plan to store the item"
          />
        )}
      />
      <Tooltip
        title={
          'Adding items to any event will allow all members to view the item. Any person who is not within that event group must join that group to view the item.'
        }
      >
        <Button className={classes.buttonContainer} onClick={submit}>
          Submit
        </Button>
      </Tooltip>
    </div>
  );
};

export default AddItemDetail;
