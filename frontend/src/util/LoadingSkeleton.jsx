import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

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
  width: '20rem',
  height: '10rem',
};

LoadingSkeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default LoadingSkeleton;
