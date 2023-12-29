import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core';
import Host from '../HostComponent/Host';
import CommunityMsg from '../ChatComponent/CommunityMsg';
import ImpactTracking from '../ImpactTrackingDetails/ImpactTracking';
import MapComponentFn from '../Map/Map';
import RSVPRegistration from '../RsvpComponent/RSVPRegistration';
import classNames from 'classnames';
import PieChart from '../PieChart/PieChart';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.secondary.main,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.error.dark}`,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  fontVariation: {
    color: theme.palette.primary.main,
    fontSize: '1.125rem',
    fontFamily: 'Poppins, sans-serif',
    textDecoration: 'none',
  },
  smallVariant: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  center: {
    display: 'flex',
    margin: '0 auto',
  },
  underline: {
    borderBottom: `${theme.spacing(0.02)}rem ${theme.palette.warning.main} solid`,
  },
}));

export const NavigationTabBar = ({ value, handleChange }) => {
  const classes = useStyles();
  const NAVIGATION_TABS = [
    {
      id: 1,
      displayName: 'Volunteering',
      subtitle: 'Volunteering details',
    },
    {
      id: 2,
      displayName: 'Message',
      subtitle: 'Message online members',
    },
    {
      id: 3,
      displayName: 'Details',
      subtitle: 'Event details and settings',
    },
  ];
  return (
    <Box className={classes.rowContainer}>
      {NAVIGATION_TABS.map((v, index) => (
        <List>
          <ListItem button>
            <ListItemText
              onClick={() => handleChange(index)}
              className={classNames(classes.fontVariation, {
                [classes.underline]: value === index,
              })}
            >
              {v.displayName}
            </ListItemText>
          </ListItem>
        </List>
      ))}
    </Box>
  );
};

const EventDetailsDrawerComponent = ({
  eventID,
  selectedEvent,
  volunteeringActivities,
  userDetail,
  handleRSVP,
  isChecked,
  disabled,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const displaySelection = (value) => {
    switch (value) {
      case 0:
        return (
          <Box>
            <Box className={classNames(classes.rowContainer, classes.smallVariant)}>
              <Box>
                <RSVPRegistration
                  disabled={disabled}
                  handleRSVP={handleRSVP}
                  isChecked={userDetail.userHasRsvp || isChecked}
                />
                <ImpactTracking
                  eventID={eventID}
                  userID={userDetail.userID}
                  requiredSkills={userDetail.requiredSkills}
                  disabled={disabled}
                  isChecked={userDetail.userHasRsvp || isChecked}
                />
              </Box>
              <PieChart
                volunteeringActivities={volunteeringActivities}
                totalSkillLimit={userDetail.totalAllocatedMembers || 0}
              />
            </Box>
          </Box>
        );
      case 1:
        return (
          <CommunityMsg
            disabled={disabled}
            userFullName={userDetail.userFullName}
            userID={userDetail.userID}
            eventID={eventID}
            isChecked={isChecked}
          />
        );
      case 2:
        return (
          <Box>
            <Paper>
              <Host selectedEvent={selectedEvent} />
            </Paper>
            <MapComponentFn disabled={disabled} locationDetails={userDetail.location} />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <NavigationTabBar handleChange={handleChange} value={value} />
      {displaySelection(value)}
    </div>
  );
};

export default EventDetailsDrawerComponent;
