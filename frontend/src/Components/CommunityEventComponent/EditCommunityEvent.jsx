import PropTypes from 'prop-types';
import classNames from 'classnames';
import Alert from '@mui/material/Alert';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Chip, InputAdornment, TextField } from '@mui/material';
import { EventNoteRounded, EventRounded, FaceRounded } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  textField: {
    padding: theme.spacing(2, 0),
  },
  formInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    gap: theme.spacing(2),
    margin: theme.spacing(2),
  },
  activatedChip: {
    color: theme.palette.error.dark,
    fontSize: '0.825rem',
    letterSpacing: '0.0125rem',
  },
  deactivatedChip: {
    color: theme.palette.primary.main,
    fontSize: '0.825rem',
    letterSpacing: '0.0125rem',
  },
  text: {
    fontSize: '0.825rem',
    letterSpacing: '0.0125rem',
    marginBottom: theme.spacing(1),
  },
}));

const EditCommunityEvent = ({ userDetail, handleUserDetail, isDeactivated, setIsDeactivated }) => {
  const classes = useStyles();
  return (
    <Box className={classes.formInputContainer}>
      <TextField
        size={'small'}
        id={userDetail.id}
        name={'title'}
        label={'Event title'}
        value={userDetail.title || ''}
        variant={'outlined'}
        placeholder={userDetail.title || 'Edit event details to add title'}
        onChange={handleUserDetail}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EventNoteRounded />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        size={'small'}
        id={userDetail.id}
        name={'totalAllocatedMembers'}
        label={'Max attendees'}
        value={userDetail.totalAllocatedMembers || ''}
        variant={'outlined'}
        placeholder={'Total allocated members'}
        onChange={handleUserDetail}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaceRounded />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        size={'small'}
        id={userDetail.id}
        name={'description'}
        label={'Event description'}
        value={userDetail.description || ''}
        variant={'outlined'}
        placeholder={userDetail.description || 'Edit event details to add description'}
        onChange={handleUserDetail}
        multiline={userDetail.multiline}
        maxRows={4}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EventNoteRounded />
            </InputAdornment>
          ),
        }}
      />
      <Box>
        <Alert
          severity={!isDeactivated ? 'info' : 'error'}
          className={classNames(classes.text, isDeactivated ? classes.activatedChip : classes.deactivatedChip)}
        >
          {!isDeactivated
            ? 'Current event is active. Save to process changes.'
            : 'Current event is deactive. Save to process changes.'}
        </Alert>
        <Chip
          icon={<EventRounded className={`${!isDeactivated ? classes.activatedChip : classes.deactivatedChip}`} />}
          label={`${!isDeactivated ? 'Deactivate Event' : 'Activate Event'}`}
          clickable
          size="small"
          name="deactivated"
          value={isDeactivated}
          onClick={() => setIsDeactivated(!isDeactivated)}
          className={`${!isDeactivated ? classes.activatedChip : classes.deactivatedChip}`}
        />
      </Box>
    </Box>
  );
};

EditCommunityEvent.defaultProps = {
  userDetail: {},
  handleUserDetail: () => {},
  isDeactivated: false,
  setIsDeactivated: () => {},
};

EditCommunityEvent.propTypes = {
  userDetail: PropTypes.object,
  handleUserDetail: PropTypes.func,
  isDeactivated: PropTypes.bool,
  setIsDeactivated: PropTypes.func,
};

export default EditCommunityEvent;
