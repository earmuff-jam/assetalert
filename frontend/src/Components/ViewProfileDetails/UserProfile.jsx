import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Chip, Tooltip, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import EditProfileImage from '../EditProfileImage/EditProfileImage';
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
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  aboutMe: {
    fontSize: '0.725rem',
    fontWeight: 'bold',
    overflowWrap: 'anywhere',
  },
  centerContent: {
    display: 'flex',
    alignItems: 'center',
  },
  userProfileDetailsContainer: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));

const UserProfile = ({ formFields, avatarUrl, profileID }) => {
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
    if (avatarUrl) {
      setSelectedImage(avatarUrl);
    }
  }, [avatarUrl]);

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
            profileID={profileID}
          />
        ) : (
          <Avatar
            alt="your avatar"
            src={selectedImage && `data:image/png;base64,${selectedImage}`}
            className={classes.avatar}
            onClick={toggleEditImage}
          />
        )}

        <Box className={classes.userProfileDetailsContainer}>
          <Box className={classes.rowContainer}>
            <Typography className={classNames(classes.header, classes.errorText)} gutterBottom>
              {formFields.name.value || 'Anonymous'}
            </Typography>
            <Box className={classNames(classes.rowContainer, classes.centerContent)}>
              <Tooltip title="Your username in the application">
                <Chip size="small" icon={formFields.username.icon} label={formFields.username.value} />
              </Tooltip>
              <Tooltip title="Your mobile phone information">
                <Chip size="small" icon={formFields.phone.icon} label={formFields.phone.value} />
              </Tooltip>
            </Box>
          </Box>
          <Typography className={classes.aboutMe}>
            {formFields.aboutMe.value || 'Edit profile details to add description'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

UserProfile.defaultProps = {
  formFields: {},
  avatarUrl: '',
  profileID: '',
};

UserProfile.propTypes = {
  formFields: PropTypes.object,
  avatarUrl: PropTypes.string,
  profileID: PropTypes.string,
};
export default UserProfile;
