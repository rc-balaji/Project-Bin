import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DataStream = () => {
 const [data, setData] = useState([]);
 const [binCounts, setBinCounts] = useState({ Bin1: 0, Bin2: 0, Bin3: 0, Bin4: 0 });

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/get-excel-data");
        const fetchedData = await response.json();
        setData(fetchedData);
        let newBinCounts = { Bin1: 0, Bin2: 0, Bin3: 0, Bin4: 0 };
        fetchedData.forEach((item, index) => {
          if (index > 0) {
            const prevItem = fetchedData[index - 1];
            Object.keys(newBinCounts).forEach((bin) => {
              if (item[bin] > prevItem[bin]) {
                newBinCounts[bin] += 1;
              }
            });
          }
        });
        setBinCounts(newBinCounts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
 }, [binCounts]);

 const chartData = {
    labels: data.map((_, index) => index + 1),
    datasets: [
      {
        
        label: "Bin1",
        data: data.map((item) => item.Bin1),
        borderColor: "rgb(255, 99, 132,0.5)",
        backgroundColor: "rgba(255, 99, 132)",
      },
      {
        label: "Bin2",
        data: data.map((item) => item.Bin2),
        borderColor: "rgb(54, 162, 235,0.5)",
        backgroundColor: "rgba(54, 162, 235)",
      },
      {
        label: "Bin3",
        data: data.map((item) => item.Bin3),
        borderColor: "rgb(255, 206, 86,0.5)",
        backgroundColor: "rgba(255, 206, 86)",
      },
      {
        label: "Bin4",
        data: data.map((item) => item.Bin4),
        borderColor: "rgb(75, 192, 192,0.5)",
        backgroundColor: "rgba(75, 192, 192)",
      },
    ],
 };

 const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
     x: {
       type: "linear",
       min: 0,
       max: 100, // Fixed maximum for x-axis
       ticks: {
         stepSize: 1, // Increment by 1 unit
         min: 0, // Ensure the minimum is 0
         max: 100, // Ensure the maximum is 100
       },
     },
     y: {
       min: 0,
       max: 100, // Fixed maximum for y-axis
       ticks: {
         stepSize: 1, // Increment by 1 unit
         min: 0, // Ensure the minimum is 0
         max: 100, // Ensure the maximum is 100
       },
     },
  },
  plugins: {
     legend: {
       position: "top",
     },
     title: {
       display: true,
       text: "Bin Data Visualization",
     },
  },
 };
 

 return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", }}>
      <div style={{ display: "flex", justifyContent: "space-around", width: "100%", }}>
        <div>Bin1 Increments: {binCounts.Bin1}</div>
        <div>Bin2 Increments: {binCounts.Bin2}</div>
        <div>Bin3 Increments: {binCounts.Bin3}</div>
        <div>Bin4 Increments: {binCounts.Bin4}</div>
      </div>
      <div style={{ width: "1200px", height: "600px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
 );
};

export default DataStream;
