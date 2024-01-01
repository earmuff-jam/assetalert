import React from 'react';
import Alert from '@material-ui/lab/Alert';
import classNames from 'classnames';
import { Box, Chip, InputAdornment, TextField, makeStyles } from '@material-ui/core';
import { EventNoteRounded, EventRounded, FaceRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  textField: {
    padding: theme.spacing(2, 0),
  },
  formInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    gap: theme.spacing(2),
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
          severity="info"
          className={classNames(classes.text, isDeactivated ? classes.activatedChip : classes.deactivatedChip)}
        >
          {!isDeactivated
            ? 'Current event is active. Save to process changes.'
            : 'Current event is deactive. save to process changes.'}
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

export default EditCommunityEvent;
