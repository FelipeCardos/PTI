import React from "react";
import Notifications from "./Notifications/Notifications";
import "./ProducerManagementArea.css";

export default function ProducerManagementArea() {
  return (
    <div className='containerProducerManagementArea'>
      <div className='containerNotifications'>
        <Notifications />
      </div>
      <div className='containerProductionUnits'></div>
      <div className='containerVehicles'></div>
    </div>
  );
}
