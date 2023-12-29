import React from 'react';
import { Avatar, Box, Chip, Divider, Tooltip, Typography, makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import EditProfileImage from '../EditProfileImage/EditProfileImage';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
  },
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
  emptyGap: {
    flexGrow: 1,
  },
  errorText: {
    color: theme.palette.error.dark,
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  btnRoot: {
    color: theme.palette.primary.main,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  text: {
    fontSize: '0.925rem',
  },
}));

const UserProfile = ({
  formFields,
  avatarSrc,
  selectedImage,
  setSelectedImage,
  uploadedImage,
  submit,
  profileDetails,
  setUploadedImage,
  editImage,
  toggleEditImage,
}) => {
  const classes = useStyles();

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
            submit={submit}
            profileDetails={profileDetails}
          />
        ) : (
          <Avatar
            alt="your avatar"
            src={avatarSrc && `data:image/png;base64,${avatarSrc}`}
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
