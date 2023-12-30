import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { CircularProgress, Container, Grid, makeStyles } from '@material-ui/core';

import { produce } from 'immer';
import '../../Components/Map/styles.css';
import { eventActions } from './eventSlice';
import { homeActions } from '../Home/homeSlice';
import { BLANK_USER_DETAILS } from './constants';
import { profileActions } from '../Profile/profileSlice';
import SecondaryAppBar from '../../Components/AppBar/SecondaryAppBar';
import EventDetailsCard from '../../Components/Event/EventDetailsCard';
import EventDetailsDrawerComponent from '../../Components/Event/EventDetailsDrawerComponent';

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

const EventDetailPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { eventID } = useParams();

  const { loading: loadingProfileDetails, profileDetails } = useSelector((state) => state.profile);
  const {
    loading: loadingSelectevent,
    selectedEvent,
    volunteeringActivities,
    reports,
  } = useSelector((state) => state.event);

  const [editMode, setEditMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userDetail, setUserDetail] = useState(BLANK_USER_DETAILS);

  const displaySecondaryMenuBar = (event) => {
    if (event.is_activated) {
      return true;
    }
    return false;
  };

  const handleLeave = (sharable_groups, userID) => {
    const formattedGroups = sharable_groups.filter((v) => v !== userID);
    eventID &&
      dispatch(
        homeActions.updateEvent({
          ...selectedEvent,
          id: eventID,
          userID: userID,
          sharable_groups: formattedGroups,
          updated_by: userID,
        })
      );
    navigate('/');
  };

  const handleJoin = (userID) => {
    // attendees are who RSVP
    // members are who JOIN
    const existingAttendees = userDetail.attendees;
    const existingMembers = userDetail.sharable_groups;
    // flushUpdate is used to only update the reducer
    // fn homeActions.updateEvent will try to save in db
    eventID &&
      dispatch(
        eventActions.flushUpdate({
          attendees: existingAttendees,
          sharable_groups: [userID, ...existingMembers],
          updated_by: userID,
        })
      );
    eventID &&
      dispatch(
        homeActions.updateEvent({
          ...selectedEvent,
          id: eventID,
          userID: userID,
          sharable_groups: [userID, ...existingMembers],
          updated_by: userID,
        })
      );
  };

  const handleRSVP = (isCheckedBoolValue) => {
    const existingRsvpMembers = userDetail.attendees;
    const existingMembers = userDetail.sharable_groups;
    if (isCheckedBoolValue) {
      setUserDetail((prev) => ({ ...prev, attendees: [userDetail.userID] }));
      eventID &&
        dispatch(
          homeActions.updateEvent({
            ...selectedEvent,
            userID: userDetail.userID,
            attendees: [...existingRsvpMembers, userDetail.userID],
            eventID: eventID,
          })
        );
      eventID &&
        dispatch(
          eventActions.flushUpdate({
            attendees: [userDetail.userID, ...existingRsvpMembers],
            sharable_groups: existingMembers,
            updated_by: userDetail.userID,
          })
        );
    } else {
      const filteredData = userDetail.attendees.filter((v) => v !== userDetail.userID);
      setUserDetail(
        produce((draft) => {
          draft.attendees = filteredData;
        })
      );
      eventID &&
        dispatch(
          homeActions.updateEvent({
            ...selectedEvent,
            userID: userDetail.userID,
            attendees: filteredData,
            eventID: eventID,
          })
        );
      eventID &&
        dispatch(
          eventActions.flushUpdate({
            attendees: filteredData,
            sharable_groups: existingMembers,
            updated_by: userDetail.userID,
          })
        );
    }

    setIsChecked(isCheckedBoolValue);
    setEditMode(true);
  };

  const shouldDisplaySecondMenuBar = displaySecondaryMenuBar(selectedEvent);

  useEffect(() => {
    dispatch(profileActions.getProfileDetails());
    if (eventID) {
      dispatch(eventActions.getSelectedEvent({ eventID: eventID }));
      dispatch(eventActions.getReportsForSelectedEvent({ eventID: eventID }));
      dispatch(eventActions.getVolunteeringActivities({ eventID: eventID }));
    }
    // eslint-disable-next-line
  }, [eventID]);

  useEffect(() => {
    if (!loadingProfileDetails && !loadingSelectevent && Object.values(selectedEvent).length > 0) {
      const userDetailsDraft = { ...BLANK_USER_DETAILS };
      userDetailsDraft.userID = profileDetails.id;
      userDetailsDraft.email = profileDetails.email;
      userDetailsDraft.userFullName = profileDetails.full_name;

      const title = selectedEvent?.title;
      const imageUrl = selectedEvent?.image_url;
      const userHasRsvp = selectedEvent?.attendees?.includes(profileDetails.id);
      const userIsMember = selectedEvent?.sharable_groups?.includes(profileDetails.id);
      const totalAllocatedMembers = selectedEvent?.required_total_man_hours;
      const requiredSkills = selectedEvent?.skills_required;
      const sharableGroups = selectedEvent?.sharable_groups;
      const attendees = selectedEvent.attendees;
      const location = {
        boundingbox: selectedEvent.boundingbox,
        class: selectedEvent.class,
        display_name: selectedEvent.display_name,
        importance: selectedEvent.importance,
        lat: selectedEvent.lat,
        licence: selectedEvent.licence,
        lon: selectedEvent.lon,
        osm_id: selectedEvent.osm_id,
        osm_type: selectedEvent.osm_type,
        place_id: selectedEvent.place_id,
        powered_by: selectedEvent.powered_by,
        type: selectedEvent.type,
      };
      userDetailsDraft.userIsMember = userIsMember;
      userDetailsDraft.requiredSkills = requiredSkills;
      userDetailsDraft.sharable_groups = sharableGroups;
      userDetailsDraft.attendees = attendees;
      userDetailsDraft.title = title;
      userDetailsDraft.totalAllocatedMembers = totalAllocatedMembers;
      userDetailsDraft.location = location;
      setIsChecked(userHasRsvp);
      if (uploadedImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          setSelectedImage(base64String);
        };
        reader.readAsDataURL(selectedImage);
      } else {
        setSelectedImage(imageUrl);
      }
      setUserDetail(userDetailsDraft);
    }
    setEditMode(false);
    // we don't need image on the render cycle ( uploadedImage || selectedImage )
    // eslint-disable-next-line
  }, [
    loadingProfileDetails,
    loadingSelectevent,
    profileDetails,
    editMode,
    profileDetails.full_name,
    selectedEvent,
    profileDetails.email,
    profileDetails.id,
  ]);

  if (!eventID && loadingSelectevent) {
    return (
      <div className={classes.spinnerContainer}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Container maxWidth="lg" className={classes.container}>
      {shouldDisplaySecondMenuBar && <SecondaryAppBar />}
      <Grid container>
        <Grid item xs={12}>
          <EventDetailsCard
            disabled={shouldDisplaySecondMenuBar}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            userDetail={userDetail}
            eventID={eventID}
            selectedEvent={selectedEvent}
            reports={reports}
            onLeave={() => {
              handleLeave(userDetail.sharable_groups, userDetail.userID);
            }}
            onJoin={() => {
              handleJoin(userDetail.userID);
              setEditMode(true);
              setUserDetail((prev) => ({
                ...prev,
                userIsMember: true,
                sharable_groups: [userDetail.userID],
              }));
            }}
          />
        </Grid>
        <Grid item xs={12} data-tour="11">
          <EventDetailsDrawerComponent
            eventID={eventID}
            selectedEvent={selectedEvent}
            volunteeringActivities={volunteeringActivities}
            disabled={shouldDisplaySecondMenuBar}
            userDetail={userDetail}
            handleRSVP={handleRSVP}
            isChecked={isChecked}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDetailPage;
