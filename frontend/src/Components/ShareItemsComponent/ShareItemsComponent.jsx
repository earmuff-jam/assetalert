import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import relativeTime from 'dayjs/plugin/relativeTime';
import EmptyComponent from '../../util/EmptyComponent';
import { useDispatch, useSelector } from 'react-redux';
import { eventActions } from '../../Containers/Event/eventSlice';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, makeStyles } from '@material-ui/core';
import SelectedRowItemComponent from './SelectedRowItemComponent';
import { SHARE_ITEM_COMPONENT_TABLE_HEADERS } from './constants';

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
  row: {
    cursor: 'pointer',
  },
}));

dayjs.extend(relativeTime);

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
        <Table>
          <TableHead>
            <TableRow>
              {SHARE_ITEM_COMPONENT_TABLE_HEADERS.map((v) => (
                <TableCell key={v.id} align="center">
                  {v.modifier(v.label)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {options?.map((item, index) => (
              <TableRow hover key={item.id} onClick={() => handleClick(item)} className={classes.row}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">{item?.description || 'N/A'}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">{item.location}</TableCell>
                <TableCell align="center">{dayjs(item.updated_at).fromNow()}</TableCell>
                <TableCell align="center">{item.updater_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box className={classes.remainingContainer}>
        <SelectedRowItemComponent selectedRow={selectedRow} />
      </Box>
    </Box>
  );
};

export default ShareItemsComponent;
