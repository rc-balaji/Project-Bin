import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph = ({ data }) => {
  const [chartDimensions, setChartDimensions] = useState({
    width: window.innerWidth,
    height: window.innerWidth * 0.75 // Example: maintain a 4:3 aspect ratio (height is 75% of width)
  });

  useEffect(() => {
    const updateDimensions = () => {
      let newWidth = window.innerWidth;
      let newHeight = newWidth * 0.75; // Adjust the multiplier as needed
      // Ensure minimum height
      newHeight = Math.max(newHeight, 400); // Example minimum height
      setChartDimensions({ width: newWidth, height: newHeight });
    };
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const chartData = {
    labels: data.map((_, index) => index + 1).slice(0, 100),
    datasets: [
      { label: "Bin1", data: data.map(item => item.Bin1), borderColor: "rgb(255, 99, 132,0.5)", backgroundColor: "rgba(255, 99, 132)", },
      { label: "Bin2", data: data.map(item => item.Bin2), borderColor: "rgb(54, 162, 235,0.5)", backgroundColor: "rgba(54, 162, 235)", },
      { label: "Bin3", data: data.map(item => item.Bin3), borderColor: "rgb(255, 206, 86,0.5)", backgroundColor: "rgba(255, 206, 86)", },
      { label: "Bin4", data: data.map(item => item.Bin4), borderColor: "rgb(75, 192, 192,0.5)", backgroundColor: "rgba(75, 192, 192)", },
    ],
  };

  const getOptions = () => ({
    responsive: true,
    maintainAspectRatio: false, // Allows independent height setting
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
      y: {
        type: "linear",
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        position: chartDimensions.width < 600 ? "bottom" : "top",
        labels: {
          boxWidth: chartDimensions.width < 600 ? 10 : 40,
          padding: chartDimensions.width < 600 ? 10 : 20,
        },
      },
      title: {
        display: true,
        text: "Bin Data Visualization",
      },
    },
  });

  return <div style={{ width: '100%', height: `${chartDimensions.height}px` }}>
    <Line data={chartData} options={getOptions()} />
  </div>;
};

export default Graph;
