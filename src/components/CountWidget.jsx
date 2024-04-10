import React from "react";
import "./CountWidget.css";

const CountWidget = ({ binCounts }) => {
  return (
    <div className="countWidget">
      <h2>Bin Usage Increments</h2>
      <div className="binCount">
        <div className="binIncrement">
          Metal Count: <span>{binCounts.Metal}</span>
        </div>
        <div className="binIncrement">
          Paper Count: <span>{binCounts.Paper}</span>
        </div>
        <div className="binIncrement">
          Food Waste Count: <span>{binCounts.Food}</span>
        </div>
        <div className="binIncrement">
          Other Waste Count: <span>{binCounts.Other}</span>
        </div>
      </div>
    </div>
  );
};

export default CountWidget;
