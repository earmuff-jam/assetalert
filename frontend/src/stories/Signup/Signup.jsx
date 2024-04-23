import { produce } from 'immer';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowRightRounded } from '@material-ui/icons';
import { authActions } from '../../Containers/Auth/authSlice';
import { SIGN_UP_FORM_FIELDS } from '../../Containers/Auth/constants';
import { Checkbox, FormControl, FormControlLabel, InputAdornment, TextField } from '@material-ui/core';
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent';

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

const Signup = ({ setSignUpView }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(SIGN_UP_FORM_FIELDS);
  const [isChecked, setIsChecked] = useState(false);

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

  const fetchSignupFn = (formattedData) => {
    dispatch(authActions.getSignup(formattedData));
  };

  const requiredFormFields = Object.values(formFields).filter((v) => v.required);
  const isRequiredFieldsEmpty = requiredFormFields.some((el) => el.value.trim() === '') || !isChecked;

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

    if (containsErr || isRequiredFieldsEmpty || !isChecked) {
      console.log('Empty form fields. Unable to proceed.');
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
      <FormControl fullWidth>
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)} color="primary" />}
          label="Accept terms and conditions."
          classes={{ label: classes.caption }}
        />
      </FormControl>
      <ButtonComponent
        text={'Register'}
        showIcon={true}
        buttonVariant={'text'}
        disableRipple={true}
        icon={<ArrowRightRounded />}
        disableFocusRipple={true}
        onClick={handleFormSubmit}
        disabled={isRequiredFieldsEmpty}
      />
    </div>
  );
};

Signup.defaultProps = {
  setSignUpView: () => {},
};

Signup.propTypes = {
  setSignUpView: PropTypes.func,
};

export default Signup;
