import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, InputAdornment, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    gap: theme.spacing(2),
  },
}));

const EditingUserProfile = ({ formFields, handleInput }) => {
  const classes = useStyles();
  return (
    <Box className={classes.formInputContainer}>
      {Object.values(formFields).map((v, index) => (
        <TextField
          key={index}
          size={'small'}
          id={v.name}
          name={v.name}
          label={v.label}
          value={v.value}
          variant={v.variant}
          placeholder={v.placeholder}
          onChange={handleInput}
          required={v.required}
          fullWidth={v.fullWidth}
          error={!!v.errorMsg}
          helperText={v.errorMsg}
          multiline={v.multiline}
          InputProps={{
            startAdornment: <InputAdornment position="start">{v.icon || ''}</InputAdornment>,
          }}
        />
      ))}
    </Box>
  );
};

export default EditingUserProfile;
