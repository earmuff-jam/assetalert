import React, { useEffect, useState } from 'react';
import { Container, makeStyles, CircularProgress, Grid } from '@material-ui/core';

import { enqueueSnackbar } from 'notistack';
import { profileActions } from './profileSlice';
import { homeActions } from '../Home/homeSlice';
import { USER_PROFILE_FORM_FIELDS } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDetailsCard from '../../Components/Profile/ProfileDetailsCard';
import RecentActivitiesList from '../../Components/RecentActivitiesList/RecentActivitiesList';

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1rem auto',
    minHeight: '100%',
    backgroundColor: theme.palette.secondary.main,
  },
  profileContainer: {
    margin: theme.spacing(0, 2),
  },
  aside: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
}));

const ProfileDetailPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading: eventsLoading, events } = useSelector((state) => state.home);
  const { profileDetails, volunteeringDetails } = useSelector((state) => state.profile);

  const userCreatedEvents = events?.filter((v) => v.created_by === profileDetails.id);
  const usernameOrFullName = profileDetails.username || profileDetails.full_name || 'Anonymous';

  const [editImage, setEditImage] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [formFields, setFormFields] = useState(USER_PROFILE_FORM_FIELDS);

  const handleInput = (event) => {
    const { name, value } = event.target;

    setFormFields((prevFormFields) => {
      const updatedFormFields = { ...prevFormFields };
      updatedFormFields[name].value = value;
      updatedFormFields[name].errorMsg = '';

      for (const validator of updatedFormFields[name].validators) {
        if (validator.validate(value)) {
          updatedFormFields[name].errorMsg = validator.message;
          break;
        }
      }
      return updatedFormFields;
    });
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setUploadedImage(null);
    const input = document.querySelector('input[type="file"]');
    if (input) {
      input.value = ''; // Reset the value of the input to clear the selected file (if possible)
    }
  };

  const handleToggle = () => setEditMode(!editMode);
  const toggleEditImage = () => {
    setEditImage(!editImage);
    if (uploadedImage) {
      removeSelectedImage();
    }
  };

  const handleSubmit = () => {
    const containsErr = Object.values(formFields).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formFields).filter((v) => v.required);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => el.value.trim() === '');

    if (containsErr || isRequiredFieldsEmpty) {
      enqueueSnackbar('Cannot update user profile details.', {
        variant: 'error',
      });
      return;
    } else {
      const formattedData = Object.values(formFields).reduce((acc, el) => {
        if (el.value) {
          acc[el.name] = el.value;
        }
        return acc;
      }, {});
      dispatch(profileActions.updateProfileDetails({ formattedData }));
      handleToggle();
      enqueueSnackbar('Successfully updated user profile details.', {
        variant: 'success',
      });
    }
  };

  const submit = async (userID) => {
    dispatch(profileActions.updateProfileImage({ selectedImage: uploadedImage, userID: userID }));
    toggleEditImage();
    setEditImage(!editImage);
  };

  useEffect(() => {
    dispatch(homeActions.getEvents());
    dispatch(profileActions.getProfileDetails());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (profileDetails.id) {
      dispatch(profileActions.getVolunteeringDetails({ userID: profileDetails.id }));
    }
    const updatedFormFields = { ...formFields };
    updatedFormFields.name.value = profileDetails?.full_name || '';
    updatedFormFields.phone.value = profileDetails?.phone_number || '';
    updatedFormFields.username.value = profileDetails?.username || '';
    updatedFormFields.objective.value = profileDetails?.goal || '';
    updatedFormFields.aboutMe.value = profileDetails?.about_me || '';
    setFormFields(updatedFormFields);
    if (profileDetails.avatar_url) {
      setSelectedImage(profileDetails?.avatar_url);
    }
    // eslint-disable-next-line
  }, [profileDetails]);

  if (eventsLoading) {
    return (
      <div className={classes.spinnerContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <ProfileDetailsCard
            editMode={editMode}
            editImage={editImage}
            formFields={formFields}
            avatarSrc={selectedImage}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            handleToggle={handleToggle}
            uploadedImage={uploadedImage}
            toggleEditImage={toggleEditImage}
            setUploadedImage={setUploadedImage}
            setSelectedImage={setSelectedImage}
            profileDetails={profileDetails}
            submit={submit}
          />
        </Grid>
        <Grid item xs={12} data-tour="11">
          <RecentActivitiesList
            userCreatedEvents={userCreatedEvents}
            volunteeringDetails={volunteeringDetails}
            usernameOrFullName={usernameOrFullName}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileDetailPage;
