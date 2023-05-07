import { React, useState } from "react";
import Notifications from "./Notifications/Notifications";
import "./ProducerManagementArea.css";
import ProductionUnits from "./ProductionUnits/ProductionUnits";
import AddProductionUnits from "./ProductionUnitsPMA/AddProductionUnits/AddProductionUnits";
import Products from "./Products/Products";
import Vehicles from "./Vehicles/Vehicles";
import AddVehicles from "./VehiclesPMA/AddVehicles/AddVehicles";

export default function ProducerManagementArea() {
  const [modal, setModal] = useState(false);
  const [showAddPUs, setShowAddPUs] = useState(false);
  const [showAddVehicles, setShowAddVehicles] = useState(false);

  const handleShowAddPUs = () => {
    event.preventDefault();
    setShowAddPUs(!showAddPUs);
    setShowAddVehicles(false);
    setModal(!modal);
  };

  const handleShowAddVehicles = () => {
    event.preventDefault();
    setShowAddVehicles(!showAddVehicles);
    setShowAddPUs(false);
    setModal(!modal);
    console.log("handleShowAddVehicles");
  };

  return (
    <div className='containerProducerManagementArea'>
      <div className='containerNotificationsProducerManagementArea'>
        <Notifications />
      </div>
      <div className='containerProductsProducerManagementArea'>
        <Products />
      </div>
      <div className='containerProductionUnitsProducerManagementArea'>
        <ProductionUnits handleShowAddPUs={handleShowAddPUs} />
      </div>
      <div className='containerVehiclesProducerManagementArea'>
        <Vehicles handleShowAddVehicles={handleShowAddVehicles} />
      </div>
      {modal && <div className='modalProducerManagementArea'></div>}
      {showAddPUs && (
        <div className='AddPUs'>
          <AddProductionUnits handleShowAddPUs={handleShowAddPUs} />
        </div>
      )}
      {showAddVehicles && (
        <div className='AddVehicles'>
          <AddVehicles handleShowAddVehicles={handleShowAddVehicles} />
        </div>
      )}
    </div>
  );
}
