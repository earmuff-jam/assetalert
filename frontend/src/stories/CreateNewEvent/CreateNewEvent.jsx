import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../../Components/DialogComponent/Title';
import ButtonComponent from '../Button/ButtonComponent';
import { Box, Dialog, Divider, Typography } from '@material-ui/core';
import AddCommunityEvent from '../../Components/CommunityEvent/AddCommunityEvent';
import { AddCircleRounded, ContactMailRounded, ViewListRounded } from '@material-ui/icons';
import ChipComponent from '../Chip/ChipComponent';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  titleText: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  text: {
    fontSize: '0.925rem',
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    padding: theme.spacing(1),
  },
}));

const CreateNewEvent = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.home);

  const [editMode, setEditMode] = useState(false);
  const handleClick = () => setEditMode(!editMode);

  return (
    <Box className={classes.container} data-tour="1">
      <Typography className={classes.titleText} gutterBottom>
        {username?.length > 0 ? `Welcome ${username} !` : 'Welcome User !'}
      </Typography>
      <Typography className={classes.text} gutterBottom>
        Create new event or volunteer for any existing event. Monitor inventory and track expense reports. View all
        items associated with selected event or even maintain your own personal inventory list.
      </Typography>
      <Divider />
      <Box className={classes.chipContainer}>
        <ChipComponent
          variant={'outlined'}
          icon={<ViewListRounded />}
          label={'Inventory'}
          onClick={() => navigate('/profile')}
        />
      </Box>
      <Typography className={classes.text} gutterBottom>
        Browse other events around you to volunteer, or jump right in to create new event. Add personal inventories for
        audit or even explore options to change your profile and avatars.
      </Typography>
      <Box>
        <ButtonComponent
          data-tour="3"
          text={'Create Event'}
          showIcon={true}
          buttonVariant={'text'}
          disableRipple={true}
          icon={<AddCircleRounded />}
          disableFocusRipple={true}
          onClick={handleClick}
          disabled={false}
        />
        <ButtonComponent
          text={'View profile'}
          showIcon={true}
          buttonVariant={'text'}
          disableRipple={true}
          icon={<ContactMailRounded />}
          disableFocusRipple={true}
          onClick={() => navigate('/profile')}
          disabled={false}
        />
      </Box>

      {editMode && (
        <Dialog open={editMode} width={'md'} fullWidth={true}>
          <Title onClose={() => setEditMode(false)}>Add New Event</Title>
          <AddCommunityEvent setEditMode={setEditMode} />
        </Dialog>
      )}
    </Box>
  );
};

export default CreateNewEvent;
