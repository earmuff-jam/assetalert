import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.2),
  },
  dot: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
}));

const RecentTrophyDot = ({ count, color }) => {
  const classes = useStyles();

  // counts above 10 are ignored
  const dots = Array.from({ length: count > 3 ? 3 : count }, (_, index) => (
    <div key={index} className={classes.dot} color={color}></div>
  ));

  return <Box className={classes.container}>{dots}</Box>;
};

RecentTrophyDot.defaultProps = {
  count: 0,
  color: 'primary',
};

RecentTrophyDot.propTypes = {
  count: PropTypes.number,
  color: PropTypes.string,
};

export default RecentTrophyDot;
