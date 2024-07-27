import PropTypes from 'prop-types';
import classNames from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import EditingUserProfile from '../ViewProfileDetails/EditingUserProfile';
import { Badge, Box, Card, CardContent, IconButton } from '@mui/material';
import UserCardTitleWithAvatarComponent from './UserCardTitleWithAvatarComponent';
import { EditRounded, CancelRounded, NotificationImportantRounded } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0),
  },
  columnVariant: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(0),
    },
  },
  buttonColor: {
    color: theme.palette.primary.main,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
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
  iconTilt: {
    // runs tilt-shaking fn for 5seconds at 0.5 rate of speed
    animation: '$tilt-shaking 0.5s 5',
  },
  '@keyframes tilt-shaking': {
    '0%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'rotate(5deg)' },
    '50%': { transform: 'rotate(0deg)' },
    '75%': { transform: 'rotate(-5deg)' },
    '100%': { transform: 'rotate(0deg)' },
  },
}));

const ProfileDetailsCardComponent = ({
  editMode,
  isLoading,
  formFields,
  handleInput,
  handleSubmit,
  handleToggle,
  profileDetails,
  notifications,
  handleClickNotificationBar,
}) => {
  const classes = useStyles();
  const containsUnreadNotifications = notifications.map((v) => !v.is_viewed).filter(Boolean).length;
  const allowEditProfileImg = [profileDetails?.full_name, profileDetails?.username].some((v) => v?.length !== 0);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Box className={classNames(classes.rowContainer, classes.columnVariant)} data-tour="0">
          <UserCardTitleWithAvatarComponent
            formFields={formFields}
            avatarUrl={profileDetails?.avatar_url}
            profileID={profileDetails.id}
            editMode={editMode}
            isLoading={isLoading}
            allowEditProfileImg={allowEditProfileImg}
          />
          <Box className={classes.emptyGap}></Box>
          <Box data-tour="1">
            <ButtonComponent
              disabled={!editMode}
              buttonVariant={'text'}
              onClick={handleSubmit}
              buttonStyles={classes.buttonColor}
              text={'Submit'}
            />
            <IconButton onClick={handleToggle} size="large">{!editMode ? <EditRounded /> : <CancelRounded />}</IconButton>
            <IconButton
              onClick={handleClickNotificationBar}
              disabled={isLoading || notifications.length <= 0}
              className={classes.iconTilt}
              size="large">
              <Badge badgeContent={containsUnreadNotifications} variant="dot" color="error" overlap="rectangular">
                <NotificationImportantRounded color={containsUnreadNotifications ? 'primary' : 'secondary'} />
              </Badge>
            </IconButton>
          </Box>
        </Box>
        {editMode && <EditingUserProfile formFields={formFields} handleInput={handleInput} />}
      </CardContent>
    </Card>
  );
};

ProfileDetailsCardComponent.defaultProps = {
  editMode: false,
  isLoading: false,
  formFields: {},
  handleInput: () => {},
  handleSubmit: () => {},
  handleToggle: () => {},
  profileDetails: {},
  notifications: [],
  handleClickNotificationBar: () => {},
};

ProfileDetailsCardComponent.propTypes = {
  editMode: PropTypes.bool,
  isLoading: PropTypes.bool,
  formFields: PropTypes.object,
  handleInput: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleToggle: PropTypes.func,
  profileDetails: PropTypes.object,
  notifications: PropTypes.array,
  handleClickNotificationBar: PropTypes.func,
};

export default ProfileDetailsCardComponent;
