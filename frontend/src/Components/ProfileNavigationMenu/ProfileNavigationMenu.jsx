import { useState } from 'react';
import Inventories from '../Inventory/Inventories';
import { PROFILE_NAVIGATION_MENU_BAR } from './constants';
import { Box, Tab, Tabs, Tooltip, makeStyles } from '@material-ui/core';
import RecentActivitiesListContainer from '../RecentActivitiesList/RecentActivitiesListContainer';
import Notes from '../Notes/Notes';

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
  textIconContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
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
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (newEvent, value) => {
    setSelectedValue(value);
  };

  const displaySelection = (value) => {
    switch (value) {
      case 0:
        return <RecentActivitiesListContainer />;
      case 1:
        return <Inventories />;
      case 2:
        return <Notes />;
      default:
        return null;
    }
  };

  return (
    <Box className={classes.root}>
      <Tabs
        value={selectedValue}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        data-tour="2"
      >
        {PROFILE_NAVIGATION_MENU_BAR.map((v) => (
          <Tooltip title={v.subtitle} key={v.id}>
            <Tab
              label={
                <span className={classes.textIconContainer}>
                  {v.icon} {v.displayName}
                </span>
              }
            />
          </Tooltip>
        ))}
      </Tabs>
      <Box data-tour="3">{displaySelection(selectedValue)}</Box>
    </Box>
  );
};

export default ProfileNavigationMenu;
