import React from "react";
import "./CountWidget.css";

const CountWidget = ({ binCounts }) => {
  return (
    <div className="countWidget">
      <h2>Bin Usage Increments</h2>
      <div className="binCount">
        <div className="binIncrement">Metal Count: <span>{binCounts.Bin1}</span></div>
        <div className="binIncrement">Paper Count: <span>{binCounts.Bin2}</span></div>
        <div className="binIncrement">Food Waste Count: <span>{binCounts.Bin3}</span></div>
        <div className="binIncrement">Other Waste Count: <span>{binCounts.Bin4}</span></div>
      </div>
    </div>
  );
};

export default CountWidget;
