import React, { useEffect, useState } from 'react';
import TextComponent from '../../stories/TextComponent/TextComponent';
import { Box, Dialog, makeStyles } from '@material-ui/core';
import ButtonComponent from '../../stories/Button/ButtonComponent';
import { AddRounded, ImportExportRounded } from '@material-ui/icons';
import NotesDetails from './NotesDetails';
import { useDispatch } from 'react-redux';
import { profileActions } from '../../Containers/Profile/profileSlice';
import Title from '../DialogComponent/Title';
import AddNote from './AddNote';

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  emptyGap: {
    flexGrow: 1,
  },
  text: {
    fontSize: '1.125rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const Notes = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const handleEditMode = () => setEditMode(!editMode);

  useEffect(() => {
    dispatch(profileActions.getUserNotes());
  }, []);

  return (
    <Box>
      <Box className={classes.rowContainer}>
        <TextComponent
          value={'Rough Notes'}
          gutterBottom={true}
          loading={false}
          textStyle={classes.text}
        />
        <Box className={classes.emptyGap}></Box>
        <ButtonComponent
          buttonVariant={'text'}
          disabled={true}
          icon={<ImportExportRounded />}
          showIcon={true}
          text={'Sort'}
          onClick={() => {}}
        />
        <ButtonComponent
          buttonVariant={'text'}
          icon={<AddRounded />}
          showIcon={true}
          text={'Add new notes'}
          onClick={handleEditMode}
        />
        {editMode && (
          <Dialog open={editMode} width={'md'} fullWidth={true}>
            <Title onClose={() => setEditMode(false)}>Add New Note</Title>
            <AddNote editMode={editMode} setEditMode={setEditMode} />
          </Dialog>
        )}
      </Box>
      <Box>
        <NotesDetails />
      </Box>
    </Box>
  );
};

export default Notes;
