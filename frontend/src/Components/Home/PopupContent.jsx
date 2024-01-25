import React, { useState } from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { Box, Tooltip, Typography } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '15rem',
  },
  root: {
    minWidth: 200,
    padding: 0,
    margin: '1rem 0rem 0rem 0rem',
    '& .MuiButton-text': {
      padding: 0,
      margin: 0,
      fontSize: theme.spacing(1),
    },
  },
  text: {
    fontSize: theme.spacing(1.2),
    fontWeight: 'lighter',
    color: theme.palette.text.secondary,
    cursor: 'pointer',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBtnContainer: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row-reverse',
    marginLeft: 'auto',
  },
  textDetailsContainer: {},
}));

export default function PopupContent({ selectedEvent }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const {
    id: projectID,
    title: event,
    display_name: location,
    project_type: type,
    updated_at: changed,
    created_at,
  } = selectedEvent;

  const navigateToEvent = (projectID) => {
    const url = window.location.href;
    const newUrl = `${url}${projectID}`;
    window.location.href = newUrl;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Box className={classes.container}>
        <Tooltip title="Double click or tap to navigate to the selected event">
          <Box
            className={classes.textDetailsContainer}
            onDoubleClick={() => navigateToEvent(projectID)}
            onTouchStart={() => navigateToEvent(projectID)}
          >
            <Typography className={classes.text}>{`Title : ${event}`}</Typography>
            <Typography className={classes.text}>{`Event Type : ${type}`}</Typography>
            <Typography className={classes.text}>{`Location : ${location}`}</Typography>
            <div className={classes.row}>
              <Typography className={classes.text}>{`Last updated : ${dayjs(changed).fromNow()}`}</Typography>
              <Typography className={classes.text}>{`Active Since: ${dayjs(created_at).fromNow()}`}</Typography>
            </div>
          </Box>
        </Tooltip>
      </Box>
      <MobileStepper
        variant="dots"
        steps={1}
        position="static"
        activeStep={activeStep}
        className={classes.root}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 0}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </>
  );
}
