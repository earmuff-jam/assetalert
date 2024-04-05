import PropTypes from 'prop-types';
import classNames from 'classnames';
import steps from '../../tour/steps';
import { useTour } from '@reactour/tour';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core';
import { authActions } from '../../Containers/Auth/authSlice';
import AppBarNavListItem from '../NavListItem/AppBarNavListItem';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  AssignmentIndRounded,
  BarChartRounded,
  HomeRounded,
  LiveHelpRounded,
  LockOpenRounded,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(0),
    backgroundColor: theme.palette.common.white,
  },
  headerText: {
    fontSize: '2.0rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
  },
  text: {
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
    fontSize: '0.925rem',
    textTransform: 'uppercase',
  },
  iconStyle: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  underline: {
    borderBottom: `${theme.spacing(0.02)}rem ${theme.palette.warning.main} solid`,
  },
  logo: {
    display: 'flex',
    alignSelf: 'end',
    width: '1rem',
    height: '1rem',
    paddingBottom: '0.3rem',
    color: theme.palette.primary.main,
  },
  leftAside: {
    flexGrow: 1,
  },
  navListComponent: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  primaryStyle: {
    color: theme.palette.primary.dark,
  },
}));

const PrimaryAppBar = ({ selectedID, title, titleVariant, elevation }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { eventID } = useParams();

  const { setIsOpen, setCurrentStep, setSteps } = useTour();

  const NAVIGATION_MENU_BAR = [
    {
      id: 1,
      displayName: 'HOME',
      description: 'Home Page',
      icon: <HomeRounded />,
      display: true,
      to: '/',
    },
    {
      id: 2,
      displayName: 'PROFILE',
      description: 'Profile Page',
      icon: <AssignmentIndRounded />,
      display: true,
      to: '/profile',
    },
    {
      id: 3,
      displayName: 'HELP',
      description: 'Help with this page',
      icon: <LiveHelpRounded />,
      display: selectedID === 1,
    },
    {
      id: 4,
      displayName: 'LOGOFF',
      description: 'Logout',
      icon: <LockOpenRounded />,
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
      '/profile': { start: 8, end: 12 },
      '/eventID': { start: 12, end: 25 },
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
    <Paper elevation={elevation} className={classes.root}>
      <Typography variant={titleVariant} className={classes.headerText}>
        {title}
      </Typography>
      <BarChartRounded className={classes.logo} />
      <Box className={classes.leftAside}></Box>
      <Box className={classes.navListComponent}>
        {NAVIGATION_MENU_BAR.map((el) => (
          <AppBarNavListItem
            key={el.id}
            title={el.displayName}
            tooltipTitle={el.description}
            icon={el.icon}
            iconStyle={classNames(classes.iconStyle, {
              [classes.primaryStyle]: el.id === selectedID,
            })}
            onClick={() => handleNavigation(el)}
            titleStyle={classNames(classes.text, {
              [classes.underline]: el.id === selectedID,
            })}
          />
        ))}
      </Box>
    </Paper>
  );
};

PrimaryAppBar.defaultProps = {
  title: 'Mashed',
  titleVariant: 'h5',
  elevation: 0,
  selectedID: 0,
};

PrimaryAppBar.propTypes = {
  title: PropTypes.string,
  titleVariant: PropTypes.string,
  elevation: PropTypes.number,
  selectedID: PropTypes.number,
};

export default PrimaryAppBar;
