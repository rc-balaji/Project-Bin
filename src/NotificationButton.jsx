import React, { useState } from "react";
import "./NotificationButton.css"; // Ensure this file includes the new styles
import bell from "./bell.png"
function NotificationButton({ latestData }) {
  const [isOpen, setIsOpen] = useState(false);

  // Determine if the notification widget should be shown
  const shouldShowNotification = () => {
    if (latestData.ALERT && latestData.ALERT === "Gas Detected") return true;

    return Object.keys(latestData).some((key) => {
      if (key.startsWith("Bin")) {
        const value = latestData[key];
        return value === 100 || value > 80;
      }
      return false;
    });
  };

  const getBinStatus = (value) => {
    if (value === 100) return { label: "Full", className: "full" };
    if (value > 80) return { label: "About to full", className: "aboutToFull" };
    return null; // Return null for "Normal" status to avoid displaying it
  };

  const notificationContent = () => {
    let content = [];

    if (latestData.ALERT && latestData.ALERT === "Gas Detected") {
      content.push(<p key="alert">Alert: {latestData.ALERT}</p>);
    }

    Object.keys(latestData)
      .filter((key) => key.startsWith("Bin"))
      .forEach((bin) => {
        const status = getBinStatus(latestData[bin]);
        if (status) {
          // Only add if status is not null (i.e., not "Normal")
          content.push(
            <span key={bin} className={`statusLabel ${status.className}`}>
              {`${bin}: ${status.label}`}
            </span>
          );
        }
      });

    return content.length > 0 ? content : "No new notifications";
  };

  // Render nothing if no notification should be shown
  if (!shouldShowNotification()) return null;

  return (
    <div className="notificationContainer">
      <button
        className={`notificationButton ${
          isOpen || shouldShowNotification() ? "newNotification" : ""
        }`}
        onClick={toggleNotifications}
><img src={bell} alt="bell" width = {30} srcset="" /> </button>
      {isOpen && (
        <div className="notificationPopup">
          <p>
            Date: {latestData.Date} Time: {latestData.Time}
          </p>
          <div>{notificationContent()}</div>
        </div>
      )}
    </div>
  );

  function toggleNotifications() {
    setIsOpen(!isOpen);
  }
}

export default NotificationButton;
