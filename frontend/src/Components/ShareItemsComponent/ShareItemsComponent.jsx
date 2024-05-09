import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';
import EmptyComponent from '../../util/EmptyComponent';
import { useDispatch, useSelector } from 'react-redux';
import { eventActions } from '../../Containers/Event/eventSlice';
import SelectedRowItemComponent from './SelectedRowItemComponent';
import { SHARED_INVENTORY_ITEMS, SHARE_ITEM_COMPONENT_TABLE_HEADERS } from './constants';
import TableComponent from '../TableComponent/TableComponent';

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const ShareItemsComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { eventID } = useParams();

  const { loading, inventoriesAssociatedWithSelectedEvent } = useSelector((state) => state.event);

  const [options, setOptions] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});

  const handleClick = (item) => {
    setSelectedRow(item);
  };

  useEffect(() => {
    if (
      !loading &&
      Array.isArray(inventoriesAssociatedWithSelectedEvent) &&
      inventoriesAssociatedWithSelectedEvent.length > 0
    ) {
      setOptions(inventoriesAssociatedWithSelectedEvent);
    }
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    dispatch(eventActions.getAllInventoriesAssociatedWithEvent({ eventID: eventID }));
    // eslint-disable-next-line
  }, []);

  if (options.length <= 0) {
    return <EmptyComponent subtitle={'No personal inventories associated with this event...'} />;
  }

  return (
    <Box className={classes.rowContainer}>
      <Box className={classes.sideContainer}>
        <TableComponent columns={SHARE_ITEM_COMPONENT_TABLE_HEADERS} options={options} handleClick={handleClick} />
      </Box>
      <Box className={classes.remainingContainer}>
        <SelectedRowItemComponent selectedRow={selectedRow} columns={SHARED_INVENTORY_ITEMS} />
      </Box>
    </Box>
  );
};

export default ShareItemsComponent;
