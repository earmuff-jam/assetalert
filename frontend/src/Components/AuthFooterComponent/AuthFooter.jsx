import { Link, Stack, Typography } from '@mui/material';

const AuthFooter = () => {
  return (
    <Stack direction="row" justifyContent="space-around">
      <Typography variant="caption">{`\u00A9 ${new Date().getFullYear()} Asset Tracker. All Rights Reserved.`}</Typography>
      <Link
        variant="caption"
        target="_blank"
        rel="noopener noreferrer"
        href={`${encodeURI('https://github.com/earmuff-jam/mashed/blob/main/PRIVACY_POLICY.md')}`}
      >
        Privacy & Legal
      </Link>
    </Stack>
  );
};

export default AuthFooter;
