import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  text: {
    fontSize: '1.2rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  subtitle: {
    fontSize: '0.8rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  displayLink: {
    cursor: 'pointer',
  },
}));

/**
 * Empty Component Fn
 *
 * Returns a JSX component to display when data element is non existent.
 *
 * @param {string} subtitle - the text to display underneath the no data element text. Defaults to empty string.
 * @param {boolean} shouldRedirect - the boolean condition to display if the component should redirect.  Defaults to false.
 * @param {string} path - the url path to redirect the current selected user to.  Defaults to empty string.
 */

const EmptyComponent = ({ subtitle = '', shouldRedirect = false, path = '' }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <Box className={classes.textContent}>
      <Typography className={classes.text}>{`Sorry, no matching records found.`}</Typography>
      <div
        onClick={() => {
          shouldRedirect && navigateTo(path);
        }}
      >
        <Typography
          className={classNames(classes.subtitle, { [classes.displayLink]: shouldRedirect })}
        >{`${subtitle}`}</Typography>
      </div>
    </Box>
  );
};

export default EmptyComponent;
