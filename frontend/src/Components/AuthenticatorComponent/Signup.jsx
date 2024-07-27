import { produce } from 'immer';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ArrowRightRounded } from '@mui/icons-material';
import { authActions } from '../../Containers/Auth/authSlice';
import { SIGN_UP_FORM_FIELDS } from '../../Containers/Auth/constants';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const Signup = ({ setSignUpView }) => {
  const dispatch = useDispatch();

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

  const fetchSignupFn = (formattedData) => dispatch(authActions.getSignup(formattedData));

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
      fetchSignupFn(formattedData);
      setSignUpView(false);
    }
  };

  return (
    <Stack>
      <Stack spacing="1rem">
        {Object.values(formFields).map((v, index) => (
          <TextField
            key={index}
            id={v.name}
            name={v.name}
            label={v.label}
            value={v.value}
            type={v.type}
            variant={v.variant}
            autoComplete={v.autocomplete}
            placeholder={v.placeholder}
            onChange={handleInput}
            required={v.required}
            fullWidth={v.fullWidth}
            error={!!v.errorMsg}
            helperText={v.errorMsg}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                submit(e);
              }
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">{v.icon}</InputAdornment>,
            }}
          />
        ))}
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

Signup.defaultProps = {
  setSignUpView: () => {},
};

Signup.propTypes = {
  setSignUpView: PropTypes.func,
};

export default Signup;
