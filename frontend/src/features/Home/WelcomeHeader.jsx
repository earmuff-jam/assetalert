import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Dialog, Divider, Chip, Typography, Stack } from '@mui/material';
import { AddCircleRounded, ContactMailRounded, NotesRounded } from '@mui/icons-material';
import Title from '../../Components/TitleComponent/Title';
import AddCommunityEvent from '../../Components/CommunityEventComponent/AddCommunityEvent';

const WelcomeHeader = () => {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.home);

  const [editMode, setEditMode] = useState(false);
  const handleClick = () => setEditMode(!editMode);

  const navigateProfileNotes = () => {
    navigate('/profile', { state: { tab: 2 } });
  };

  return (
    <Stack data-tour="1" sx={{ p: 1 }}>
      <Typography gutterBottom variant="h5" noWrap>
        {username?.length > 0 ? `Welcome ${username} !` : 'Welcome User !'}
      </Typography>
      <Typography gutterBottom variant="body2">
        Transform Your Asset Management with Our Advanced Platform. Enjoy precise tracking, streamlined updates, and
        comprehensive expense monitoring to drive strategic growth and efficiency across your organization.
      </Typography>
      <Divider />
      <Box sx={{ my: 1 }}>
        <Chip
          size="small"
          variant={'outlined'}
          icon={<NotesRounded />}
          label={'Notes'}
          onClick={navigateProfileNotes}
        />
      </Box>
      <Typography gutterBottom variant="body2">
        Unlock the full potential of your asset management with our cutting-edge solution. Our platform allows you to
        meticulously track and inventory your most valuable assets, ensuring that every detail is accurate and
        up-to-date. Transform your existing assets into new opportunities for growth and efficiency with our innovative
        tools designed to optimize performance. Effortlessly create and update assets, while seamlessly monitoring
        associated expenses through comprehensive reporting. Gain unparalleled insights with our detailed views of all
        items linked to your assets, empowering you to make strategic decisions with confidence. Elevate your asset
        management strategy and drive success with our advanced solution.
      </Typography>
      <Box data-tour="3">
        <Button startIcon={<AddCircleRounded />} onClick={handleClick}>
          Create Event
        </Button>
        <Button endIcon={<ContactMailRounded />} onClick={() => navigate('/profile')}>
          View Profile
        </Button>
      </Box>
      {editMode && (
        <Dialog open={editMode} width={'md'} fullWidth={true}>
          <Title onClose={() => setEditMode(false)}>Add New Event</Title>
          <AddCommunityEvent setEditMode={setEditMode} />
        </Dialog>
      )}
    </Stack>
  );
};

export default WelcomeHeader;
