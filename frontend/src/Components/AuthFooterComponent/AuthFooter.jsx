import Title from '../TitleComponent/Title';
import { Stack, Typography } from '@mui/material';

const AuthFooter = () => {
  return (
    <Stack direction="row" justifyContent="space-around">
      <Title
        title={`\u00A9 ${new Date().getFullYear()} Mashed. All Rights Reserved.`}
        displaySubtitle={false}
        headingVariant={'caption'}
        titleStyle={{}}
      />
      <Typography>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${encodeURI('https://github.com/earmuff-jam/mashed/blob/main/PRIVACY_POLICY.md')}`}
        >
          Privacy & Legal
        </a>
      </Typography>
    </Stack>
  );
};

export default AuthFooter;
