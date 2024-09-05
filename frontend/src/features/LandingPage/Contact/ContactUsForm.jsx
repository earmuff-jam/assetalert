import { Button, Stack, TextField } from '@mui/material';

export const ContactUsForm = () => {
  return (
    <Stack alignItems="center" spacing="1rem">
      <Stack spacing="1rem" width="50%">
        <TextField id="email" label="Email Address" />
        <TextField id="first_name" label="First Name" />
        <TextField id="last_name" label="Last Name" />
        <TextField id="message" label="Message" multiline rows={4} />
      </Stack>
      <Button variant='outlined'>Submit</Button>
    </Stack>
  );
};
