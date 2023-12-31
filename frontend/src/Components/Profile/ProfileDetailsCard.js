import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CheckRounded, EditRounded, CancelRounded } from '@material-ui/icons';
import { Box, Card, CardContent, IconButton } from '@material-ui/core';
import UserProfile from '../ViewProfileDetails/UserProfile';
import EditingUserProfile from '../ViewProfileDetails/EditingUserProfile';

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
  text: {
    fontSize: '0.925rem',
  },
}));

const ProfileDetailsCard = ({
  editMode,
  editImage,
  formFields,
  profileDetails,
  selectedImage,
  setSelectedImage,
  uploadedImage,
  setUploadedImage,
  handleRemove,
  submit,
  avatarSrc,
  toggleEditImage,
  handleInput,
  handleSubmit,
  handleToggle,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box className={classes.rowContainer}>
          <UserProfile
            editImage={editImage}
            formFields={formFields}
            avatarSrc={avatarSrc}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            handleRemove={handleRemove}
            submit={submit}
            profileDetails={profileDetails}
            toggleEditImage={toggleEditImage}
          />
          <Box className={classes.emptyGap}></Box>
          <Box>
            <IconButton disabled={!editMode} onClick={handleSubmit} className={classes.buttonSecondary}>
              <CheckRounded />
            </IconButton>
            <IconButton onClick={handleToggle} className={classes.buttonSecondary}>
              {!editMode ? <EditRounded /> : <CancelRounded />}
            </IconButton>
          </Box>
        </Box>
        {editMode && <EditingUserProfile formFields={formFields} handleInput={handleInput} />}
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsCard;
