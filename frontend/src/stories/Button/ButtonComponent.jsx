import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SaveRounded } from '@material-ui/icons';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  disableHover: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

const ButtonComponent = ({
  text,
  buttonVariant,
  showIcon,
  icon,
  disabled,
  disableRipple,
  disableFocusRipple,
  onClick,
}) => {
  const classes = useStyles();
  return (
    <Button
      className={classNames({ [classes.disableHover]: disableRipple })}
      variant={buttonVariant}
      disabled={disabled}
      disableRipple={disableRipple}
      disableFocusRipple={disableFocusRipple}
      onClick={onClick}
      endIcon={showIcon ? icon : null}
    >
      {text}
    </Button>
  );
};

ButtonComponent.defaultProps = {
  text: 'Mashed',
  buttonVariant: 'outlined',
  showIcon: false,
  icon: <SaveRounded />,
  disabled: false,
  disableRipple: false,
  disableFocusRipple: false,
  onClick: () => {},
};

ButtonComponent.propTypes = {
  text: PropTypes.string,
  buttonVariant: PropTypes.string,
  showIcon: PropTypes.boolean,
  icon: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.boolean,
  disableRipple: PropTypes.boolean,
  disableFocusRipple: PropTypes.boolean,
};

export default ButtonComponent;
