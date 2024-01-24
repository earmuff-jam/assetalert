import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'lighter',
    fontSize: '2.0rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
  },
  errorButton: {
    color: theme.palette.error.dark,
  },
}));

const Title = (props) => {
  const classes = useStyles();
  const { children, className, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <div className={classes.container}>
        <Typography className={classes.text}>{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose} className={classes.errorButton}>
            <CloseRoundedIcon />
          </IconButton>
        ) : null}
      </div>
    </MuiDialogTitle>
  );
};

export default Title;
