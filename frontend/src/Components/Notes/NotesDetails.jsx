import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';

import { useEffect, useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import makeStyles from '@mui/styles/makeStyles';
import EmptyComponent from '../../util/EmptyComponent';

import LoadingSkeleton from '../../util/LoadingSkeleton';
import TextComponent from '../TextFieldComponent/TextComponent';
import { profileActions } from '../../Containers/Profile/profileSlice';
import { DeleteRounded, EditRounded, ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, IconButton } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(1),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '100vw', // set width to force inside content to be 100%
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  spacer: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  textVariant: {
    fontWeight: 'bold',
  },
  colorVariant: {
    backgroundColor: theme.palette.secondary.main,
  },
  gapVariant: {
    gap: theme.spacing(1),
  },
}));

const NotesDetails = ({ notes, loading, setEditMode, setSelectedNoteID }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);

  const [formattedNotes, setFormattedNotes] = useState([]);

  const removeSelectedNote = (noteID) => {
    const formattedDraftNotes = {
      noteID: noteID,
      updated_by: localStorage.getItem('userID'),
    };
    dispatch(profileActions.removeSelectedNote(formattedDraftNotes));
    enqueueSnackbar('Successfully removed notes.', {
      variant: 'success',
    });
  };

  useEffect(() => {
    if (Array.isArray(notes) && notes.length >= 0) {
      const transformedData = categorizeNotes(notes);
      setFormattedNotes(transformedData);
    }
  }, [loading, notes]);

  if (loading) {
    return <LoadingSkeleton width={`calc(100% - 1rem)`} height={'2rem'} />;
  }

  if (!notes || notes.length === 0) {
    return <EmptyComponent subtitle="Add new notes." />;
  }

  return (
    <div className={classes.root}>
      {formattedNotes.map((v, index) => (
        <Accordion key={index} elevation={0} className={classes.colorVariant}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1a-content" id="panel1a-header">
            <Box className={[classes.rowContainer, classes.gapVariant].join(' ')}>
              <TextComponent textStyle={classes.heading} value={v.category} loading={loading} />
              <Chip label={v.totalNotes} size="small" />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className={classes.contentContainer}>
              {v.details.map((note, index) => (
                <Box key={index} className={classes.content}>
                  <Box className={classes.rowContainer}>
                    <TextComponent
                      value={note.note_title}
                      gutterBottom={true}
                      loading={loading}
                      textStyle={[classes.text, classes.textVariant].join(' ')}
                    />
                    <Box className={classes.spacer}></Box>
                    <IconButton
                      onClick={() => {
                        removeSelectedNote(note.noteID);
                      }}
                      size="large">
                      <DeleteRounded />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setEditMode(true);
                        setSelectedNoteID(note.noteID);
                      }}
                      size="large">
                      <EditRounded />
                    </IconButton>
                  </Box>
                  <Box>
                    <TextComponent textStyle={classes.heading} value={note.note_description} loading={loading} />
                    <Box className={classes.rowContainer}>
                      <TextComponent textStyle={classes.heading} value={note.updator} loading={loading} />
                      <Box className={classes.spacer}></Box>
                      <TextComponent
                        textStyle={classes.heading}
                        value={dayjs(note.updated_at).fromNow()}
                        loading={loading}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

/**
 * Takes array of notes and transforms them into objects categorized by the date and time
 *
 * Recently updated - Up to the last week
 * Last Week - Up to the previous week
 * Last month and beyond - everything else
 *
 * @param {Array} notes
 * @returns {Array} refactored notes
 */
export const categorizeNotes = (notes) => {
  const currentTime = new Date();
  const categorizedNotes = notes.reduce((acc, item) => {
    const updatedTime = new Date(item.updated_at);
    const differenceInDays = Math.floor((currentTime - updatedTime) / (1000 * 3600 * 24));

    let category;
    if (differenceInDays <= 7) {
      category = 'Recently added notes';
    } else if (differenceInDays <= 14) {
      category = 'Last Week';
    } else {
      category = 'Last Month and Beyond';
    }

    if (!acc[category]) {
      acc[category] = {
        id: acc.length + 1,
        category: category,
        totalNotes: 0,
        details: [],
      };
    }

    acc[category].details.push({
      id: acc[category].details.length + 1,
      noteID: item.noteID,
      note_title: item.title,
      note_description: item.description,
      updated_by: item.updated_by,
      updated_at: item.updated_at,
      updator: item.updator,
    });

    acc[category].totalNotes++;
    return acc;
  }, {});

  return Object.values(categorizedNotes);
};

NotesDetails.defaultProps = {
  notes: [],
  loading: false,
  setEditMode: () => {},
  setSelectedNoteID: () => {},
};

NotesDetails.propTypes = {
  setEditMode: PropTypes.func,
  setSelectedNoteID: PropTypes.func,
  notes: PropTypes.array,
  loading: PropTypes.bool,
};

export default NotesDetails;
