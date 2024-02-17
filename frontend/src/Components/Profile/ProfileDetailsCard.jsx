import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Badge, Box, Card, CardContent, IconButton } from '@material-ui/core';
import { CheckRounded, EditRounded, CancelRounded, CallToActionRounded } from '@material-ui/icons';

import classNames from 'classnames';
import UserProfile from '../ViewProfileDetails/UserProfile';
import EditingUserProfile from '../ViewProfileDetails/EditingUserProfile';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  iconButton: {
    padding: theme.spacing(0.6),
  },
  colorVariant: {
    color: theme.palette.primary.main,
  },
  emptyGap: {
    flexGrow: 1,
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
            <IconButton
              disabled={!editMode}
              onClick={handleSubmit}
              className={classNames(classes.iconButton, { [classes.colorVariant]: editMode })}
            >
              <CheckRounded />
            </IconButton>
            <IconButton onClick={handleToggle} className={classes.iconButton}>
              {!editMode ? <EditRounded /> : <CancelRounded />}
            </IconButton>
            <IconButton onClick={handleClickNotificationBar} className={classes.iconButton}>
              <Badge
                badgeContent={notifications.map((v) => !v.is_viewed).filter(Boolean).length}
                variant="dot"
                color="error"
                overlap="rectangular"
              >
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
