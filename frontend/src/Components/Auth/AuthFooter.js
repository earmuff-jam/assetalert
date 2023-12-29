import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.black,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
      <Typography className={classes.text}>&copy; {new Date().getFullYear()} Mashed. All Rights Reserved.</Typography>
      <Typography className={classes.text}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${encodeURI('https://github.com/mohit2530/communityCare/blob/master/LICENSE.md')}`}
          className={classes.privacyLink}
        >
          Privacy
        </a>
      </Typography>
    </footer>
  );
};

export default AuthFooter;
