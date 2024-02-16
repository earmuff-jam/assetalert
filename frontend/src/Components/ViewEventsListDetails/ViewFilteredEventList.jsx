import React from 'react';
import dayjs from 'dayjs';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
  Badge,
  Tooltip,
  CardActions,
  Chip,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import relativeTime from 'dayjs/plugin/relativeTime';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(1),
  },
  cardMedia: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  contentHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexGrow: 1,
  },
  headerText: {
    fontSize: '0.925rem',
    fontWeight: 'bold',
    lineHeight: '1.5rem',
    color: theme.palette.primary.main,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  textDetails: {
    fontSize: '0.725rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  active: {
    color: theme.palette.primary.main,
  },
  rowAlign: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing(1),
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  presetWidth: {
    width: theme.spacing(14),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(20),
    },
  },
  badgeFont: {
    fontSize: '0.625rem',
  },
  buttonContainer: {
    fontSize: '0.725rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    '&:hover': {
      color: theme.palette.common.black,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    },
  },
}));

const ViewFilteredEventList = ({ filteredOptions, handleNavigate }) => {
  const classes = useStyles();
  dayjs.extend(relativeTime);

  return (
    <>
      {filteredOptions?.map((event) => {
        const eventID = event.id;
        const formattedDate = dayjs(event.start_date).fromNow();
        const formattedDay = dayjs(event.start_date).format('dd');
        return (
          <Grid item xs={12} md={3} key={event.id}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Box className={classes.contentHeader}>
                  <Box className={classNames(classes.rowAlign, classes.gutterBottom)}>
                    <Avatar
                      alt="Event Image"
                      className={classes.cardMedia}
                      src={
                        event?.image_url
                          ? event.image_url && `data:image/png;base64,${event.image_url}`
                          : 'blank_canvas.png'
                      }
                    />
                    <Box className={classes.presetWidth}>
                      <Tooltip title={event.title}>
                        <Typography className={classes.headerText}>{event.title}</Typography>
                      </Tooltip>
                      <Typography className={classes.textDetails} gutterBottom>
                        {event.cause}
                      </Typography>
                    </Box>
                  </Box>
                  <Tooltip title={`Start Date: ${formattedDate}`} placement="top">
                    <Badge
                      badgeContent={formattedDay}
                      color="primary"
                      overlap="rectangular"
                      classes={{ anchorOriginTopRightRectangular: classes.badgeFont }}
                    />
                  </Tooltip>
                </Box>
                <Box className={classes.rowAlign}>
                  <Typography className={classNames(classes.textDetails, classes.active)}>
                    {`${event?.skills_required?.map((v) => v).length} active skills`}
                  </Typography>
                  <Chip label={formattedDate} classes={{ label: classes.textDetails }} />
                </Box>
                <Typography className={classes.textDetails} gutterBottom>
                  {`${event.street.length ? event.street : 'Unknown location'}`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleNavigate(eventID)} className={classes.buttonContainer}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default ViewFilteredEventList;
