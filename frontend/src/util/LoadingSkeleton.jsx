import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

const useSpookyStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey,
  },
}));

const LoadingSkeleton = ({ width, height }) => {
  const classes = useSpookyStyles();
  return <Skeleton className={classes.root} width={width} height={height} />;
};

LoadingSkeleton.defaultProps = {
  width: 10,
  height: 10,
};

LoadingSkeleton.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default LoadingSkeleton;
