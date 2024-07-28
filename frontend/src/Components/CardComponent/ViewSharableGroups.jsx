import { eventActions } from '../../Containers/Event/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Chip, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Autocomplete } from '@mui/material';
import { useEffect, useState } from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { profileActions } from '../../features/Profile/profileSlice';
import { homeActions } from '../../Containers/Home/homeSlice';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    gap: theme.spacing(2),
  },
  text: {
    color: theme.palette.primary.main,
    fontSize: '0.725rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
  },
}));

const ViewSharableGroups = ({ selectedEvent, setDisplayCollaboratorList }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, collaboratorListForSelectEvent } = useSelector((state) => state.event);
  const { loading: profileDetailsLoading, profiles } = useSelector((state) => state.profile);

  const [collaboratorList, setCollaboratorList] = useState([]);
  const [options, setOptions] = useState([]);

  const handleUpdateAdminList = () => {
    // flushUpdate is used to only update the reducer
    // fn homeActions.updateEvent will try to save in db
    const userID = localStorage.getItem('userID');
    const updatedUsers = collaboratorList.map((v) => v.id);
    dispatch(
      eventActions.flushUpdate({
        ...selectedEvent,
        collaboratorList: [...updatedUsers],
        updated_by: userID,
      })
    );
    dispatch(
      homeActions.updateEvent({
        ...selectedEvent,
        userID: userID,
        collaboratorList: [...updatedUsers],
        updated_by: userID,
      })
    );
    setDisplayCollaboratorList(false);
  };

  useEffect(() => {
    dispatch(profileActions.getProfileList());
    dispatch(eventActions.getCollaboratorListForSelectedEvent({ eventID: selectedEvent.id }));
  }, [selectedEvent]);

  useEffect(() => {
    if (!loading) {
      setCollaboratorList(collaboratorListForSelectEvent);
    }
  }, [loading]);

  useEffect(() => {
    if (!profileDetailsLoading) {
      setOptions(profiles);
    }
  }, [profileDetailsLoading]);

  return (
    <Box className={classes.container}>
      <Autocomplete
        multiple
        options={options.filter(
          (option) => !collaboratorList.some((group) => group.email_address === option.email_address)
        )}
        value={collaboratorList}
        onChange={(event, newValue) => setCollaboratorList(newValue)}
        getOptionLabel={(option) => option.email_address}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Add or update collaborators ..."
            placeholder="Add collaborators..."
          />
        )}
        renderTags={(tagVal, getTagProps) =>
          tagVal.map((option, index) => (
            <Chip
              key={index}
              label={option.email_address}
              {...getTagProps({ index })}
              disabled={selectedEvent.created_by === option.id}
            />
          ))
        }
      />

      <Box className={classes.rowContainer}>
        <ButtonComponent
          text={'Save'}
          onClick={() => handleUpdateAdminList()}
          disabled={collaboratorList.length <= 0}
        />
        <ButtonComponent text={'Cancel'} onClick={() => setDisplayCollaboratorList(false)} />
      </Box>
    </Box>
  );
};

ViewSharableGroups.defaultProps = {
  selectedEvent: {},
  setDisplayCollaboratorList: () => {},
};

ViewSharableGroups.propTypes = {
  selectedEvent: PropTypes.object,
  setDisplayCollaboratorList: PropTypes.func,
};

export default ViewSharableGroups;
