import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import classNames from 'classnames';
import PrimaryAppBar from '../AppBar/PrimaryAppBar';
import { AssignmentIndRounded, BarChartRounded, HomeRounded } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  hideNavBar: {
    display: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  headerText: {
    fontSize: '2.0rem',
    fontFamily: 'Poppins, sans-serif',
    color: theme.palette.primary.main,
  },
  logo: {
    display: 'flex',
    alignSelf: 'end',
    width: '1rem',
    height: '1rem',
    paddingBottom: '0.3rem',
    color: theme.palette.primary.main,
  },
}));

export const NAVIGATION_MENU_BAR = [
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
];

const NavigationDrawer = ({ drawerOpen, handleDrawerOpen, handleDrawerClose }) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <AppBar className={classes.row}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={classNames(classes.menuButton, drawerOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <PrimaryAppBar selectedID={1} className={classNames(classes.menuButton, { [classes.hide]: drawerOpen })} />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classNames(classes.drawerPaper, { [classes.hideNavBar]: !drawerOpen }),
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant={'h5'} className={classes.headerText}>
            Mashed
          </Typography>
          <BarChartRounded className={classes.logo} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {NAVIGATION_MENU_BAR.map((v, index) => (
            <ListItem button key={index} onClick={() => navigate(v.to)}>
              <ListItemIcon>{v.icon}</ListItemIcon>
              <ListItemText primary={v.displayName} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default NavigationDrawer;
