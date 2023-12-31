import React from 'react';
import { Box, FormControlLabel, InputAdornment, Switch, TextField, makeStyles } from '@material-ui/core';
import { EventNoteRounded, FaceRounded } from '@material-ui/icons';

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
}));

const EditCommunityEvent = ({ userDetail, handleUserDetail, isActivated }) => {
  const classes = useStyles();

  return (
    <Box className={classes.formInputContainer}>
      <TextField
        key={userDetail.title}
        size={'small'}
        id={userDetail.id}
        name={'title'}
        label={'Event title'}
        value={userDetail.title}
        variant={'outlined'}
        placeholder={userDetail.title}
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
        key={userDetail.totalAllocatedMembers}
        size={'small'}
        id={userDetail.id}
        name={'totalAllocatedMembers'}
        label={'Max attendees'}
        value={userDetail.totalAllocatedMembers}
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
        key={userDetail.id}
        size={'small'}
        id={userDetail.id}
        name={'description'}
        label={'Event description'}
        value={userDetail.description || ''}
        variant={'outlined'}
        placeholder={userDetail.description}
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
      <FormControlLabel
        control={
          <Switch
            onChange={handleUserDetail}
            size="small"
            value={!isActivated}
            name="is_activated"
            inputProps={{ 'aria-label': 'toggle event activation' }}
          />
        }
        label={`${!isActivated ? 'Deactivate Event' : 'Activate Event'}`}
      />
    </Box>
  );
};

export default EditCommunityEvent;
