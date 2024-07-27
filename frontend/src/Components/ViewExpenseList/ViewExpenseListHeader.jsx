import makeStyles from '@mui/styles/makeStyles';
import { Box, Typography } from '@mui/material';

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

const ViewExpenseListHeader = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.headerText} gutterBottom>
        Expense List
      </Typography>

      <Typography className={classes.text} gutterBottom>
        View list of expenses incurred on selected event.
      </Typography>
    </Box>
  );
};

export default ViewExpenseListHeader;
