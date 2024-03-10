import Title from '../Title/Title';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.black,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: '1.125rem',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  privacyLink: {
    color: theme.palette.primary.main,
    fontSize: '1.125rem',
    fontFamily: 'Poppins, sans-serif',
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
          Privacy
        </a>
      </Typography>
    </footer>
  );
};

export default AuthFooter;
