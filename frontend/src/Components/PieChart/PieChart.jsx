import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import 'chart.js/auto'; // do not remove this
import { Pie } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  headerText: {
    color: theme.palette.primary.main,
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.725rem',
  },
  aside: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  emptyGap: {
    flexGrow: 1,
  },
  largeText: {
    fontSize: '1.685rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
}));

const PieChart = ({ volunteeringActivities, totalSkillLimit }) => {
  const classes = useStyles();
  const [totalHours, setTotalHours] = useState(0);
  const [skillHoursVolunteer, setSkillHoursVolunteer] = useState([]);

  const hours = skillHoursVolunteer.map((v) => v.hours);
  const skills = skillHoursVolunteer.map((v) => v.skill);

  const data = {
    labels: skills,
    datasets: [
      {
        data: hours,
        borderColor: ['#20639B', '#3CAEA3', '#F6D55C'],
        backgroundColor: ['#20639B', '#3CAEA3', '#F6D55C'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
    cutout: 60,
    spacing: 10,
  };

  const totalWorkingHours = skillHoursVolunteer.reduce((acc, el) => {
    acc += el.hours;
    return acc;
  }, 0);
  const progressPercentRaw = (totalWorkingHours / totalHours) * 100 || 0;
  const progressPercent = progressPercentRaw.toFixed(2) || 0;

  useEffect(() => {
    if (Array.isArray(volunteeringActivities)) {
      const formattedData = volunteeringActivities.reduce((acc, el) => {
        const existingItem = acc.find((x) => x.skill === el.volunteeringActivity);
        if (existingItem) {
          existingItem.hours += parseFloat(el.volunteer_hours);
        } else {
          acc.push({
            skill: el.volunteeringActivity,
            hours: parseFloat(el.volunteer_hours),
          });
        }
        return acc;
      }, []);
      setSkillHoursVolunteer(formattedData);
      setTotalHours(parseInt(totalSkillLimit, 10)); // string converted to int
    }
  }, [volunteeringActivities, totalSkillLimit]);

  return (
    <Box className={classes.container}>
      <Typography variant="h5" className={classes.headerText} gutterBottom>
        Main Goal Progress
      </Typography>
      <Box className={classes.aside}>
        <Typography className={classes.largeText}>{progressPercent}%</Typography>
        <Box className={classes.emptyGap}></Box>
        <Box>
          <Pie data={data} options={options} width={300} height={150} />
        </Box>
      </Box>
    </Box>
  );
};

PieChart.defaultProps = {
  volunteeringActivities: [],
  totalSkillLimit: 0,
};

PieChart.propTypes = {
  volunteeringActivities: PropTypes.array,
  totalSkillLimit: PropTypes.number,
};

export default PieChart;
