import Title from '../TitleComponent/Title';
import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  footer: {
    color: theme.palette.common.black,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
  text: {
    fontSize: '.925rem',
    letterSpacing: '0.0125rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  privacyLink: {
    color: theme.palette.primary.main,
    fontSize: '.925rem',
    textDecoration: 'none',
  },
}));

const AuthFooter = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Title
        title={`\u00A9 ${new Date().getFullYear()} Mashed. All Rights Reserved.`}
        displaySubtitle={false}
        headingVariant={'general'}
        titleStyle={classes.text}
      />

      <Typography className={classes.text}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${encodeURI('https://github.com/earmuff-jam/mashed/blob/main/PRIVACY_POLICY.md')}`}
          className={classes.privacyLink}
        >
          Privacy & Legal
        </a>
      </Typography>
    </footer>
  );
};

export default AuthFooter;
