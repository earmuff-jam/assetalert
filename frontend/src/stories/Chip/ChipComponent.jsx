import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import { FaceRounded } from '@material-ui/icons';

const ChipComponent = ({ icon, label, onClick, variant, disabled }) => {
  return <Chip icon={icon} label={label} onClick={onClick} variant={variant} disabled={disabled} />;
};

ChipComponent.defaultProps = {
  variant: 'outlined',
  icon: <FaceRounded />,
  label: 'Login',
  disabled: false,
  onClick: () => {},
};

ChipComponent.propTypes = {
  variant: PropTypes.string,
  icon: PropTypes.object,
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ChipComponent;
