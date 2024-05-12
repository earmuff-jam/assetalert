import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { produce } from 'immer';
import { enqueueSnackbar } from 'notistack';
import { ADD_ITEM_PROFILE_FORM } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { profileActions } from '../../Containers/Profile/profileSlice';
import StatusRadioButtons from './StatusRadioButtons';
import { ExpandMoreRounded } from '@material-ui/icons';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(4),
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  extraGap: {
    gap: theme.spacing(2),
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  caption: {
    fontSize: '0.985rem',
  },
}));

const filter = createFilterOptions();

const AddInventoryDetail = ({ setDisplayMode }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userID = localStorage.getItem('userID');
  const { loading, storageLocations } = useSelector((state) => state.event);

  const [options, setOptions] = useState([]);
  const [storageLocation, setStorageLocation] = useState({});
  const [statusSelection, setStatusSelection] = useState('all');
  const [formFields, setFormFields] = useState(ADD_ITEM_PROFILE_FORM);
  const [isReturnableSelection, setIsReturnableSelection] = useState(false);

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

  // handleChange fn is used to toggle the radio selected buttons
  const handleChange = (event) => {
    const { name, value } = event.target;

    setStatusSelection(value);
    setFormFields(
      produce(formFields, (draft) => {
        draft[name].value = value;
      })
    );
  };

  // handleChange fn is used to toggle the is returnable checkbox
  const handleCheckbox = (field, value) => {
    setIsReturnableSelection(value);
    setFormFields(
      produce(formFields, (draft) => {
        draft[field].value = value;
      })
    );
  };

  const submit = () => {
    const containsErr = Object.values(formFields).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formFields).filter((v) => v.required);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => el.value.trim() === '');

    // ensure that the storage location is not empty. no check for status since it is defaulted to ALL
    if (containsErr || isRequiredFieldsEmpty || storageLocation === null || Object.keys(storageLocation).length <= 0) {
      enqueueSnackbar('Cannot add new item.', {
        variant: 'error',
      });
      return;
    }

    const formattedData = Object.values(formFields).reduce((acc, el) => {
      if (el.value) {
        if (el.name === 'quantity') {
          acc[el.name] = parseInt(el.value);
        } else if (el.name === 'price') {
          acc[el.name] = parseFloat(el.value);
        } else {
          acc[el.name] = el.value;
        }
      }
      return acc;
    }, {});
    const storageLocationID =
      storageLocations.find((v) => v.location === storageLocation.storageLocation)?.id ||
      storageLocation.storageLocation;

    const draftRequest = {
      ...formattedData,
      location: storageLocationID,
      status: statusSelection.toUpperCase(), // sanitize request
      created_by: userID,
    };
    dispatch(profileActions.addInventory(draftRequest));
    setDisplayMode(0);
    setFormFields(ADD_ITEM_PROFILE_FORM);
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
      <Typography variant="caption" color="textSecondary">
        Add item that are required for this event. These items can be shared with other members of the group. Such
        shared items are stored with due process until the group is abandoned or until the creator removes the ability
        to share the items with other members.
      </Typography>
      {Object.values(formFields)
        .filter((v, index) => [0, 1].includes(index))
        .map((v, index) => (
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
      <StatusRadioButtons statusSelection={statusSelection} handleChange={handleChange} />
      <Box className={classes.rowContainer}>
        <Tooltip title={'Items marked with blue dot are considered returnable items'} placement="top-start">
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isReturnableSelection}
                  onChange={(e) => handleCheckbox('is_returnable', e.target.checked)}
                  color="primary"
                />
              }
              label="Returnable item ?"
              name="is_returnable"
              classes={{ label: classes.caption }}
            />
          </FormControl>
        </Tooltip>
        {isReturnableSelection &&
          Object.values(formFields)
            .filter((v, index) => index === 7)
            .map((v, index) => (
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
      </Box>
      <Box>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1a-content" id="panel1a-header">
            More Details
          </AccordionSummary>
          <AccordionDetails>
            <Box className={classNames(classes.columnContainer, classes.extraGap)}>
              <Box className={classes.rowContainer}>
                {Object.values(formFields)
                  .filter((v, index) => index === 8 || index === 9)
                  .map((v, index) => (
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
                      className={classes.extraGap}
                    />
                  ))}
              </Box>
              <Box className={classes.rowContainer}>
                {Object.values(formFields)
                  .filter((v, index) => index === 10 || index === 11)
                  .map((v, index) => (
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
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box className={classes.rowContainer}>
        {Object.values(formFields)
          .filter((v, index) => index === 2 || index === 3)
          .map((v, index) => (
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
      </Box>
      {Object.values(formFields)
        .filter((v, index) => index === 4)
        .map((v, index) => (
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
      <Box className={classes.rowContainer}>
        {Object.values(formFields)
          .filter((v, index) => index > 11)
          .map((v, index) => (
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
      </Box>
      <Autocomplete
        value={storageLocation.inputValue}
        forcePopupIcon
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setStorageLocation({
              storageLocation: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            setStorageLocation({
              storageLocation: newValue.inputValue,
            });
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
        <Box>
          <ButtonComponent text={'Submit'} onClick={submit} buttonVariant={'text'} />
        </Box>
      </Tooltip>
    </div>
  );
};

AddInventoryDetail.defaultProps = {
  eventID: '',
  setDisplayMode: () => {},
};

AddInventoryDetail.propTypes = {
  eventID: PropTypes.string,
  setDisplayMode: PropTypes.func,
};

export default AddInventoryDetail;
