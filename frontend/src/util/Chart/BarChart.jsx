import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarChart = ({
  data,
  legendLabel,
  backgroundColor,
  borderColor,
  height = '25rem',
}) => {
  let chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        label: `${legendLabel}`,
        data: data.map((d) => d.count),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: height }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
