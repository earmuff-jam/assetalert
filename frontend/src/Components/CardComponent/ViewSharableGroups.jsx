import { eventActions } from '../../Containers/Event/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Chip, TextField, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { profileActions } from '../../Containers/Profile/profileSlice';
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

const ViewSharableGroups = ({ selectedEvent, setEditSharableGroups }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [sharableGroups, setSharableGroups] = useState([]);

  const { loading, eventSharedWithUsers } = useSelector((state) => state.event);
  const { loading: profileDetailsLoading, profiles } = useSelector((state) => state.profile);

  const handleUpdateSharableGroups = () => {
    // flushUpdate is used to only update the reducer
    // fn homeActions.updateEvent will try to save in db
    const userID = localStorage.getItem('userID');
    const updatedUsers = sharableGroups.map((v) => v.id);
    dispatch(
      eventActions.flushUpdate({
        ...selectedEvent,
        sharable_groups: [...updatedUsers],
        updated_by: userID,
      })
    );
    dispatch(
      homeActions.updateEvent({
        ...selectedEvent,
        userID: userID,
        sharable_groups: [...updatedUsers],
        updated_by: userID,
      })
    );
    setEditSharableGroups(false);
  };

  useEffect(() => {
    dispatch(profileActions.getProfileList());
    dispatch(eventActions.getEventSharedWithUsers({ eventID: selectedEvent.id }));
    // eslint-disable-next-line
  }, [selectedEvent]);

  useEffect(() => {
    if (!loading) {
      setSharableGroups(eventSharedWithUsers);
    }
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    if (!profileDetailsLoading) {
      setOptions(profiles);
    }
    // eslint-disable-next-line
  }, [profileDetailsLoading]);

  return (
    <Box className={classes.container}>
      <Autocomplete
        multiple
        options={options.filter(
          (option) => !sharableGroups.some((group) => group.email_address === option.email_address)
        )}
        value={sharableGroups}
        onChange={(event, newValue) => setSharableGroups(newValue)}
        getOptionLabel={(option) => option.email_address}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Share with other people ..."
            placeholder="Currently sharing with ..."
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
          onClick={() => handleUpdateSharableGroups()}
          disabled={sharableGroups.length <= 0}
        />
        <ButtonComponent text={'Cancel'} onClick={() => setEditSharableGroups(false)} />
      </Box>
    </Box>
  );
};

ViewSharableGroups.defaultProps = {
  selectedEvent: {},
  setEditSharableGroups: () => {},
};

ViewSharableGroups.propTypes = {
  selectedEvent: PropTypes.object,
  setEditSharableGroups: PropTypes.func,
};

export default ViewSharableGroups;
