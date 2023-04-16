import React from "react";
import Notifications from "./Notifications/Notifications";
import "./ProducerManagementArea.css";
import ProductionUnits from "./ProductionUnits/ProductionUnits";
import Vehicles from "./Vehicles/Vehicles";

export default function ProducerManagementArea() {
  return (
    <div className='containerProducerManagementArea'>
      <div className='containerNotifications'>
        <Notifications />
      </div>
      <div className='containerProductionUnits'>
        <ProductionUnits />
      </div>
      <div className='containerVehicles'>
        <Vehicles />
      </div>
    </div>
  );
}
