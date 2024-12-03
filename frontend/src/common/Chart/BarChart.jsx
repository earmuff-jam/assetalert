import { Box } from '@mui/material';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const labelContextFn = (context, data) => {
  let label = context.label || '';
  if (label) {
    label += ': ';
  }
  const parsedValue = parseFloat(context.formattedValue);
  if (!isNaN(parsedValue)) {
    const total = data.reduce((sum, item) => sum + parseFloat(item.count || 0), 0);
    label += `${parsedValue} (${((parsedValue / total) * 100).toFixed(2)}%)`;
  } else {
    label += 'Invalid Data';
  }

  return label;
};

const BarChart = ({ data, legendLabel, backgroundColor, height = '25rem' }) => {
  let chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: `${legendLabel}`,
        data: data.map((d) => d.count),
        backgroundColor: backgroundColor,
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => labelContextFn(context, data),
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
    },
  };

  return (
    <Box width={'100%'} height={height}>
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default BarChart;
