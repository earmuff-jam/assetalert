import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CheckRounded, EditRounded, CancelRounded, CallToActionRounded } from '@material-ui/icons';
import { Badge, Box, Card, CardContent, IconButton } from '@material-ui/core';
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
  buttonSecondary: {},
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
  formFields,
  handleInput,
  handleSubmit,
  handleToggle,
  profileDetails,
  notifications,
  handleClickNotificationBar,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box className={classes.rowContainer}>
          <UserProfile formFields={formFields} profileDetails={profileDetails} />
          <Box className={classes.emptyGap}></Box>
          <Box>
            <IconButton disabled={!editMode} onClick={handleSubmit} className={classes.buttonSecondary}>
              <CheckRounded />
            </IconButton>
            <IconButton onClick={handleToggle} className={classes.buttonSecondary}>
              {!editMode ? <EditRounded /> : <CancelRounded />}
            </IconButton>
            <IconButton onClick={handleClickNotificationBar} className={classes.buttonSecondary}>
              <Badge badgeContent={notifications?.length || 0} variant="dot" color="error" overlap="rectangular">
                <CallToActionRounded />
              </Badge>
            </IconButton>
          </Box>
        </Box>
        {editMode && <EditingUserProfile formFields={formFields} handleInput={handleInput} />}
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsCard;
