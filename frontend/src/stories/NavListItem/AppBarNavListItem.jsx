import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { AssignmentIndRounded } from '@material-ui/icons';
import { List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
  },
  listItem: {
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  iconRoot: {
    minWidth: 0,
  },
}));

const AppBarNavListItem = ({ tooltipTitle, title, titleStyle, icon, iconStyle, onClick }) => {
  const classes = useStyles();
  return (
    <List component="nav" aria-labelledby="navigation-header" className={classes.list}>
      <Tooltip title={tooltipTitle}>
        <ListItem button onClick={onClick} className={classes.listItem}>
          <ListItemIcon classes={{ root: classNames(classes.iconRoot, iconStyle) }}>{icon}</ListItemIcon>
          <ListItemText classes={{ primary: titleStyle }}>{title}</ListItemText>
        </ListItem>
      </Tooltip>
    </List>
  );
};

AppBarNavListItem.defaultProps = {
  tooltipTitle: 'Tooltip title ',
  title: 'profile',
  icon: <AssignmentIndRounded />,
  iconStyle: '',
  onClick: () => {},
};

AppBarNavListItem.propTypes = {
  tooltipTitle: PropTypes.string,
  title: PropTypes.string,
  titleStyle: PropTypes.string,
  icon: PropTypes.object,
  iconStyle: PropTypes.string,
  onClick: PropTypes.func,
};

export default AppBarNavListItem;
