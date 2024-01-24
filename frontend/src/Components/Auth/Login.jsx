import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { produce } from 'immer';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import { LOGIN_FORM_FIELDS } from './constants';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Containers/Auth/authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  text: {
    fontSize: '1.2rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
  },
  header: {
    fontSize: '1.6rem',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  errorText: {
    color: theme.palette.error.dark,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(0, 2),
  },
  warningText: {
    color: theme.palette.error.main,
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(LOGIN_FORM_FIELDS);

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

  const fetchLoginFn = (formattedData) => {
    dispatch(authActions.getUserID(formattedData));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const containsErr = Object.values(formFields).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formFields).filter((v) => v.required);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => el.value.trim() === '');

    if (containsErr || isRequiredFieldsEmpty) {
      console.log('Empty form fields. Unable to proceed.');
      return;
    } else {
      const formattedData = Object.values(formFields).reduce((acc, el) => {
        if (el.value) {
          acc[el.name] = el.value;
        }
        return acc;
      }, {});

      fetchLoginFn(formattedData);
    }
  };

  return (
    <div className={classes.form}>
      <form>
        {Object.values(formFields).map((v, index) => (
          <TextField
            className={classes.text}
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
                handleFormSubmit(e);
              }
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">{v.icon}</InputAdornment>,
            }}
          />
        ))}
      </form>
      <Button onClick={handleFormSubmit}>Submit</Button>
    </div>
  );
};

export default Login;
