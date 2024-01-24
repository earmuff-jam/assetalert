import React from 'react';
import { Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    gap: theme.spacing(2),
  },
}));

const AboutMe = ({ formFields, handleInput }) => {
  const classes = useStyles();
  return (
    <Box className={classes.formInputContainer}>
      {Object.values(formFields)
        .slice(3)
        .map((v, index) => (
          <TextField
            key={index}
            id={v.name}
            name={v.name}
            label={v.label}
            value={v.value}
            variant={v.variant}
            placeholder={v.placeholder}
            onChange={handleInput}
            required={v.required}
            fullWidth={v.fullWidth}
            helperText={v.errorMsg}
            multiline
            minRows={4}
          />
        ))}
    </Box>
  );
};

export default AboutMe;
