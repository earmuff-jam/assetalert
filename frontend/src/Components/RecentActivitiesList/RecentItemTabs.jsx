import PropTypes from 'prop-types';
import EmptyComponent from '../../util/EmptyComponent';
import { Box, Tooltip, makeStyles } from '@material-ui/core';
import LoadingSkeleton from '../../util/LoadingSkeleton';
import RecentTrophyDot from './RecentTrophyDot';

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  centerRowAlign: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    fontWeight: 'bold',
    padding: theme.spacing(1),
    gap: 2,
    alignItems: 'end',
  },
}));

const RecentItemTabs = ({ rowData, loading }) => {
  const classes = useStyles();

  if (rowData?.length <= 0) {
    return <EmptyComponent subtitle="Create or volunteer events" />;
  }

  return (
    <Box className={classes.rowContainer}>
      {rowData?.map((v, index) => (
        <Tooltip key={index} title={`${v.count || 0} ${v.tooltipContent}`} placement={v.tooltipPlacement}>
          <Box className={classes.centerRowAlign}>
            {v.icon}
            <Box>
              {loading ? <LoadingSkeleton width={'1rem'} height={'1rem'} /> : <RecentTrophyDot count={v.count} />}
            </Box>
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

RecentItemTabs.defaultProps = {
  rowData: [],
  loading: false,
};

RecentItemTabs.propTypes = {
  rowData: PropTypes.array,
  loading: PropTypes.bool,
};

export default RecentItemTabs;
