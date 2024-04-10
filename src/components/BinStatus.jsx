import React from "react";
import "./BinStatus.css";

const BinStatus = ({ latestData }) => {
  // Assuming latestData format: { Bin1: 20, Bin2: 0, Bin3: 100, Bin4: 90 }

  // This function determines the status and associated class based on the bin's value.
  const getStatus = (value) => {
    if (value <= 5) return { label: "Empty", className: "empty" };
    if (value === 100) return { label: "Full", className: "full" };
    if (value > 80) return { label: "About to full", className: "aboutToFull" };
    return { label: "Use me", className: "useMe" };
  };

  // Component for rendering individual bin status with visual effect
  const BinVisual = ({ value, bin }) => {
    const { className, label } = getStatus(value);
    value = parseFloat(value).toFixed(2)
    return (
      <div className="binVisual">
        <div className="binLabel">{bin}</div>
        <div className="binContainer">
          {/* Adjusted for styling purposes */}
          <div
            className={`binFill ${className}`}
            style={{ height: `${value > 5 ? value : 0}%` }}
          >
            <div className="binValue">{value > 5 ? value : 0}%</div>
          </div>
        </div>
        <div className="binFooter">{label}</div>
      </div>
    );
  };

  return (
    <div className="binStatusContainer">
      {/* Filter out non-bin related properties before mapping */}
      {latestData &&
        Object.entries(latestData)
          .filter(([key, _]) => key.startsWith("Bin"))
          .map(([bin, value]) => (
            <BinVisual key={bin} value={value} bin={bin} />
          ))}
    </div>
  );
};

export default BinStatus;
