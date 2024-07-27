import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import EmptyComponent from '../../util/EmptyComponent';
import { useDispatch, useSelector } from 'react-redux';
import TableComponent from '../TableComponent/TableComponent';
import { eventActions } from '../../Containers/Event/eventSlice';
import SelectedRowItemComponent from '../../features/InventoryList/SelectedRowItemComponent';
import {
  SELECTED_REPORT_DETAILED_ITEM,
  SHARED_INVENTORY_ITEMS,
  SHARE_ITEM_COMPONENT_TABLE_HEADERS,
  VIEW_REPORT_EVENT_TABLE_HEADERS,
} from './constants';

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: theme.spacing(2),
    },
  },
  remainingContainer: {
    flex: 1,
  },
  sideContainer: {
    flex: 'initial',
    overflow: 'auto',
    width: `calc(100% - 30rem)`,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

const ShareItemsComponent = ({ displayReports }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { eventID } = useParams();

  const { loading, inventoriesAssociatedWithSelectedEvent, reports } = useSelector((state) => state.event);

  const [options, setOptions] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});

  const handleClick = (item) => {
    setSelectedRow(item);
  };

  useEffect(() => {
    if (displayReports) {
      if (!loading && Array.isArray(reports) && reports.length > 0) {
        setOptions(reports);
      }
    } else {
      if (
        !loading &&
        Array.isArray(inventoriesAssociatedWithSelectedEvent) &&
        inventoriesAssociatedWithSelectedEvent.length > 0
      ) {
        setOptions(inventoriesAssociatedWithSelectedEvent);
      }
    }
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    dispatch(eventActions.getAllInventoriesAssociatedWithEvent({ eventID: eventID }));
    // eslint-disable-next-line
  }, []);

  if (options.length <= 0) {
    return (
      <EmptyComponent
        subtitle={
          displayReports ? 'No reports made to display...' : 'No personal inventories associated with this event...'
        }
      />
    );
  }

  return (
    <Box className={classes.rowContainer}>
      <Box className={classes.sideContainer}>
        <TableComponent
          columns={displayReports ? VIEW_REPORT_EVENT_TABLE_HEADERS : SHARE_ITEM_COMPONENT_TABLE_HEADERS}
          options={options}
          handleClick={handleClick}
          displayReports={displayReports}
        />
      </Box>
      <Box className={classes.remainingContainer}>
        <SelectedRowItemComponent
          selectedRow={selectedRow}
          columns={displayReports ? SELECTED_REPORT_DETAILED_ITEM : SHARED_INVENTORY_ITEMS}
        />
      </Box>
    </Box>
  );
};

ShareItemsComponent.defaultProps = {
  displayReports: false,
};

ShareItemsComponent.propTypes = {
  displayReports: PropTypes.bool,
};

export default ShareItemsComponent;
