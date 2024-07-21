import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import relativeTime from 'dayjs/plugin/relativeTime';
import makeStyles from '@mui/styles/makeStyles';
import { Box, Divider, Tooltip, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '15rem',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: '0.625rem',
    color: theme.palette.text.secondary,
    cursor: 'pointer',
  },
  title: {
    fontSize: '0.925rem',
    fontWeight: 'bold',
    margin: '0.2rem 0rem',
    color: theme.palette.text.disabled,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  subtitle: {
    fontSize: '0.525rem',
    color: theme.palette.text.secondary,
  },
  generalText: {
    fontSize: '0.525rem',
  },
}));

const PopupContent = ({ selectedEvent }) => {
  const classes = useStyles();
  dayjs.extend(relativeTime);

  const {
    id: projectID,
    title: event,
    cause,
    attendees,
    sharable_groups,
    comments: description,
    display_name: location,
    project_type: type,
    updated_at: changed,
    created_at,
  } = selectedEvent;

  const navigateToEvent = (projectID) => {
    const url = window.location.href;
    const newUrl = `${url}${projectID}`;
    window.location.href = newUrl;
  };

  return (
    <Box className={classes.container}>
      <Tooltip title="Double click or tap to navigate to the selected event">
        <Box
          className={classes.textDetailsContainer}
          onDoubleClick={() => navigateToEvent(projectID)}
          onTouchStart={() => navigateToEvent(projectID)}
        >
          <Typography className={classNames(classes.text, classes.title)}>{event}</Typography>
          <Typography className={classNames(classes.text, classes.generalText)}>
            {description || 'Edit event to add description'}
          </Typography>
          <Divider />
          <Box className={classes.row}>
            <Typography className={classes.text}>{cause}</Typography>
            <Typography className={classes.text}>{type}</Typography>
          </Box>
          <Box className={classes.row}>
            <Typography className={classes.text}>{`${attendees.length} attending`}</Typography>
            <Typography className={classes.text}>{`${sharable_groups.length} members`}</Typography>
          </Box>
          <Typography
            className={classNames(classes.text, classes.title, classes.subtitle)}
          >{`Near ${location}`}</Typography>
          <Box className={classes.row}>
            <Typography className={classNames(classes.text, classes.generalText)}>{`Created: ${dayjs(
              created_at
            ).fromNow()}`}</Typography>
            <Typography className={classNames(classes.text, classes.generalText)}>{`Last updated : ${dayjs(
              changed
            ).fromNow()}`}</Typography>
          </Box>
        </Box>
      </Tooltip>
    </Box>
  );
};

PopupContent.defaultProps = {
  id: '',
  title: '',
  cause: '',
  attendees: [],
  sharable_groups: [],
  comments: '',
  display_name: '',
  project_type: '',
  updated_at: '',
  created_at: '',
  selectedEvent: {},
};

PopupContent.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  cause: PropTypes.string,
  attendees: PropTypes.array,
  sharable_groups: PropTypes.array,
  comments: PropTypes.string,
  display_name: PropTypes.string,
  project_type: PropTypes.string,
  updated_at: PropTypes.string,
  created_at: PropTypes.string,
  selectedEvent: PropTypes.object,
};

export default PopupContent;
