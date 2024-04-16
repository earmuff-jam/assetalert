import { useState } from 'react';
import Inventories from '../Inventory/Inventories';
import { PROFILE_NAVIGATION_MENU_BAR } from './constants';
import { Box, Tab, Tabs, Tooltip, makeStyles } from '@material-ui/core';
import RecentActivitiesListContainer from '../RecentActivitiesList/RecentActivitiesListContainer';
import Notes from '../Notes/Notes';

const useStyles = makeStyles((theme) => ({
  textIconContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
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
    <Box>
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
