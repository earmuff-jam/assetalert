import React, { useState } from 'react';

import Title from '../DialogComponent/Title';
import { Box, Button, Dialog, Typography, makeStyles } from '@material-ui/core';
import AddCommunityEvent from '../AddCommunityEvent/AddCommunityEvent';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  headerText: {
    fontSize: '2.0rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
  },
  text: {
    fontSize: '0.925rem',
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const CreateNewEventCta = () => {
  const classes = useStyles();

  const { loading, username } = useSelector((state) => state.home);

  const [editMode, setEditMode] = useState(false);
  const handleClick = () => setEditMode(!editMode);

  return (
    <Box className={classes.container}>
      <Typography className={classes.headerText} gutterBottom>
        {username?.length > 0 ? `Welcome ${username} !` : 'Welcome User !'}
      </Typography>
      <Typography className={classes.text} gutterBottom>
        You can create new events or browse all existing events. Existing events can be volunteered upon. Browse other
        events around you, or jump right in.
      </Typography>
      <Button onClick={handleClick}> Create Event </Button>

      {editMode && (
        <Dialog open={editMode} width={'md'} fullWidth={true}>
          <Title onClose={() => setEditMode(false)}>Add New Event</Title>
          <AddCommunityEvent setEditMode={setEditMode} />
        </Dialog>
      )}
    </Box>
  );
};

export default CreateNewEventCta;
