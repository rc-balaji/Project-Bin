import React, { useEffect, useState } from "react";
import Graph from "./components/Graph";
import CountWidget from "./components/CountWidget";
import BinStatus from "./components/BinStatus";
import LogoutButton from "./LogoutButton";
import "./Dashboard.css";
import NotificationButton from "./NotificationButton";

function Dashboard({ username, onLogout }) {
  const [data, setData] = useState([]);
  const [binTypeCounts, setBinTypeCounts] = useState({
    Metal: 0,
    Paper: 0,
    Food: 0,
    Other: 0,
  });
  const [last, setLast] = useState({});
  const [period, setPeriod] = useState({ start: "", end: "" });
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    const urlIP = window.location.hostname;
    setIpAddress(urlIP);

    const fetchData = async () => {
      if (!urlIP) return;
      try {
        const response = await fetch(`http://${urlIP}:3001/get-excel-data`);
        const fetchedData = await response.json();

        if (fetchedData && fetchedData.length > 0) {
          setData(fetchedData);
          const lastItem = fetchedData[fetchedData.length - 1];
          setLast(lastItem);

          let updatedBinTypeCounts = { Metal: 0, Paper: 0, Food: 0, Other: 0 };
          fetchedData.forEach((item) => {
            const type = item.Type;
            if (type) {
              updatedBinTypeCounts[type] += 1;
            }
          });
          setBinTypeCounts(updatedBinTypeCounts);

          const firstItem = fetchedData[0];
          if (firstItem && lastItem) {
            setPeriod({
              start: `${firstItem.Date} ${firstItem.Time}`,
              end: `${lastItem.Date} ${lastItem.Time}`,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ipAddress, data]);

  return (
    <div className="dashboardContainer">
      <header className="dashboardHeader">
        <h1>Bin Monitor</h1>
        <h3>Real-Time Bin Dashboard</h3>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <h5>
            Welcome, {username}! <LogoutButton onLogout={onLogout} />
          </h5>
          <div style={{ padding: "11px 10px 10px 0px" }}>
            <NotificationButton latestData={last} />
          </div>
        </div>
      </header>
      <div className="timeIndicator">
        <span>
          Start: {period.start} - End: {period.end}
        </span>
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
            <CountWidget binCounts={binTypeCounts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
