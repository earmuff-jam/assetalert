import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

import { produce } from 'immer';
import '../../Components/Map/styles.css';
import { eventActions } from './eventSlice';
import { homeActions } from '../Home/homeSlice';

import { profileActions } from '../Profile/profileSlice';
import SecondaryAppBar from '../../stories/AppBar/SecondaryAppBar';
import EventDetailsCard from '../../Components/Event/EventDetailsCard';
import { BLANK_USER_DETAILS, BLANK_USER_ERROR_DETAILS } from './constants';
import EventDetailsDrawerComponent from '../../Components/Event/EventDetailsDrawerComponent';

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  root: {
    maxWidth: `calc(100% - 2rem)`,
    minHeight: '100vh',
    margin: '0 auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1rem auto',
    minHeight: '100vh',
    backgroundColor: theme.palette.secondary.main,
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
  const [isDeactivated, setIsDeactivated] = useState(false); // events are active by default
  const [userDetail, setUserDetail] = useState(BLANK_USER_DETAILS);
  const [userDetailError, setUserDetailError] = useState(BLANK_USER_ERROR_DETAILS);

  const handleUserDetail = (event) => {
    const { name, value } = event.target;
    setUserDetail(
      produce((draft) => {
        draft[name] = value;
      })
    );
    setUserDetailError(
      produce((draft) => {
        if (!value || value.length <= 0 || value.length >= 100) {
          draft[name] = 'Invalid value';
        } else {
          draft[name] = false;
        }
      })
    );
  };

  const displaySecondaryMenuBar = (event) => {
    if (event.deactivated) {
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
      const totalAllocatedMembers = selectedEvent?.max_attendees;
      // filter empty required skills
      const requiredSkills =
        selectedEvent.skills_required.filter((v) => Boolean(v)).length != 0 ? selectedEvent?.skills_required : [];
      const sharableGroups = selectedEvent?.sharable_groups;
      const attendees = selectedEvent.attendees;
      const comments = selectedEvent.comments;
      const id = selectedEvent.id;
      const deactivated = selectedEvent.deactivated;
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
      userDetailsDraft.comments = comments;
      userDetailsDraft.id = id;
      userDetailsDraft.imageUrl = imageUrl;
      setIsDeactivated(deactivated);
      setIsChecked(userHasRsvp);
      setUserDetail(userDetailsDraft);
    }
    setEditMode(false);
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

  return (
    <Box className={classes.root}>
      {shouldDisplaySecondMenuBar && <SecondaryAppBar />}
      <Grid container>
        <Grid item xs={12}>
          <EventDetailsCard
            eventID={eventID}
            reports={reports}
            selectedEvent={selectedEvent}
            userDetail={userDetail}
            isDeactivated={isDeactivated}
            userDetailError={userDetailError}
            setIsDeactivated={setIsDeactivated}
            handleUserDetail={handleUserDetail}
            disabled={shouldDisplaySecondMenuBar}
            isLoading={loadingSelectevent}
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
        <Grid item xs={12} data-tour="9">
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
    </Box>
  );
};

export default EventDetailPage;
