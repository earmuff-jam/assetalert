import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { BLANK_MAINTENANCE_PLAN } from './constants';
import ColorPicker from '../common/ColorPicker';

const AddPlan = ({ handleCloseAddNewPlan }) => {

  const [planColor, setPlanColor] = useState('#f7f7f7');
  const [planType, setPlanType] = useState('7'); // default annual maintenance plan
  const [formData, setFormData] = useState({
    ...BLANK_MAINTENANCE_PLAN,
  });

  const handleColorChange = (newValue) => {
    setPlanColor(newValue);
  };

  const handleInputChange = (ev) => {
    const { id, value } = ev.target;
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

  const resetData = () => {
    setFormData({ ...BLANK_MAINTENANCE_PLAN });
    setPlanType('7'); // annual
    setPlanColor('#f7f7f7');
    handleCloseAddNewPlan();
  };

  const handlePlanChange = (event) => {
    setPlanType(event.target.value);
  };

  const handleSubmit = () => {
    const containsErr = Object.values(formData).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formData).filter((v) => v.required);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => el.value.trim() === '');

    if (containsErr || isRequiredFieldsEmpty) {
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
    //   type: planType,
    //   color: planColor,
    //   // created_by: user.id,
    //   term_limit: dayjs().add(ITEM_TYPE_MAPPER[planType].add, 'day'),
    //   created_on: dayjs().toISOString(),
    // };

    // addPlan.mutate(draftRequest);
    resetData();
  };

  const containsErr = Object.values(formData).reduce((acc, el) => {
    if (el.errorMsg) {
      return true;
    }
    return acc;
  }, false);

  const requiredFormFields = Object.values(formData).filter((v) => v.required);
  const isRequiredFieldsEmpty = requiredFormFields.some((el) => el.value.trim() === '');

  const isDisabled = containsErr || isRequiredFieldsEmpty;

  return (
    <Stack>
      <Stack paddingBottom="2rem">
        <Typography> Fill in the necessary details</Typography>
        <Typography variant="caption">
          Take steps to periodically check on your inventory items to ensure they are upto date.
        </Typography>
      </Stack>
      <Stack alignItems="center">
        <Box component="form" sx={{ maxWidth: 600, width: '100%' }}>
          <Stack spacing={2} useFlexGap>
            <TextField
              id="plan"
              label="Plan Title"
              value={formData.plan.value}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(formData.plan['errorMsg'].length)}
              helperText={formData.plan['errorMsg']}
            />
            <TextField
              id="description"
              label="Plan description"
              placeholder="Description of plan in less than 500 words"
              value={formData.description.value}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              multiline
              maxRows={4}
              rows={4}
              error={Boolean(formData.description['errorMsg'].length)}
              helperText={formData.description['errorMsg']}
            />
            <ColorPicker value={planColor} handleChange={handleColorChange} />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="simple-select-label">Maintenance plan *</InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  variant="standard"
                  value={planType}
                  label="Plan type"
                  onChange={handlePlanChange}
                >
                  <MenuItem value={1}>Daily</MenuItem>
                  <MenuItem value={2}>Weekly</MenuItem>
                  <MenuItem value={3}>Bi-weekly</MenuItem>
                  <MenuItem value={4}>Monthly</MenuItem>
                  <MenuItem value={5}>Quaterly</MenuItem>
                  <MenuItem value={6}>Semi-annually</MenuItem>
                  <MenuItem value={7}>Annually</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
          <Button onClick={handleSubmit} variant="outlined" sx={{ mt: 1 }} disabled={isDisabled}>
            Add new plan
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AddPlan;
