import PropTypes from 'prop-types';
import EmptyComponent from '../../util/EmptyComponent';
import { Box, Tooltip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  centerRowAlign: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
    gap: theme.spacing(1),
  },
}));

const RecentItemTabs = ({ rowData }) => {
  const classes = useStyles();

  if (rowData?.length <= 0) {
    return <EmptyComponent subtitle="Create or volunteer events" />;
  }

  return (
    <Box className={classes.rowContainer}>
      {rowData?.map((v, index) => (
        <Tooltip key={index} title={v.title} placement={v.tooltipPlacement}>
          <Box className={classes.centerRowAlign}>
            {v.icon}
            <span>{v.count}</span>
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

RecentItemTabs.defaultProps = {
  rowData: [],
};

RecentItemTabs.propTypes = {
  rowData: PropTypes.array,
};

export default RecentItemTabs;
