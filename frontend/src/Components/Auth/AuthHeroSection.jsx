import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import { LibraryBooksRounded, TrackChangesRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: '1.2rem',
    fontWeight: 'lighter',
    letterSpacing: '0.0125rem',
    marginBottom: theme.spacing(2),
  },
  container: {
    padding: theme.spacing(3),
    backgroundColor: '#F3F4F6',
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    marginTop: theme.spacing(3),
  },
  header: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    letterSpacing: '0.0125rem',
    fontFamily: 'Poppins, sans-serif',
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
}));

const AuthHeroSection = () => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.container}>
        <Typography variant="h6" className={classes.header}>
          <LibraryBooksRounded />
          Learn what you can offer.
        </Typography>
        <ul>
          <Typography className={classes.text}>
            Contribute your skills and time to make a positive impact on your community.
          </Typography>
          <Typography className={classes.text}>
            Volunteer for local events, help those in need, and be a part of meaningful initiatives.
          </Typography>
        </ul>

        <Typography variant="h6" className={classes.header}>
          <TrackChangesRounded />
          Learn how to navigate.
        </Typography>
        <ul>
          <Typography className={classes.text}>
            Sign up or log in to access features and events tailored to your interests.
          </Typography>
          <Typography className={classes.text}>
            Browse available projects, find opportunities that match your skills, and contribute to causes you care
            about.
          </Typography>
        </ul>
      </Paper>
    </>
  );
};

export default AuthHeroSection;
