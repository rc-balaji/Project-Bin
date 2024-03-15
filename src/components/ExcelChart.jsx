import { Bar } from 'react-chartjs-2';
import useExcelData from './useExcelData';

const ExcelChart = () => {
  const excelData = useExcelData();
  
  // Prepare chart data
  const chartData = {
    labels: excelData.map(item => item[Object.keys(item)[0]]), // Assuming first property corresponds to first column
    datasets: [
      {
        label: 'Excel Data',
        data: excelData.map(item => item[Object.keys(item)[1]]), // Assuming second property is the value you want to plot
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ExcelChart;
