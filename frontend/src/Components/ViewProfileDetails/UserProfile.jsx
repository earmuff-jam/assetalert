import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Chip, Tooltip, Typography } from '@material-ui/core';
import classNames from 'classnames';
import EditProfileImage from '../EditProfileImage/EditProfileImage';
import { useDispatch } from 'react-redux';
import { profileActions } from '../../Containers/Profile/profileSlice';

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: '1.6rem',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
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

const UserProfile = ({ formFields, profileDetails }) => {
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

  const handleSubmitImage = async (userID) => {
    dispatch(profileActions.updateProfileImage({ selectedImage: uploadedImage, userID: userID }));
    toggleEditImage();
    setEditImage(!editImage);
  };

  useEffect(() => {
    if (profileDetails?.avatar_url) {
      setSelectedImage(profileDetails?.avatar_url);
    }
  }, [profileDetails?.avatar_url]);

  return (
    <Box>
      <Box className={classNames(classes.rowContainer, classes.gutterBottom)}>
        {editImage ? (
          <EditProfileImage
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            toggleEditImage={toggleEditImage}
            submit={handleSubmitImage}
            profileDetails={profileDetails}
          />
        ) : (
          <Avatar
            alt="your avatar"
            src={selectedImage && `data:image/png;base64,${selectedImage}`}
            className={classes.avatar}
            onClick={toggleEditImage}
          />
        )}

        <Box>
          <Typography className={classNames(classes.header, classes.errorText)} gutterBottom>
            {formFields.name.value || 'Anonymous'}
          </Typography>
          <Typography className={classes.aboutMe} gutterBottom>
            {formFields.aboutMe.value || 'Edit profile details to add description'}
          </Typography>
          <Box className={classNames(classes.rowContainer, classes.gutterBottom)}>
            <Tooltip title="Your username in the application">
              <Chip size="small" icon={formFields.username.icon} label={formFields.username.value} />
            </Tooltip>
            <Tooltip title="Your mobile phone information">
              <Chip size="small" icon={formFields.phone.icon} label={formFields.phone.value} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
