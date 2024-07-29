import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import EmptyComponent from '../../util/EmptyComponent';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { profileActions } from '../../features/Profile/profileSlice';

const ViewSharedInventories = ({ rowSelected, handleMenuClose }) => {
  const dispatch = useDispatch();
  const { eventsSharedWithSelectProfile } = useSelector((state) => state.profile);

  const handleClick = (eventID, itemIDs) => {
    handleMenuClose();
    const USER_ID = localStorage.getItem('userID');
    dispatch(
      profileActions.transferItemsToSelectedEvent({
        eventID,
        itemIDs,
        userID: USER_ID,
        value: '1',
        column: 'is_transfer_allocated',
        updated_by: USER_ID,
      })
    );
  };

  return (
    <Box>
      {rowSelected.length <= 0 ? (
        <EmptyComponent subtitle={'Select items to share ...'} />
      ) : eventsSharedWithSelectProfile === null ||
        Array.isArray(eventsSharedWithSelectProfile) ||
        eventsSharedWithSelectProfile.length <= 0 ? (
        <EmptyComponent subtitle={'Create events to share '} shouldRedirect={true} path={'/'} />
      ) : (
        Array.isArray(eventsSharedWithSelectProfile) &&
        eventsSharedWithSelectProfile.map((v) => (
          <List key={v.id}>
            <ListItem button onClick={() => handleClick(v.id, rowSelected)} disabled={v?.isTransferAllocated || false}>
              <ListItemText>{v.title}</ListItemText>
            </ListItem>
          </List>
        ))
      )}
    </Box>
  );
};

ViewSharedInventories.defaultProps = {
  rowSelected: [],
  handleMenuClose: () => {},
};

ViewSharedInventories.propTypes = {
  rowSelected: PropTypes.array,
  handleMenuClose: PropTypes.func,
};
export default ViewSharedInventories;
