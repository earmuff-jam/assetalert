import 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';

const PieBarChart = ({ chartType = 'bar', data, legendLabel, backgroundColor, borderColor, height = '25rem' }) => {
  let chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: `${legendLabel}`,
        data: data.map((d) => d.value),
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

  if (chartType !== 'bar') {
    chartData = {
      datasets: [
        {
          data: data.map((v) => v.count),
          backgroundColor: data.map((v) => v.color),
          hoverOffset: 4,
        },
      ],
    };

    options = {
      cutout: '70%',
      borderColor: data.map((v) => v.color),
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.formattedValue} items` || 0;
            },
          },
        },
      },
    };
  }

  return (
    <div style={{ width: '100%', height: height }}>
      {chartType === 'pie' ? <Pie data={chartData} options={options} /> : <Bar data={chartData} options={options} />}
    </div>
  );
};

export default PieBarChart;
