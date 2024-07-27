import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import { FaceRounded } from '@mui/icons-material';

const ChipComponent = ({ size, icon, label, onClick, variant, disabled }) => {
  return <Chip icon={icon} size={size} label={label} onClick={onClick} variant={variant} disabled={disabled} />;
};

ChipComponent.defaultProps = {
  variant: 'default',
  icon: <FaceRounded />,
  label: 'Login',
  size: 'small',
  disabled: false,
  onClick: () => {},
};

ChipComponent.propTypes = {
  variant: PropTypes.string,
  icon: PropTypes.object,
  size: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ChipComponent;
