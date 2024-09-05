import { Button, Divider, Stack, Typography } from '@mui/material';
import FloatingBarChart from '../../util/Chart/FloatingBarChart';
import Header from './Header';
import Review from './Review/Review';
import Footer from './Footer/Footer';
import StyledAppBar from './StyledAppBar';
import { useState } from 'react';
import SimpleModal from '../common/SimpleModal';
import Signup from './Signup';
import Login from './Login';
import Pricing from './Pricing/Pricing';
import Contact from './Contact/Contact';

const SAMPLE_DATA = [
  { name: 'Entertainment', price: 320.0 },
  { name: 'Tools and equipment', price: 1451.99 },
  { name: 'Supplies', price: 758.99 },
  { name: 'Utilities', price: 420.0 },
  { name: 'Clothing', price: 430.0 },
  { name: 'Maintenance', price: 200.0 },
  { name: 'Education', price: 1341.59 },
  { name: 'Misc', price: 300.0 },
];

const COLORS = [
  'rgba(255, 99, 132, 0.6)', // Red
  'rgba(54, 162, 235, 0.6)', // Blue
  'rgba(255, 206, 86, 0.6)', // Yellow
  'rgba(75, 192, 192, 0.6)', // Green
  'rgba(153, 102, 255, 0.6)', // Purple
  'rgba(255, 159, 64, 0.6)', // Orange
  'rgba(255, 99, 132, 0.6)', // Red
  'rgba(54, 162, 235, 0.6)', // Blue
  'rgba(255, 206, 86, 0.6)', // Yellow
];

export default function LandingPage() {
  const [currentForm, setCurrentForm] = useState('');
  const [displayModal, setDisplayModal] = useState(false);

  const openDisplayModal = () => setDisplayModal(true);
  const closeDisplayModal = () => setDisplayModal(false);

  const openSignupModal = () => {
    openDisplayModal();
    setCurrentForm('signup');
  };

  const openLoginModal = () => {
    openDisplayModal();
    setCurrentForm('signin');
  };

  const formattedData = SAMPLE_DATA.map((v, index) => ({
    label: v.name,
    start: index === 0 ? 0 : SAMPLE_DATA[index - 1].price,
    end: v.price,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <>
      <StyledAppBar elevation={0}>
        <Typography>Pricing</Typography>
        <Typography>Contact</Typography>
        <Button onClick={openLoginModal}>Sign in</Button>
        <Button variant="outlined" onClick={openSignupModal}>
          Register
        </Button>
      </StyledAppBar>
      <Header openSignupModal={openSignupModal} />
      <Stack spacing="3rem">
        <FloatingBarChart
          data={formattedData}
          backgroundColor={formattedData.map((d) => d.color)}
          borderColor={formattedData.map((d) => d.color)}
        />
        <Review />
        <Pricing />
        <Contact />
        <Divider />
        <Footer />
      </Stack>
      {displayModal && (
        <SimpleModal
          title={currentForm === 'signin' ? 'Sign In' : 'Sign Up'}
          subtitle={
            currentForm === 'signin'
              ? 'Login to manage your account.'
              : 'Keep an account to keep track of all your inventories.'
          }
          handleClose={closeDisplayModal}
          maxSize="sm"
        >
          {currentForm === 'signup' ? <Signup handleClose={closeDisplayModal} /> : <Login />}
        </SimpleModal>
      )}
    </>
  );
}
