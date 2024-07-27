import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { IconButton, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: '1.125rem',
    fontFamily: 'Roboto',
    color: theme.palette.primary.main,
  },
  errorButton: {
    color: theme.palette.error.dark,
  },
}));

const Title = (props) => {
  const classes = useStyles();
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <div className={classes.container}>
        <Typography className={classes.text}>{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            className={classes.errorButton}
            size="large">
            <CloseRoundedIcon />
          </IconButton>
        ) : null}
      </div>
    </MuiDialogTitle>
  );
};

Title.defaultProps = {
  children: '',
  onClose: () => {},
};

Title.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.string,
};

export default Title;
