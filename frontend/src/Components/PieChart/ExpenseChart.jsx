import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import 'chart.js/auto'; // do not remove this
import { Bar } from 'react-chartjs-2';

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
    [theme.breakpoints.down('sm')]: {
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

const ExpenseChart = ({ expenses }) => {
  const classes = useStyles();
  const [datasets, setDatasets] = useState([]);

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
    maintainAspectRatio: true,
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
      <Typography variant="h5" className={classes.headerText} gutterBottom>
        Expense Report
      </Typography>
      <Typography className={classes.text}>
        Incurred Expenses:
        <span className={classes.highlight}> {totalIncurred ? `$ ${totalIncurred}` : 'NA'} </span>
      </Typography>
      <Box className={classes.aside}>
        <Box className={classes.emptyGap}></Box>
        <Box className={classes.container}>
          <Bar data={data} options={options} />
        </Box>
      </Box>
    </Box>
  );
};

ExpenseChart.defaultProps = {
  expenses: [],
};

ExpenseChart.propTypes = {
  expenses: PropTypes.array,
};

export default ExpenseChart;
