import React, { useEffect, useState } from 'react';
import Graph from './components/Graph';
import CountWidget from './components/CountWidget';
import BinStatus from './components/BinStatus';
import LogoutButton from './LogoutButton';
import './Dashboard.css';

function Dashboard({ username, onLogout }) {
  const [data, setData] = useState([]);
  const [binCounts, setBinCounts] = useState({ Bin1: 0, Bin2: 0, Bin3: 0, Bin4: 0 });
  const [last, setLast] = useState({});
  const [period, setPeriod] = useState({ start: '', end: '' });

  const excelDateToJSDate = (serial) => {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400; 
    const date_info = new Date(utc_value * 1000 + (new Date().getTimezoneOffset() * 60000));
    return date_info;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/get-excel-data');
        const fetchedData = await response.json();
        if(fetchedData && fetchedData.length > 0) {
          const modifiedData = fetchedData.map(d => ({
            ...d,
            dateTime: excelDateToJSDate(d.Date),
          }));
          setData(modifiedData);
          const firstItem = modifiedData[0];
          const lastItem = modifiedData[modifiedData.length - 1];
          setLast(lastItem);

          let newBinCounts = { Bin1: 0, Bin2: 0, Bin3: 0, Bin4: 0 };
          modifiedData.forEach((item, index) => {
            if (index > 0) {
              const prevItem = modifiedData[index - 1];
              Object.keys(newBinCounts).forEach(bin => {
                if (item[bin] > prevItem[bin]) {
                  newBinCounts[bin] += 1;
                }
              });
            }
          });
          setBinCounts(newBinCounts);

          if (firstItem && lastItem) {
            setPeriod({
              start: `${firstItem.dateTime.toLocaleDateString()} ${firstItem.Time}`,
              end: `${lastItem.dateTime.toLocaleDateString()} ${lastItem.Time}`
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div className="dashboardContainer">
      <header className="dashboardHeader">
        <h1>Bin Monitor</h1>
        <h3>Real-Time Bin Dashboard</h3>
        <h5>Welcome, {username}! <LogoutButton onLogout={onLogout} /></h5>
      </header>
      <div className="timeIndicator">
        <span>Start: {period.start} - End: {period.end}</span>
      </div>
      <div className="dataVisualization">
        <div className="componentWithTitle">
          <h2 className="componentTitle">Graphical Overview</h2>
          <Graph data={data} />
        </div>
        <div className="widgetsRow">
          <div className="componentWithTitle">
            <h2 className="componentTitle">Bin Status</h2>
            <BinStatus latestData={last} />
          </div>
          <div className="componentWithTitle">
            <h2 className="componentTitle">Count Widget</h2>
            <CountWidget binCounts={binCounts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
