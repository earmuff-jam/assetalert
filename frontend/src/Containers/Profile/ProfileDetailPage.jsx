import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CircularProgress, Grid, Popover } from '@material-ui/core';
import { enqueueSnackbar } from 'notistack';
import { profileActions } from './profileSlice';
import { homeActions } from '../Home/homeSlice';
import { USER_PROFILE_FORM_FIELDS } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDetailsCard from '../../Components/Profile/ProfileDetailsCard';
import RecentActivitiesList from '../../Components/RecentActivitiesList/RecentActivitiesList';
import Notification from '../../Components/Profile/Notification';
import { produce } from 'immer';

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
  const {
    loading: profileStateLoading,
    profileDetails,
    volunteeringDetails,
    notifications: notificationsDetails,
  } = useSelector((state) => state.profile);

  const userCreatedEvents = events?.filter((v) => v.created_by === profileDetails.id);
  const usernameOrFullName = profileDetails.username || profileDetails.full_name || 'Anonymous';

  const [editMode, setEditMode] = useState(false);
  const [formFields, setFormFields] = useState(USER_PROFILE_FORM_FIELDS);

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const handleClickNotificationBar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotificationBar = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleNotificationMenuSelect = (id) => {
    const selectedNotification = notifications.filter((v) => v.id === id).find((v) => true);
    const draftNotification = produce(selectedNotification, (draft) => {
      draft.is_viewed = true;
    });
    dispatch(profileActions.updateProfileNotification({ data: draftNotification }));
  };

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

  const handleToggle = () => setEditMode(!editMode);
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

  useEffect(() => {
    dispatch(homeActions.getEvents());
    dispatch(profileActions.getProfileDetails());
    dispatch(profileActions.getProfileNotifications());
    dispatch(profileActions.getRecentActivitiesList());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (Array.isArray(notificationsDetails) && notificationsDetails?.length >= 0) {
      setNotifications([...notificationsDetails]);
    }
    // eslint-disable-next-line
  }, [profileStateLoading]);

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
        <Grid item xs={12} data-tour="0">
          <ProfileDetailsCard
            editMode={editMode}
            formFields={formFields}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            handleToggle={handleToggle}
            profileDetails={profileDetails}
            notifications={notifications}
            handleClickNotificationBar={handleClickNotificationBar}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseNotificationBar}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Notification notifications={notifications} handleNotificationMenuSelect={handleNotificationMenuSelect} />
          </Popover>
        </Grid>
        <Grid item xs={12} data-tour="1">
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
