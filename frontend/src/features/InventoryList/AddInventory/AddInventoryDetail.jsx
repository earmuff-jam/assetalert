import { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  Skeleton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  createFilterOptions,
} from '@mui/material';
import { BookmarkRounded, CheckRounded, RestartAltRounded, SwapHorizRounded } from '@mui/icons-material';
import { ADD_ASSET_FORM } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { inventoryActions } from '../inventorySlice';

const filter = createFilterOptions();
const steps = ['Add inventory', 'Add more details', 'Publish inventory'];

export default function AddInventory() {
  const dispatch = useDispatch();
  const { storageLocations: options, isLoading } = useSelector((state) => state.inventory);

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [storageLocation, setStorageLocation] = useState('');

  const [formData, setFormData] = useState({ ...ADD_ASSET_FORM });

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

    // const formattedData = Object.values(formData).reduce((acc, el) => {
    //   if (el.value) {
    //     acc[el.id] = el.value;
    //   }
    //   return acc;
    // }, {});

    // const draftRequest = {
    //   ...formattedData,
    //   location: storageLocation,
    //   // created_by: user.id,
    //   created_on: dayjs().toISOString(),
    // };
    // createInventoryItem.mutate(draftRequest);
    // handleClose(); // close the modal form
    // setFormData({ ...ADD_ASSET_FORM });
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isDisabled = () => {
    const containsErr = Object.values(formData).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formData).filter((v) => v.isRequired);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => el.value.trim() === '');

    return containsErr || isRequiredFieldsEmpty || storageLocation === null || Object.keys(storageLocation).length <= 0;
  };

  useEffect(() => {
    dispatch(inventoryActions.getStorageLocations());
  }, []);

  if (isLoading) return <Skeleton variant="rounded" animation="wave" height="30vh" width="50vw" />;

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
        {loadInstructionsBasedOnStepNumber(activeStep + 1)}
        {loadAddFormBasedOnStepNumber(
          activeStep + 1,
          formData,
          storageLocation,
          setStorageLocation,
          handleInputChange,
          handleCheckbox,
          handleReset,
          handleSubmit,
          options
        )}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}

          {activeStep !== steps.length - 1 ? (
            <Button disabled={isDisabled()} onClick={handleNext}>
              Next
            </Button>
          ) : null}
        </Box>
      </>
    </Box>
  );
}

export const loadInstructionsBasedOnStepNumber = (stepNumber) => {
  switch (stepNumber) {
    case 1:
      return (
        <Stack paddingBottom="2rem">
          <Typography> Fill in the necessary details.</Typography>
          <Typography variant="caption">
            These details will help us quickly search for the items that you are looking for later on.
          </Typography>
        </Stack>
      );
    case 2:
      return (
        <Stack paddingBottom="2rem">
          <Typography> Fill in the optional details.</Typography>
          <Typography variant="caption">
            Extra details helps you understand your product limitations, expiry dates and much more.
          </Typography>
        </Stack>
      );
    case 3:
      return (
        <Stack paddingBottom="2rem">
          <Typography> Confirm your changes.</Typography>
          <Typography variant="caption">
            Adding new items as assets with product details. You can always edit your product later on.
          </Typography>
        </Stack>
      );
    default:
      return null;
  }
};

export const loadAddFormBasedOnStepNumber = (
  stepNumber,
  formData,
  storageLocation,
  setStorageLocation,
  handleInputChange,
  handleCheckbox,
  handleReset,
  handleSubmit,
  options
) => {
  switch (stepNumber) {
    case 1:
      return (
        <Stack alignItems="center">
          <Box component="form" sx={{ maxWidth: 600, width: '100%' }}>
            <Stack spacing={2} useFlexGap>
              <Stack direction="row" spacing={2} useFlexGap>
                <TextField
                  id="name"
                  label="Item name"
                  value={formData.name.value}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(formData.name['errorMsg'].length)}
                  helperText={formData.name['errorMsg']}
                />
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
                      <BookmarkRounded color={formData.is_bookmarked.value ? 'primary' : 'secondary'} />
                      <Typography variant="caption">Bookmark</Typography>
                    </Stack>
                  }
                />
              </Stack>
              <TextField
                id="description"
                label="Description"
                value={formData.description.value}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={Boolean(formData.description['errorMsg'].length)}
                helperText={formData.description['errorMsg']}
              />
            </Stack>
            <Stack direction="row" sx={{ py: 2 }} useFlexGap spacing={2}>
              <TextField
                id="quantity"
                label="Item quantity"
                value={formData.quantity.value}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={Boolean(formData.quantity['errorMsg'].length)}
                helperText={formData.quantity['errorMsg']}
              />
            </Stack>
            <Autocomplete
              fullWidth
              freeSolo
              forcePopupIcon
              value={storageLocation?.location || ''}
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
              options={options}
              getOptionLabel={(option) => {
                if (typeof option === 'string') {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.location;
              }}
              renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                  <li key={key} {...rest}>
                    {option.location}
                  </li>
                );
              }}
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
          </Box>
        </Stack>
      );
    case 2:
      return (
        <Stack alignItems="center">
          <Box component="form" sx={{ maxWidth: 600, width: '100%' }}>
            <Stack spacing={2} useFlexGap>
              <TextField
                id="price"
                label="Item price"
                value={formData.price.value}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={Boolean(formData.price['errorMsg'].length)}
                helperText={formData.price['errorMsg']}
              />
              <Stack direction="row" useFlexGap spacing={2}>
                <TextField
                  id="barcode"
                  label="Item Barcode"
                  value={formData.barcode.value}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(formData.barcode['errorMsg'].length)}
                  helperText={formData.barcode['errorMsg']}
                />
                <TextField
                  id="sku"
                  label="Item SKU"
                  value={formData.sku.value}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(formData.sku['errorMsg'].length)}
                  helperText={formData.sku['errorMsg']}
                />
              </Stack>

              <Stack direction="row" useFlexGap spacing={2}>
                <TextField
                  id="bought_at"
                  label="Place of purchase"
                  value={formData.bought_at.value}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(formData.bought_at['errorMsg'].length)}
                  helperText={formData.bought_at['errorMsg']}
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
              {formData.is_returnable.value ? (
                <Stack direction="row" useFlexGap spacing={2}>
                  <TextField
                    id="return_location"
                    label="Item return location"
                    value={formData.return_location.value}
                    onChange={handleInputChange}
                    fullWidth
                    variant="outlined"
                    size="small"
                    error={Boolean(formData.return_location['errorMsg'].length)}
                    helperText={formData.return_location['errorMsg']}
                  />
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
            </Stack>

            <Stack direction="row" useFlexGap spacing={2} sx={{ py: 2 }}>
              <TextField
                id="max_weight"
                label="Max weight in kg"
                value={formData.max_weight.value}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={Boolean(formData.max_weight['errorMsg'].length)}
                helperText={formData.max_weight['errorMsg']}
              />
              <TextField
                id="min_weight"
                label="Min weight in kg"
                value={formData.min_weight.value}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={Boolean(formData.min_weight['errorMsg'].length)}
                helperText={formData.min_weight['errorMsg']}
              />
            </Stack>
            <Stack direction="row" useFlexGap spacing={2}>
              <TextField
                id="max_height"
                label="Max height in inches"
                value={formData.max_height.value}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={Boolean(formData.max_height['errorMsg'].length)}
                helperText={formData.max_height['errorMsg']}
              />
              <TextField
                id="min_height"
                label="Min height in inches"
                value={formData.min_height.value}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                error={Boolean(formData.min_height['errorMsg'].length)}
                helperText={formData.min_height['errorMsg']}
              />
            </Stack>
          </Box>
        </Stack>
      );
    case 3:
      return (
        <>
          <Stack alignItems="center">
            <Card sx={{ display: 'flex', width: '100%', maxWidth: '600px' }}>
              <CardContent>
                <Stack direction="row">
                  <IconButton disabled>
                    <BookmarkRounded color={formData.is_bookmarked.value ? 'primary' : 'secondary'} />
                  </IconButton>
                  <Stack>
                    <Typography variant="h6">{formData.name.value}</Typography>
                    <Typography variant="caption">{formData.description.value}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontWeight="bold">Qty: </Typography>
                      <Typography variant="caption">{formData.quantity.value} item</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <CardActions>
                    <Button startIcon={<RestartAltRounded />} onClick={handleReset}>
                      Reset
                    </Button>
                    <Button startIcon={<CheckRounded />} onClick={handleSubmit}>
                      Submit
                    </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Stack>
        </>
      );
    default:
      return null;
  }
};
