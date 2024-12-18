import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { produce } from 'immer';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

import { Button, Stack } from '@mui/material';

import ColorPicker from '@common/ColorPicker';
import LocationPicker from '@common/Location/LocationPicker';
import StatusOptions from '@common/StatusOptions/StatusOptions';

import { STATUS_OPTIONS } from '@common/StatusOptions/constants';
import AddFormHeader from '@features/FormComponents/AddFormHeader';
import AddTypeOptions from '@features/FormComponents/AddTypeOptions';
import { maintenancePlanActions } from '@features/MaintenancePlan/maintenanceSlice';
import { BLANK_MAINTENANCE_PLAN, ITEM_TYPE_MAPPER } from '@features/MaintenancePlan/constants';

const AddMaintenancePlan = ({
  handleCloseAddNewPlan,
  maintenancePlan,
  selectedMaintenancePlanID,
  setSelectedMaintenancePlanID,
}) => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState();
  const [planColor, setPlanColor] = useState('#f7f7f7');
  const [status, setStatus] = useState(STATUS_OPTIONS[0].label);

  const [planType, setPlanType] = useState(ITEM_TYPE_MAPPER['daily'].value);
  const [formData, setFormData] = useState({
    ...BLANK_MAINTENANCE_PLAN,
  });

  const handleStatus = (e) => setStatus(e.target.value);
  const handlePlanChange = (ev) => setPlanType(ev.target.value);
  const handleColorChange = (newValue) => setPlanColor(newValue);

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
    setPlanType(ITEM_TYPE_MAPPER['daily'].value);
    setPlanColor('#f7f7f7');
    handleCloseAddNewPlan();
    setStatus(STATUS_OPTIONS[0].label);
    setSelectedMaintenancePlanID('');
  };

  const isDisabled = () => {
    const containsErr = Object.values(formData).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formData).filter((v) => v.required);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => {
      return el.value.trim() === '';
    });

    return containsErr || isRequiredFieldsEmpty;
  };

  const handleSubmit = () => {
    if (isDisabled() || status == null) {
      enqueueSnackbar('Cannot add new maintenance plan. Fill all required fields.', {
        variant: 'error',
      });
      return;
    }

    const formattedData = Object.values(formData).reduce((acc, el) => {
      if (['min_items_limit', 'max_items_limit'].includes(el.name)) {
        acc[el.name] = parseFloat(el.value);
      } else if (el.value) {
        acc[el.name] = el.value;
      }
      return acc;
    }, {});

    // seperated to prevent updating sharable groups
    if (selectedMaintenancePlanID) {
      const currentMaintenancePlan = maintenancePlan.find((v) => v.id === selectedMaintenancePlanID);
      const draftRequest = {
        id: selectedMaintenancePlanID,
        ...currentMaintenancePlan,
        ...formattedData,
        type: planType,
        color: planColor,
        location: location,
        plan_type: ITEM_TYPE_MAPPER[planType].value,
        plan_due: ITEM_TYPE_MAPPER[planType].since,
        maintenance_status: status,
        updated_on: dayjs().toISOString(),
      };
      dispatch(maintenancePlanActions.updatePlan(draftRequest));
    } else {
      const draftRequest = {
        ...formattedData,
        type: planType,
        color: planColor,
        plan_type: planType,
        plan_due: ITEM_TYPE_MAPPER[planType].since,
        location: location,
        maintenance_status: status,
        created_on: dayjs().toISOString(),
      };
      dispatch(maintenancePlanActions.createPlan(draftRequest));
    }
    enqueueSnackbar(
      selectedMaintenancePlanID
        ? 'Successfully updated existing maintenance plan.'
        : 'Successfully added new maintenance plan.',
      {
        variant: 'success',
      }
    );
    resetData();
  };

  useEffect(() => {
    if (selectedMaintenancePlanID !== null) {
      const draftMaintenancePlan = maintenancePlan.filter((v) => v.id === selectedMaintenancePlanID).find(() => true);
      setFormData(
        produce(formData, (draft) => {
          draft.name.value = draftMaintenancePlan?.name || '';
          draft.description.value = draftMaintenancePlan?.description || '';
        })
      );

      const currentPlanType = Object.values(ITEM_TYPE_MAPPER).find((v) => v.value === draftMaintenancePlan?.plan_type);

      setStatus(draftMaintenancePlan?.maintenance_status_name || STATUS_OPTIONS[0].label);
      setPlanType(currentPlanType?.value || Object.values(ITEM_TYPE_MAPPER)[0].value);
      setLocation(draftMaintenancePlan?.location);
      setPlanColor(draftMaintenancePlan?.color);
    } else {
      resetData();
    }
  }, [selectedMaintenancePlanID]);

  return (
    <Stack alignItems="center">
      <Stack spacing={2} sx={{ width: '100%' }}>
        <AddFormHeader formFields={formData} setLocation={setLocation} handleInputChange={handleInputChange} />
        <AddTypeOptions value={planType} handleChange={handlePlanChange} />
        <StatusOptions value={status} onChange={handleStatus} />
        <ColorPicker value={planColor} handleChange={handleColorChange} label={'Associate color'} />
      </Stack>
      {location?.lat ? (
        <LocationPicker subtitle="Assign Location" location={location} onLocationChange={setLocation} editMode={true} />
      ) : null}
      <Button onClick={handleSubmit} variant="outlined" disabled={isDisabled()} sx={{ marginTop: '1rem' }}>
        {selectedMaintenancePlanID ? 'Update Plan' : 'Add Plan'}
      </Button>
    </Stack>
  );
};

export default AddMaintenancePlan;
