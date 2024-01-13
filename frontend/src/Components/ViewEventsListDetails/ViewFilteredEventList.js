import React from 'react';
import moment from 'moment';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  makeStyles,
  Box,
  Badge,
  Tooltip,
  CardActions,
  Chip,
  Avatar,
} from '@material-ui/core';
import classNames from 'classnames';

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
    fontSize: '0.825rem',
    lineHeight: '1.5rem',
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
  buttonContainer: {
    borderRadius: theme.spacing(0),
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.light,
    '&:hover': {
      color: theme.palette.common.black,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    },
  },
}));

const ViewFilteredEventList = ({ filteredOptions, handleNavigate }) => {
  const classes = useStyles();
  return (
    <>
      {filteredOptions?.map((event) => {
        const eventID = event.id;
        const formattedDate = moment(event.start_date).fromNow();
        const formattedDay = moment(event.start_date).format('dd');
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
                          : `${process.env.PUBLIC_URL}/blank-canvas.png`
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
                    <Badge badgeContent={formattedDay} color="primary" overlap="rectangular" />
                  </Tooltip>
                </Box>
                <Box className={classes.rowAlign}>
                  <Typography className={classNames(classes.textDetails, classes.active)} gutterBottom>
                    {`${event?.skills_required?.map((v) => v).length} active skills`}
                  </Typography>
                  <Chip label={formattedDate} />
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
