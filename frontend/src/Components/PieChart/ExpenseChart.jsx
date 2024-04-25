import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import 'chart.js/auto'; // do not remove this
import { Bar } from 'react-chartjs-2';

import EmptyComponent from '../../util/EmptyComponent';
import { useDispatch, useSelector } from 'react-redux';
import { eventActions } from '../../Containers/Event/eventSlice';

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
    fontSize: '1.725rem',
  },
  aside: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  center: {
    display: 'flex',
    margin: '0 auto',
  },
  largeText: {
    fontSize: '1.685rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
}));

const ExpenseChart = ({ eventID }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [datasets, setDatasets] = useState([]);

  const { expenses } = useSelector((state) => state.event);

  useEffect(() => {
    if (eventID) {
      dispatch(eventActions.getExpenseList({ eventID }));
    }
    // eslint-disable-next-line
  }, []);

  const data = {
    labels: datasets.map((v) => v.category_name),
    datasets: [
      {
        data: datasets.map((v) => v.cost),
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
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const totalIncurred = datasets.reduce((acc, el) => {
    return (acc += el.cost);
  }, 0);

  useEffect(() => {
    if (Array.isArray(expenses)) {
      const formattedData = expenses.reduce((acc, el) => {
        const categoryExists = acc.find((item) => item.category_name === el.category_name);
        if (categoryExists) {
          categoryExists.cost += parseFloat(el.item_cost);
        } else {
          acc.push({
            category_name: el.category_name,
            cost: parseFloat(el.item_cost),
          });
        }
        return acc;
      }, []);
      setDatasets(formattedData);
    }
  }, [expenses]);

  return (
    <Box className={classes.container}>
      {totalIncurred ? (
        <Typography className={classes.headerText}>
          Incurred Expenses:
          <span className={classes.highlight}> {totalIncurred ? `$ ${totalIncurred}` : 'NA'} </span>
        </Typography>
      ) : null}
      <Box className={classes.aside}>
        {totalIncurred ? (
          <Bar data={data} options={options} width={300} height={300} />
        ) : (
          <Box className={classes.center}>
            <EmptyComponent subtitle="Add expenses to view data." />
          </Box>
        )}
      </Box>
    </Box>
  );
};

ExpenseChart.defaultProps = {
  eventID: '',
};

ExpenseChart.propTypes = {
  eventID: PropTypes.string,
};

export default ExpenseChart;
