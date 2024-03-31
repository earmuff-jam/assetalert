import PropTypes from 'prop-types';
import { Drawer as DrawerComponent } from '@material-ui/core';

const Drawer = ({ open, toggleDrawer, children }) => {
  return (
    <DrawerComponent anchor={'top'} open={open} onClose={() => toggleDrawer(false)}>
      {children}
    </DrawerComponent>
  );
};

Drawer.defaultProps = {
  open: false,
  toggleDrawer: () => {},
  children: {},
};

Drawer.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  children: PropTypes.object,
};

export default Drawer;
