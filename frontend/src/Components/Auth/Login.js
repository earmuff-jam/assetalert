import React, { useState } from 'react';
import { Typography, Button, TextField, makeStyles, Chip, InputAdornment, Box } from '@material-ui/core';

import { produce } from 'immer';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { LOGIN_SIGN_UP_FORM_FIELDS } from './constants';
import { authActions } from '../../Containers/Auth/authSlice';
import { EmojiPeopleRounded, FaceRounded } from '@material-ui/icons';

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

const Login = ({ hasServerError }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // editing state is set to handle touch during error handling
  const [editing, setEditing] = useState(false);
  const [signUpView, setSignUpView] = useState(false);
  const [formFields, setFormFields] = useState(LOGIN_SIGN_UP_FORM_FIELDS);

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
    setEditing(true);
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
      return;
    } else {
      const formattedData = Object.values(formFields).reduce((acc, el) => {
        if (el.value) {
          acc[el.name] = el.value;
        }
        return acc;
      }, {});

      setEditing(false);

      if (signUpView) {
        dispatch(authActions.getSignup(formattedData));
        return;
      }
      dispatch(authActions.getUserID(formattedData));
    }
  };

  return (
    <Box className={classes.root}>
      <Typography className={classNames(classes.header, classes.errorText)}>Find meaning to volunteer</Typography>
      <Typography className={classes.text}>
        Sign up to be updated with events around your community. You can lend a hand, or even ask for one.
        <EmojiPeopleRounded />
      </Typography>
      <Typography className={classes.header}>{signUpView ? 'Sign Up' : 'Sign In'}</Typography>
      <div className={classes.form}>
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
        <Typography variant="body1" className={classes.text}>
          {signUpView ? `Already have an account ?` : `Do not have an account ?`}
        </Typography>
        <div className={classes.row}>
          <Chip
            icon={<FaceRounded />}
            label={signUpView ? `Login` : `Create Account`}
            onClick={() => {
              setEditing(true);
              setSignUpView(!signUpView);
            }}
            variant="outlined"
          />
          <Button onClick={handleFormSubmit}>Submit</Button>
        </div>
        <span className={classes.warningText}>{!editing && hasServerError}</span>
      </div>
    </Box>
  );
};

export default Login;
