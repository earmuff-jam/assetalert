import React from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, makeStyles } from '@material-ui/core';

import EmptyComponent from '../../util/EmptyComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    margin: theme.spacing(2, 0),
    color: '#555555',
    textAlign: 'center',
  },
}));

const SkillAndVolunteerHoursDetails = ({ volunteeringDetails }) => {
  const classes = useStyles();
  const totalHours = volunteeringDetails.reduce((acc, el) => {
    acc += parseFloat(el.volunteer_hours);
    return acc;
  }, 0);
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h5" className={classes.title}>
          Skills and Volunteering Hours
        </Typography>
        <Typography className={classes.title}>Total hours: {totalHours}</Typography>
      </Box>
      {volunteeringDetails?.length <= 0 ? (
        <EmptyComponent subtitle={'Volunteer on active projects to view volunteering details'} />
      ) : (
        <div className={classes.tableContainer}>
          <Table className={classes.skillTable}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Serial No.</TableCell>
                <TableCell align="left">Event </TableCell>
                <TableCell align="left">Activity</TableCell>
                <TableCell align="right">Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {volunteeringDetails?.map((activity, index) => (
                <TableRow key={index} className={index % 2 === 0 ? classes.lighterRow : classes.darkerRow}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="left">{activity.title}</TableCell>
                  <TableCell align="left">{activity.volunteeringActivity}</TableCell>
                  <TableCell align="right">{activity.volunteer_hours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Box>
  );
};

export default SkillAndVolunteerHoursDetails;
