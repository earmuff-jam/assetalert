import React from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, Paper, Tooltip, Typography } from '@material-ui/core';

import steps from '../../tour/steps';
import { useTour } from '@reactour/tour';
import { useDispatch } from 'react-redux';

import { authActions } from '../../Containers/Auth/authSlice';
import { LiveHelpRounded, LockOpenRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootPaddingLeft: {
    paddingLeft: theme.spacing(4),
  },
  leftAside: {
    flexGrow: 1,
  },
  fontVariation: {
    color: theme.palette.primary.main,
    fontSize: '1.125rem',
    fontFamily: 'Poppins, sans-serif',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.925rem',
    },
  },
  underline: {
    borderBottom: `${theme.spacing(0.02)}rem ${theme.palette.warning.main} solid`,
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  },
  headerText: {
    fontSize: '2.0rem',
    letterSpacing: '0.125rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.925rem',
    },
  },
  logo: {
    marginLeft: theme.spacing(0.1),
    width: '1rem',
    height: '1rem',
  },
}));

const PrimaryAppBar = (props) => {
  const { selectedID } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { eventID } = useParams();

  const { setIsOpen, setCurrentStep, setSteps } = useTour();

  const NAVIGATION_MENU_BAR = [
    {
      id: 1,
      displayName: 'Home',
      display: true,
      to: '/',
    },
    {
      id: 2,
      displayName: 'Profile',
      display: true,
      to: '/profile',
    },
    {
      id: 3,
      displayName: <LiveHelpRounded />,
      description: 'Help with this page',
      display: selectedID === 1,
    },
    {
      id: 4,
      displayName: <LockOpenRounded />,
      description: 'Logout',
      to: '/out',
    },
  ];

  const handleNavigation = (el) => {
    if (el?.to === '/out') {
      handleLogout();
    } else {
      el?.to ? redirect(el.to) : setTour();
    }
  };

  const redirect = (to) => {
    navigate(to);
  };

  const setTour = () => {
    const stepMap = {
      '/': { start: 0, end: 6 },
      '/about': { start: 6, end: 8 },
      '/profile': { start: 8, end: 10 },
      '/eventID': { start: 10, end: 23 },
    };
    const currentStep = eventID ? stepMap['/eventID'] : stepMap[location.pathname];
    const formattedSteps = steps.slice(currentStep.start, currentStep.end);
    setIsOpen(true);
    setCurrentStep(0);
    setSteps(formattedSteps);
  };

  const handleLogout = () => {
    dispatch(authActions.getLogout());
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.appBar}>
        <Typography variant="h6" className={classes.headerText}>
          Mashed
          <img src={`${import.meta.env.PUBLIC_URL}/mashed-logo.png`} className={classes.logo} alt="company logo" />
        </Typography>
        <Box className={classes.leftAside}></Box>
        {NAVIGATION_MENU_BAR.map((el) => (
          <List key={el.id} component="nav" aria-labelledby="nested-list-subheader">
            <ListItem button onClick={() => handleNavigation(el)}>
              <Tooltip title={el.description || el.displayName}>
                <Typography
                  className={classNames(classes.fontVariation, {
                    [classes.underline]: el.id === selectedID,
                  })}
                >
                  {el.displayName}
                </Typography>
              </Tooltip>
            </ListItem>
          </List>
        ))}
      </Paper>
    </div>
  );
};

export default PrimaryAppBar;
