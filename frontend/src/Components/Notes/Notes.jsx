import React from 'react';
import TextComponent from '../../stories/TextComponent/TextComponent';
import { Box, makeStyles } from '@material-ui/core';
import ButtonComponent from '../../stories/Button/ButtonComponent';
import { AddRounded, SortRounded } from '@material-ui/icons';
import NotesDetails from './NotesDetails';

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
  return (
    <Box>
      <Box className={classes.rowContainer}>
        <TextComponent value={'Rough Notes'} gutterBottom={true} loading={false} textStyle={classes.text} />
        <Box className={classes.emptyGap}></Box>
        <ButtonComponent
          buttonVariant={'text'}
          icon={<SortRounded />}
          showIcon={true}
          text={'Sort'}
          onClick={() => {}}
        />
        <ButtonComponent
          buttonVariant={'text'}
          icon={<AddRounded />}
          showIcon={true}
          text={'Add new notes'}
          onClick={() => {}}
        />
      </Box>
      <Box>
        <NotesDetails />
      </Box>
    </Box>
  );
};

export default Notes;
