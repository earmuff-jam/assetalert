import { Facebook, Instagram, LinkedIn, YouTube } from '@mui/icons-material';
import { Box, IconButton, Link, Stack, Typography } from '@mui/material';
import { FooterItemWrapper } from './FooterItemWrapper';
import { EXPLORE_FIELDS, RESOURCE_FIELDS, USE_CASE_FIELDS } from './constants';

export default function Footer() {
  return (
    <Stack direction="row" justifyContent="space-around" paddingBottom="1rem">
      <Stack>
        <Box>
          <Typography variant="h6">Asset Alert</Typography>
          <IconButton>
            <Instagram />
          </IconButton>
          <IconButton>
            <Facebook />
          </IconButton>
          <IconButton>
            <YouTube />
          </IconButton>
          <IconButton>
            <LinkedIn />
          </IconButton>
        </Box>

        <Link
          variant="caption"
          target="_blank"
          rel="noopener noreferrer"
          href={`${encodeURI('https://github.com/earmuff-jam/mashed/blob/main/PRIVACY_POLICY.md')}`}
        >
          Privacy & Legal
        </Link>
        <Typography variant="caption">{`\u00A9 ${new Date().getFullYear()} Asset Alert. All Rights Reserved.`}</Typography>
      </Stack>

      <FooterItemWrapper title="Use Cases">
        {USE_CASE_FIELDS.map((v) => (
          <Typography key={v} variant="caption" sx={{ cursor: 'pointer' }}>
            {v}
          </Typography>
        ))}
      </FooterItemWrapper>

      <FooterItemWrapper title="Explore">
        {EXPLORE_FIELDS.map((v) => (
          <Typography key={v} variant="caption" sx={{ cursor: 'pointer' }}>
            {v}
          </Typography>
        ))}
      </FooterItemWrapper>

      <FooterItemWrapper title="Explore">
        {RESOURCE_FIELDS.map((v) => (
          <Typography key={v} variant="caption" sx={{ cursor: 'pointer' }}>
            {v}
          </Typography>
        ))}
      </FooterItemWrapper>
    </Stack>
  );
}
