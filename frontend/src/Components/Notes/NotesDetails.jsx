import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Typography } from '@material-ui/core';
import { DeleteRounded, EditRounded, ExpandMoreRounded } from '@material-ui/icons';
import TextComponent from '../../stories/TextComponent/TextComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  content: {
    padding: theme.spacing(1),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
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
}));

const NotesDetails = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography className={classes.heading}>Recently added notes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={classes.content}>
            <Box className={classes.rowContainer}>
              <TextComponent
                value={'Plants code from home depot - last edited 2 hours ago by test@gmail.com'}
                gutterBottom={true}
                loading={false}
                textStyle={classes.text}
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
              <Typography>
                Bought a coupon code to use while buying plants at Lowes or Home Depot. - last edited 2 hours ago by
                test@gmail.com
              </Typography>
              <Typography>
                Bought a coupon code to use while buying plants at Lowes or Home Depot. - last edited 2 hours ago by
                test@gmail.com
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel2a-content" id="panel2a-header">
          <Typography className={classes.heading}>Last week</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography>
              Bought a coupon code to use while buying plants at Lowes or Home Depot. - last edited 2 hours ago by
              test@gmail.com
            </Typography>
            <Typography>
              Bought a coupon code to use while buying plants at Lowes or Home Depot. - last edited 2 hours ago by
              test@gmail.com
            </Typography>
            <Typography>
              Bought a coupon code to use while buying plants at Lowes or Home Depot. - last edited 2 hours ago by
              test@gmail.com
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary expandIcon={<ExpandMoreRounded />} aria-controls="panel3a-content" id="panel3a-header">
          <Typography className={classes.heading}>Last Month</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
};

export default NotesDetails;
