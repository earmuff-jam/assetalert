import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const TextComponent = ({ textStyle, loading, gutterBottom, value }) => {
  if (loading) {
    return <SkeletonLoader width={11} height={5} />;
  }

  return (
    <Typography className={textStyle} gutterBottom={gutterBottom}>
      {value}
    </Typography>
  );
};

TextComponent.defaultProps = {
  textStyle: {},
  loading: true,
  gutterBottom: true,
  value: 'John Doe',
};

TextComponent.propTypes = {
  textStyle: PropTypes.object,
  gutterBottom: PropTypes.bool,
  loading: PropTypes.bool,
  value: PropTypes.string,
};

export default TextComponent;
