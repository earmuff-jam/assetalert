import { useState } from 'react';
import { Box, Divider, makeStyles } from '@material-ui/core';
import { NavigationTabBar } from '../Event/EventDetailsDrawerComponent';
import RecentActivitiesList from '../RecentActivitiesList/RecentActivitiesListContainer';
import { PROFILE_NAVIGATION_MENU_BAR } from './constants';

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 20),
    backgroundColor: theme.palette.secondary.main,
  },
  listItemRoot: {
    padding: theme.spacing(0),
  },
  centerAlign: {
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
  noWidth: {
    minWidth: theme.spacing(0),
    '& .MuiListItemIcon-root': {
      minWidth: theme.spacing(0),
    },
  },
  text: {
    fontSize: '0.725rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  gutterBottom: {
    marginBottom: theme.spacing(2),
  },
}));

const ProfileNavigationMenu = () => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState(1);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const displaySelection = (value) => {
    switch (value) {
      case 0:
        return <Box>{PROFILE_NAVIGATION_MENU_BAR[0].text}</Box>;
      case 1:
        return (
          <Box>
            <RecentActivitiesList />
          </Box>
        );
      case 2:
        return <Box>{PROFILE_NAVIGATION_MENU_BAR[2].text}</Box>;
      case 3:
        return <Box>{PROFILE_NAVIGATION_MENU_BAR[3].text}</Box>;
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <NavigationTabBar
        value={selectedValue}
        iconStyle={classes.noWidth}
        handleChange={handleChange}
        data={PROFILE_NAVIGATION_MENU_BAR}
        extraRootStyle={classes.centerAlign}
      />
      <Divider className={classes.gutterBottom} />
      {displaySelection(selectedValue)}
    </div>
  );
};

export default ProfileNavigationMenu;
