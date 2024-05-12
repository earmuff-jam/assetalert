import { useState } from 'react';
import { produce } from 'immer';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowRightRounded } from '@material-ui/icons';
import { authActions } from '../../Containers/Auth/authSlice';
import { InputAdornment, TextField } from '@material-ui/core';
import { LOGIN_FORM_FIELDS } from '../../Containers/Auth/constants';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '1.2rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(0, 2),
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

  const validate = (formFields) => {
    const containsErr = Object.values(formFields).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formFields).filter((v) => v.required);
    return containsErr || requiredFormFields.some((el) => el.value.trim() === '');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validate(formFields)) {
      console.log('Empty form fields. Unable to proceed.');
      return;
    } else {
      const formattedData = Object.values(formFields).reduce((acc, el) => {
        if (el.value) {
          acc[el.name] = el.value;
        }
        return acc;
      }, {});
      dispatch(authActions.getUserID(formattedData));
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
      <ButtonComponent
        text={'Submit'}
        showIcon={true}
        icon={<ArrowRightRounded />}
        buttonVariant={'text'}
        onClick={handleFormSubmit}
        disabled={validate(formFields)}
        disableRipple={true}
        disableFocusRipple={true}
      />
    </div>
  );
};

export default Login;
