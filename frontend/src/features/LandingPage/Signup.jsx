import { produce } from 'immer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './authSlice';
import { SIGN_UP_FORM_FIELDS } from './constants';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { CheckRounded, CloseRounded } from '@mui/icons-material';

const Signup = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { isValidUserEmail, loading } = useSelector((state) => state.auth);

  const [isChecked, setIsChecked] = useState(false);
  const [formFields, setFormFields] = useState(SIGN_UP_FORM_FIELDS);

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

  const hasError = (formFields = []) => {
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

  const submit = (e) => {
    e.preventDefault();
    if (hasError(formFields) || !isChecked) {
      return;
    } else {
      const formattedData = Object.values(formFields).reduce((acc, el) => {
        if (el.value) {
          acc[el.name] = el.value;
        }
        return acc;
      }, {});
      dispatch(authActions.getSignup(formattedData));
      handleClose(false);
    }
  };

  const validUserEmail = (isValidUserEmail, loading) => {
    if (loading) {
      return <CircularProgress size="1.2rem" />;
    } else {
      return isValidUserEmail ? (
        <Stack direction="row" alignItems="center" component="span">
          <CheckRounded color="success" /> <Typography variant="caption">Unique value for email</Typography>
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" component="span">
          <CloseRounded color="error" /> <Typography variant="caption">Existing value for email</Typography>
        </Stack>
      );
    }
  };

  return (
    <Stack>
      <Stack spacing="1rem">
        <TextField
          id={formFields['username'].name}
          name={formFields['username'].name}
          label={formFields['username'].label}
          value={formFields['username'].value}
          type={formFields['username'].type}
          variant={formFields['username'].variant}
          autoComplete={formFields['username'].autocomplete}
          placeholder={formFields['username'].placeholder}
          onChange={handleInput}
          required={formFields['username'].required}
          fullWidth={formFields['username'].fullWidth}
          error={!!formFields['username'].errorMsg}
          helperText={formFields['username'].errorMsg}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              submit(e);
            }
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">{formFields['username'].icon}</InputAdornment>,
          }}
        />
        <TextField
          id={formFields['email'].name}
          name={formFields['email'].name}
          label={formFields['email'].label}
          value={formFields['email'].value}
          type={formFields['email'].type}
          variant={formFields['email'].variant}
          autoComplete={formFields['email'].autocomplete}
          placeholder={formFields['email'].placeholder}
          onChange={handleInput}
          required={formFields['email'].required}
          fullWidth={formFields['email'].fullWidth}
          error={!!formFields['email'].errorMsg}
          helperText={formFields['email'].errorMsg || validUserEmail(isValidUserEmail, loading)}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              submit(e);
            }
          }}
          onBlur={() => dispatch(authActions.isValidUserEmail({ email: formFields.email.value }))}
          InputProps={{
            startAdornment: <InputAdornment position="start">{formFields['email'].icon}</InputAdornment>,
          }}
        />
        <TextField
          id={formFields['password'].name}
          name={formFields['password'].name}
          label={formFields['password'].label}
          value={formFields['password'].value}
          type={formFields['password'].type}
          variant={formFields['password'].variant}
          autoComplete={formFields['password'].autocomplete}
          placeholder={formFields['password'].placeholder}
          onChange={handleInput}
          required={formFields['password'].required}
          fullWidth={formFields['password'].fullWidth}
          error={!!formFields['password'].errorMsg}
          helperText={formFields['password'].errorMsg}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              submit(e);
            }
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">{formFields['password'].icon}</InputAdornment>,
          }}
        />
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
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              submit(e);
            }
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">{formFields['birthday'].icon}</InputAdornment>,
          }}
        />
      </Stack>
      <FormControl fullWidth>
        <FormControlLabel
          slotProps={{ typography: { variant: 'caption' } }}
          control={
            <Checkbox size="small" checked={isChecked} onChange={() => setIsChecked(!isChecked)} color="primary" />
          }
          label="Accept terms and conditions."
        />
      </FormControl>
      <Stack direction="row" spacing="0.2rem">
        <Typography variant="caption">Read about our</Typography>
        <Link
          variant="caption"
          target="_blank"
          rel="noopener noreferrer"
          href={`${encodeURI('https://github.com/earmuff-jam/mashed/blob/main/PRIVACY_POLICY.md')}`}
        >
          terms and conditions
        </Link>
      </Stack>

      <Box>
        <Button variant="outlined" onClick={submit} disabled={hasError(formFields) || !isChecked}>
          Register
        </Button>
      </Box>
    </Stack>
  );
};

export default Signup;
