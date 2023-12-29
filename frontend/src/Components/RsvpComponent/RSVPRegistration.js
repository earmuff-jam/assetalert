import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  Tooltip,
  FormLabel,
  FormControl,
  FormHelperText,
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  headerText: {
    fontSize: '2.0rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.error.dark,
  },
  text: {
    fontSize: '0.925rem',
    fontFamily: 'Poppins, sans-serif',
  },
}));

const RSVPRegistration = ({ isChecked, handleRSVP, disabled }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.headerText} gutterBottom>
        Want to volunteer ?
      </Typography>

      <Typography className={classes.text} gutterBottom>
        Attending an event allows you to log volunteering hours for that event.
      </Typography>

      <Tooltip
        title="Place a checkmark to agree to RSVP to the event. RSVP does not infer the participant will be on the event but gives reason to believe they will attend the event."
        placement="top-end"
      >
        <FormControl>
          <FormControlLabel
            label="Attend"
            control={
              <Checkbox
                checked={isChecked}
                onChange={(event) => handleRSVP(event.target.checked)}
                color="primary"
                disabled={disabled}
                name="rsvp"
              />
            }
          />
        </FormControl>
      </Tooltip>
    </Box>
  );
};

export default RSVPRegistration;
