import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  createFilterOptions,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookmarkAddedRounded, CheckRounded, SwapHorizRounded } from '@mui/icons-material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BLANK_INVENTORY_FORM } from './constants';
import HeaderWithButton from '../common/HeaderWithButton';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from '../Profile/profileSlice';
import { eventActions } from '../../Containers/Event/eventSlice';

const filter = createFilterOptions();
dayjs.extend(relativeTime);

const EditInventory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { inventory, loading } = useSelector((state) => state.profile);
  const { loading: storageLocationsLoading, storageLocations: options } = useSelector((state) => state.event);

  const [storageLocation, setStorageLocation] = useState({});
  const [formData, setFormData] = useState({ ...BLANK_INVENTORY_FORM });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    const updatedFormData = { ...formData };
    let errorMsg = '';

    for (const validator of updatedFormData[id].validators) {
      if (validator.validate(value)) {
        errorMsg = validator.message;
        break;
      }
    }

    updatedFormData[id] = {
      ...updatedFormData[id],
      value,
      errorMsg,
    };
    setFormData(updatedFormData);
  };

  const handleCheckbox = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name], value },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const containsErr = Object.values(formData).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formData).filter((v) => v.required);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => el.value.trim() === '');

    if (containsErr || isRequiredFieldsEmpty || storageLocation === null || Object.keys(storageLocation).length <= 0) {
      return;
    }

    //   const formattedData = Object.values(formData).reduce((acc, el) => {
    //     if (el.value) {
    //       acc[el.id] = el.value;
    //     }
    //     return acc;
    //   }, {});

    //   const draftRequest = {
    //     id: id, // bring id from the params
    //     ...formattedData,
    //     location: storageLocation.location,
    //     updated_by: user.id,
    //     updated_on: dayjs().toISOString(),
    //   };

    //   updateInventory.mutate(draftRequest);
    setFormData({ ...BLANK_INVENTORY_FORM });
  };

  useEffect(() => {
    if (id.length > 0) {
      dispatch(profileActions.getInvByID(id));
      dispatch(eventActions.getStorageLocations());
    }
  }, [id]);

  useEffect(() => {
    if (!loading || !storageLocationsLoading) {
      const draftInventoryForm = { ...BLANK_INVENTORY_FORM };
      draftInventoryForm.name.value = inventory.name || '';
      draftInventoryForm.description.value = inventory.description || '';
      draftInventoryForm.barcode.value = inventory.barcode || '';
      draftInventoryForm.sku.value = inventory.sku || '';
      draftInventoryForm.bought_at.value = inventory.bought_at || '';
      draftInventoryForm.return_location.value = inventory.return_location || '';
      draftInventoryForm.max_weight.value = inventory.max_weight || '';
      draftInventoryForm.min_weight.value = inventory.min_weight || '';
      draftInventoryForm.max_height.value = inventory.max_height || '';
      draftInventoryForm.min_height.value = inventory.min_height || '';
      draftInventoryForm.price.value = inventory.price || '';
      draftInventoryForm.quantity.value = inventory.quantity || '';
      draftInventoryForm.is_bookmarked.value = inventory.is_bookmarked || false;
      draftInventoryForm.is_returnable.value = inventory.is_returnable || Boolean(inventory.return_location) || false;
      draftInventoryForm.return_datetime.value = inventory.return_datetime || '';
      draftInventoryForm.created_by.value = inventory.created_by || '';
      draftInventoryForm.created_at.value = inventory.created_at || '';
      draftInventoryForm.updated_by.value = inventory.updated_by || '';
      draftInventoryForm.updated_at.value = inventory.updated_at || '';
      draftInventoryForm.sharable_groups.value = inventory.sharable_groups || [];

      draftInventoryForm.creator_name = inventory.creator_name;
      draftInventoryForm.updator_name = inventory.updator_name;

      setStorageLocation({ location: inventory.location });
      setFormData(draftInventoryForm);
    }
  }, [loading, storageLocationsLoading]);

  return (
    <Container sx={{ marginTop: '1rem' }}>
      <HeaderWithButton title="Editing inventory" />
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          {Object.values(formData)
            .filter((v, index) => index < 2)
            .map((v) => (
              <TextField
                key={v.id}
                id={v.id}
                label={v.label}
                value={v.value}
                required={v.isRequired}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            ))}
        </Stack>

        <Stack direction="row" spacing={2}>
          {Object.values(formData)
            .filter((v, index) => index >= 2 && index < 5)
            .map((v) => (
              <TextField
                key={v.id}
                id={v.id}
                label={v.label}
                value={v.value}
                required={v.isRequired}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            ))}
        </Stack>

        <Stack direction="row" spacing={2}>
          {/* Ignore autocomplete for its own row */}
          {Object.values(formData)
            .filter((v, index) => index >= 5 && index < 7)
            .map((v) => (
              <TextField
                key={v.id}
                id={v.id}
                label={v.label}
                value={v.value}
                required={v.isRequired}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            ))}
        </Stack>

        <Autocomplete
          fullWidth
          freeSolo
          forcePopupIcon
          value={storageLocation || ''}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setStorageLocation({
                location: newValue,
              });
            } else if (newValue && newValue.inputValue) {
              setStorageLocation({
                location: newValue.inputValue,
              });
            } else {
              setStorageLocation(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.location);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                location: `Add "${inputValue}"`,
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="autocomplete-storage-location"
          options={options || []}
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.location || '';
          }}
          renderOption={(props, option) => (
            <li {...props} key={option.location}>
              {option.location}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Storage Location"
              variant="standard"
              placeholder="Where do you plan to store this item"
            />
          )}
        />

        <Divider>
          <Typography variant="caption">More information</Typography>
        </Divider>

        <Stack direction="row" spacing={2} justifyContent="space-around">
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_bookmarked.value}
                onChange={(e) => handleCheckbox('is_bookmarked', e.target.checked)}
                color="primary"
              />
            }
            label={
              <Stack direction="row" alignItems="center">
                <BookmarkAddedRounded color={formData.is_bookmarked.value ? 'primary' : 'secondary'} />
                <Typography variant="caption">Bookmarked</Typography>
              </Stack>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_returnable.value}
                onChange={(e) => handleCheckbox('is_returnable', e.target.checked)}
                color="primary"
              />
            }
            label={
              <Stack direction="row" alignItems="center">
                <SwapHorizRounded color={formData.is_returnable.value ? 'primary' : 'secondary'} />
                <Typography variant="caption">Returnable</Typography>
              </Stack>
            }
          />
        </Stack>
        {/* display return location and return date time if the item is returnable */}
        {formData.is_returnable.value ? (
          <Stack direction="row" spacing={2}>
            {Object.values(formData)
              .filter((v, index) => index >= 10 && index < 11)
              .map((v) => (
                <TextField
                  key={v.id}
                  id={v.id}
                  label={v.label}
                  value={v.value}
                  required={v.isRequired}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              ))}
            <TextField
              fullWidth
              id="return_datetime"
              label="Return date and time"
              variant="standard"
              type="datetime-local"
              value={formData.return_datetime.value}
              onChange={handleInputChange}
              error={Boolean(formData.return_datetime['errorMsg'].length)}
              helperText={formData.return_datetime['errorMsg']}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        ) : null}

        <Divider>
          <Typography variant="caption">Weight and Dimension</Typography>
        </Divider>

        <Stack direction="row" spacing={2}>
          {Object.values(formData)
            .filter((v, index) => index >= 12 && index < 14)
            .map((v) => (
              <TextField
                key={v.id}
                id={v.id}
                label={v.label}
                value={v.value}
                required={v.isRequired}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            ))}
        </Stack>

        <Stack direction="row" spacing={2}>
          {Object.values(formData)
            .filter((v, index) => index >= 14 && index < 16)
            .map((v) => (
              <TextField
                key={v.id}
                id={v.id}
                label={v.label}
                value={v.value}
                required={v.isRequired}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            ))}
        </Stack>

        <Divider>
          <Typography variant="caption">User information</Typography>
        </Divider>

        <Stack direction="row" spacing={2}>
          {Object.values(formData)
            .filter((v, index) => index >= 16 && index < 18)
            .map((v) => (
              <TextField
                key={v.id}
                id={v.id}
                label={v.id === 'created_on' && 'Created'}
                value={
                  'created_on' === v.id
                    ? dayjs(v.value).fromNow()
                    : `Created by ${formData?.creator_name?.username || 'Anonymous'}`
                }
                disabled
                fullWidth
                size="small"
                variant="standard"
                onChange={handleInputChange}
              />
            ))}
        </Stack>

        <Stack direction="row" spacing={2}>
          {Object.values(formData)
            .filter((v, index) => index >= 18 && index < 20)
            .map((v) => (
              <TextField
                key={v.id}
                id={v.id}
                label={v.id === 'updated_on' && 'Last updated around'}
                value={
                  v.id === 'updated_on'
                    ? dayjs(v.value).fromNow()
                    : `Last updated by ${formData?.updator_name?.username || 'Anonymous'}`
                }
                disabled
                fullWidth
                size="small"
                variant="standard"
                onChange={handleInputChange}
              />
            ))}
        </Stack>
      </Stack>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button startIcon={<CheckRounded />} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default EditInventory;
