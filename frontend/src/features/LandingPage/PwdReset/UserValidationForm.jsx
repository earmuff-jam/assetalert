import { useState } from 'react';
import { USER_VALIDATION_FORM_FIELDS } from '../constants';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import HeaderWithButton from '../../common/HeaderWithButton';
import { useDispatch } from 'react-redux';
import { authActions } from '../authSlice';

export const SECURITY_QUESTIONS = [
  {
    id: 1,
    label: 'Which year did you graduate high school ?',
  },
  {
    id: 2,
    label: 'Where did your parents first meet ?',
  },
];

export default function UserValidationForm({ increaseStepCount }) {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(USER_VALIDATION_FORM_FIELDS);

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

  const handleClick = () => {
    increaseStepCount();
    const formattedData = Object.values(formFields).reduce((acc, el) => {
      if (el.value) {
        acc[el.name] = el.value;
      }
      return acc;
    }, {});
    dispatch(authActions.getUserVerification(formattedData));
  };

  const hasErrorInForm = () => {
    const containsErr = Object.values(formFields).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formFields).filter((v) => v.required);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => el.value.trim() === '');

    return containsErr || isRequiredFieldsEmpty;
  };

  return (
    <>
      <HeaderWithButton
        title="Security questions"
        secondaryTitle="Please answer your security questions to the best of your knowledge."
      />
      <Stack width="inherit" spacing="1rem">
        <Typography variant="h6">Email address</Typography>
        <TextField
          id={formFields['email'].name}
          name={formFields['email'].name}
          label={formFields['email'].label}
          value={formFields['email'].value}
          placeholder={formFields['email'].placeholder}
          onChange={handleInput}
          required={formFields['email'].required}
          fullWidth={formFields['email'].fullWidth}
          error={!!formFields['email'].errorMsg}
          helperText={formFields['email'].errorMsg}
          variant={formFields['email'].variant}
          minRows={formFields['email'].rows || 4}
          multiline={formFields['email'].multiline || false}
        />
        <Typography variant="h6">Date of birth</Typography>
        <TextField
          id={formFields['birthday'].name}
          name={formFields['birthday'].name}
          label={formFields['birthday'].label}
          value={formFields['birthday'].value}
          type={formFields['birthday'].type}
          variant={formFields['birthday'].variant}
          autoComplete={formFields['birthday'].autocomplete}
          placeholder={formFields['birthday'].placeholder}
          onChange={handleInput}
          required={formFields['birthday'].required}
          fullWidth={formFields['birthday'].fullWidth}
          error={!!formFields['birthday'].errorMsg}
          helperText={formFields['birthday'].errorMsg}
        />
        <Box>
          <Button variant="outlined" onClick={handleClick} disabled={hasErrorInForm()}>
            Next
          </Button>
        </Box>
      </Stack>
    </>
  );
}
