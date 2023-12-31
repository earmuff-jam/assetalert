import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  makeStyles,
  Box,
  CircularProgress,
  Dialog,
  ButtonGroup,
  Button,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Typography,
  IconButton,
  Grow,
  Divider,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import { EVENT_TYPES } from './constants';
import SearchAllEvents from './SearchAllEvents';
import DeactivateEvent from './DeactivateEvent';
import AddCommunityEvent from './AddCommunityEvent';
import ReportCommunityEvent from '../CommunityEvent/ReportCommunityEvent';
import { ArrowDropDownCircleRounded } from '@material-ui/icons';
import { profileActions } from '../../Containers/Profile/profileSlice';

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  eventTypesContainer: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    gap: 2,
  },
  buttonGroupContainer: {
    width: '31%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '& button': {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.common.black,
    },
    '& .MuiButtonGroup-contained': {
      boxShadow: 'none',
    },
  },
  text: {
    fontSize: '1.2rem',
    fontWeight: 'lighter',
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
  },
  dialogTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export const Title = (props) => {
  const classes = useStyles();
  const { children, className, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <div className={className}>
        <Typography className={classes.text}>{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
    </MuiDialogTitle>
  );
};

const EditOrganzation = (props) => {
  const { events } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const options = EVENT_TYPES.map((v) => v.displayName);

  const anchorRef = useRef(null);
  const [hidden, setHidden] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [displayItem, setDisplayItem] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = () => {
    const row = options[selectedIndex];
    // 'Report Event'
    if (row === options[1]) {
      dispatch(profileActions.getProfileDetails());
    }
    handleOpen(row);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setHidden(false);
  };

  const handleToggle = () => {
    setHidden((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setHidden(false);
  };

  const handleOpen = (eventToOpen) => {
    setOpenDialog(!openDialog);
    setDisplayItem(eventToOpen);
  };

  // useEffect(() => {
  //   dispatch(fetchExistingUserDetails());
  // }, [dispatch]);

  if (loading) {
    return (
      <Box className={classes.spinnerContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (true) {
    return (
      <Box className={classes.eventTypesContainer}>
        <div className={classes.buttonGroupContainer}>
          <ButtonGroup data-tour="3" variant="contained" ref={anchorRef} aria-label="split button">
            <Button onClick={handleClick}>{options[selectedIndex]}</Button>
            <Button
              size="small"
              aria-controls={hidden ? 'split-button-menu' : undefined}
              aria-expanded={hidden ? 'true' : undefined}
              aria-label="Select options to choose for event types"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              <ArrowDropDownCircleRounded />
            </Button>
          </ButtonGroup>
        </div>

        <Popper open={hidden} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === selectedIndex}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Divider variant="middle" orientation="vertical" flexItem />
        <Dialog open={openDialog} width={'md'} fullWidth={true}>
          {displayItem === 'Add Event' ? (
            <>
              <Title onClose={() => handleOpen(false)} className={classes.dialogTitleContainer}>
                Add New Community Event
              </Title>
              <AddCommunityEvent setOpenDialog={setOpenDialog} />
            </>
          ) : displayItem === 'Report Event' ? (
            <>
              <Title onClose={() => handleOpen(false)} className={classes.dialogTitleContainer}>
                Report Unusual Activity
              </Title>
              <ReportCommunityEvent events={events} onClose={() => handleOpen(false)} />
            </>
          ) : displayItem === 'Deactivate Event' ? (
            <>
              <Title onClose={() => handleOpen(false)} className={classes.dialogTitleContainer}>
                Deactivate Event
              </Title>
              <DeactivateEvent events={events} />
            </>
          ) : null}
        </Dialog>
      </Box>
    );
  }

  return null;
};

export default EditOrganzation;
