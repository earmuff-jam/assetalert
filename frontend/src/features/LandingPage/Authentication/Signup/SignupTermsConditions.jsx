import { Link, Stack, Typography } from '@mui/material';

export default function SignupTermsConditions() {
  return (
    <Stack direction="row" spacing="0.2rem">
      <Typography variant="caption">Read about our</Typography>
      <Link
        variant="caption"
        target="_blank"
        rel="noopener noreferrer"
        href={`${encodeURI('https://github.com/earmuff-jam/mashed/blob/main/PRIVACY_POLICY.md')}`}
      >
        terms and conditions
      </Link>
    </Stack>
  );
}
