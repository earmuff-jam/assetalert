import { Stack, Typography } from '@mui/material';
import { ContactUsForm } from './ContactUsForm';

export default function Contact() {
  return (
    <>
      <Stack textAlign="center">
        <Typography variant="h1"> Contact Us</Typography>
        <Typography variant="h5" fontWeight="100">
          Didn&apos;t find what you were looking for ?
        </Typography>
      </Stack>
      <ContactUsForm />
    </>
  );
}
