import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextComponent from '../../stories/TextComponent/TextComponent';
import { DeleteRounded, EditRounded, ExpandMoreRounded } from '@material-ui/icons';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, IconButton, Typography } from '@material-ui/core';

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
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  emptyGap: {
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
  extraGap: {
    gap: theme.spacing(1),
  },
}));

const NotesDetails = () => {
  const classes = useStyles();

  const notesData = [
    {
      id: 1,
      category: 'Recently added notes',
      totalNotes: 2,
      details: [
        {
          id: 1,
          note_title: 'Plants code from home depot',
          note_description: 'Bought a coupon code to use while buying plants at Lowes or Home Depot',
          updated_by: 'xxArthr',
          updated_at: '',
        },
        {
          id: 1,
          note_title: 'Planted Magnolia according to sketch and diagram.',
          note_description:
            'Had an issue where the plant magnolia was not getting proper sunlight and therefore we had to move it to a better place. Thank god my wife sketched the location out and we planted it. Now we want to track a watering schedule.',
          updated_by: 'xxArthr',
          updated_at: '',
        },
      ],
    },
    {
      id: 2,
      category: 'Last Week',
      totalNotes: 32,
      details: [
        {
          id: 1,
          note_title: 'Plants code from home depot',
          note_description: 'Bought a coupon code to use while buying plants at Lowes or Home Depot',
          updated_by: 'xxArthr',
          updated_at: '',
        },
        {
          id: 1,
          note_title: 'Planted Magnolia according to sketch and diagram.',
          note_description:
            'Had an issue where the plant magnolia was not getting proper sunlight and therefore we had to move it to a better place. Thank god my wife sketched the location out and we planted it. Now we want to track a watering schedule.',
          updated_by: 'xxArthr',
          updated_at: '',
        },
      ],
    },
  ];

  return (
    <div className={classes.root}>
      {notesData.map((v) => (
        <Accordion elevation={0} className={classes.colorVariant}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1a-content" id="panel1a-header">
            <Box className={[classes.rowContainer, classes.extraGap].join(' ')}>
              <TextComponent textStyle={classes.heading} value={v.category} loading={false} />
              <Chip label={v.totalNotes} size="small" />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box className={classes.contentContainer}>
              {v.details.map((note) => (
                <Box className={classes.content}>
                  <Box className={classes.rowContainer}>
                    <TextComponent
                      value={note.note_title}
                      gutterBottom={true}
                      loading={false}
                      textStyle={[classes.text, classes.textVariant].join(' ')}
                    />
                    <Box className={classes.emptyGap}></Box>
                    <IconButton>
                      <DeleteRounded />
                    </IconButton>
                    <IconButton>
                      <EditRounded />
                    </IconButton>
                  </Box>
                  <Box>
                    <TextComponent textStyle={classes.heading} value={note.note_description} loading={false} />
                    <TextComponent textStyle={classes.heading} value={note.updated_by} loading={false} />
                    <TextComponent textStyle={classes.heading} value={note.updated_at} loading={false} />
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

export default NotesDetails;
