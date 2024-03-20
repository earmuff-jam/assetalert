import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames';
import ExpenseTab from './ExpenseTab';
import MapComponentFn from '../Map/Map';
import Host from '../HostComponent/Host';
import PieChart from '../PieChart/PieChart';
import { makeStyles } from '@material-ui/core/styles';
import CommunityMsg from '../ChatComponent/CommunityMsg';
import { NAVIGATION_TABS, isEditingAllowed } from './constants';
import RSVPRegistration from '../RsvpComponent/RSVPRegistration';
import ImpactTracking from '../ImpactTrackingDetails/ImpactTracking';
import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.secondary.main,
  },
  listItem: {
    borderRadius: theme.spacing(0.25),
    padding: theme.spacing(0.25),
    gap: theme.spacing(1),
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  profileVariation: {
    fontSize: '0.925rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  smallVariant: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  mapRoot: {
    width: '100%',
  },
  allowSpace: {
    gap: theme.spacing(2),
  },
  underline: {
    borderBottom: `${theme.spacing(0.02)}rem ${theme.palette.warning.main} solid`,
  },
  selected: {
    color: theme.palette.warning.dark,
  },
}));

export const NavigationTabBar = ({
  data,
  value,
  handleChange,
  applyProfileVariation = true,
  extraRootStyle = '',
  iconStyle = '',
}) => {
  const classes = useStyles();

  return (
    <Box className={[classes.rowContainer, extraRootStyle].join(' ')}>
      {data.map((v, index) => (
        <List key={index}>
          <Tooltip title={v.subtitle || ''}>
            <ListItem button className={classes.listItem} onClick={() => handleChange(index)} disableGutters>
              {v.icon ? (
                <ListItemIcon className={classNames({ [classes.selected]: value === index }, iconStyle)}>
                  {v.icon}
                </ListItemIcon>
              ) : null}
              <ListItemText
                classes={{ primary: classNames({ [classes.profileVariation]: applyProfileVariation }) }}
                className={classNames({ [classes.underline]: value === index })}
              >
                {v.displayName}
              </ListItemText>
            </ListItem>
          </Tooltip>
        </List>
      ))}
    </Box>
  );
};

NavigationTabBar.defaultProps = {
  data: [],
  value: '',
  handleChange: () => {},
  applyProfileVariation: true,
  extraRootStyle: '',
  iconStyle: '',
};

NavigationTabBar.propTypes = {
  data: PropTypes.array,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  applyProfileVariation: PropTypes.bool,
  extraRootStyle: PropTypes.string,
  iconStyle: PropTypes.string,
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
  const editingAllowed = isEditingAllowed(disabled, userDetail);

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
            <Box className={classNames(classes.rowContainer, classes.smallVariant, classes.allowSpace)}>
              <ExpenseTab eventID={eventID} userID={userDetail.userID} editingAllowed={editingAllowed} />
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Box className={classNames(classes.rowContainer, classes.smallVariant, classes.allowSpace)}>
              <Box>
                <Paper>
                  <Host selectedEvent={selectedEvent} />
                </Paper>
              </Box>
              <Box className={classes.mapRoot}>
                <MapComponentFn shrinkSize={true} disabled={disabled} locationDetails={userDetail.location} />
              </Box>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <NavigationTabBar handleChange={handleChange} value={value} data={NAVIGATION_TABS} />
      {displaySelection(value)}
    </div>
  );
};

EventDetailsDrawerComponent.defaultProps = {
  eventID: '',
  volunteeringActivities: [],
  userDetail: {},
  handleRSVP: () => {},
  isChecked: false,
  disabled: true,
  selectedEvent: {},
};

EventDetailsDrawerComponent.propTypes = {
  eventID: PropTypes.string,
  volunteeringActivities: PropTypes.array,
  userDetail: PropTypes.object,
  handleRSVP: PropTypes.func,
  isChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  selectedEvent: PropTypes.object,
};

export default EventDetailsDrawerComponent;
