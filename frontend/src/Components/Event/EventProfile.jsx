import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Typography } from '@material-ui/core';

import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import EditEventImage from './EditEventImage';
import { eventActions } from '../../Containers/Event/eventSlice';

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: '1.6rem',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  adjustMaxWidth: {
    maxWidth: '20rem',
  },
  errorText: {
    color: theme.palette.error.dark,
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  text: {
    fontSize: '0.925rem',
  },
}));

const EventProfile = ({ userDetail }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [editImage, setEditImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const toggleEditImage = () => {
    setEditImage(!editImage);
    const input = document.querySelector('input[type="file"]');
    if (input) {
      input.value = ''; // Reset the value of the input to clear the selected file (if possible)
    }
  };

  const handleSubmitImage = async (id) => {
    dispatch(eventActions.updateEventImage({ selectedImage: uploadedImage, eventID: id }));
    toggleEditImage();
    setEditImage(!editImage);
  };

  useEffect(() => {
    setSelectedImage(userDetail?.imageUrl);
  }, [userDetail?.imageUrl]);

  return (
    <Box className={classNames(classes.rowContainer, classes.gutterBottom)}>
      <Box className={classNames(classes.rowContainer, classes.gutterBottom)}>
        {editImage ? (
          <EditEventImage
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            toggleEditImage={toggleEditImage}
            submit={handleSubmitImage}
            eventID={userDetail.id}
          />
        ) : (
          <Avatar
            data-tour="0"
            alt="event avatar"
            src={(selectedImage && `data:image/png;base64,${selectedImage}`) || 'blank_canvas.png'}
            className={classes.avatar}
            onClick={toggleEditImage}
          />
        )}
      </Box>
      <Box className={classes.adjustMaxWidth}>
        <Typography className={classNames(classes.header, classes.errorText)} gutterBottom data-tour="1">
          {userDetail?.title || ''}
        </Typography>
        <Typography className={classes.text} gutterBottom data-tour="2">
          {userDetail?.description || 'Edit event details to add description'}
        </Typography>
      </Box>
    </Box>
  );
};

export default EventProfile;
