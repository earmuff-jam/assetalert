import PropTypes from 'prop-types';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
}));

const StatusRadioButtons = ({ statusSelection, handleChange }) => {
  const classes = useStyles();
  return (
    <FormControl required>
      <FormLabel component="legend">Status</FormLabel>
      <RadioGroup aria-label="status" name="status" value={statusSelection} onChange={handleChange}>
        <Box className={classes.rowContainer}>
          <FormControlLabel value="all" control={<Radio />} label="Common / All Items" />
          <FormControlLabel value="deals" control={<Radio />} label="Coupons / Deals" />
        </Box>
        <Box className={classes.rowContainer}>
          <FormControlLabel value="draft" control={<Radio />} label="Draft" />
          <FormControlLabel value="hidden" control={<Radio />} label="Hidden" />
        </Box>
      </RadioGroup>
    </FormControl>
  );
};

StatusRadioButtons.defaultProps = {
  statusSelection: '',
  handleChange: () => {},
};

StatusRadioButtons.propTypes = {
  statusSelection: PropTypes.string,
  handleChange: PropTypes.func,
};

export default StatusRadioButtons;
