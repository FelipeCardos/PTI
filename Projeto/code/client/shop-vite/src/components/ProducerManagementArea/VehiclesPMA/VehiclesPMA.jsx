import { useState } from "react";
import AddVehicles from "./AddVehicles/AddVehicles";
import "./VehiclesPMA.css";

export default function VehiclesPMA() {
  const [modal, setModal] = useState(false);
  const [showAddVehicles, setShowAddVehicles] = useState(false);
  const handleShowAddVehicles = () => {
    event.preventDefault();
    setShowAddVehicles(!showAddVehicles);
    setModal(!modal);
    console.log("handleShowAddVehicles");
  };
  return (
    <div className='containerVehiclesPMA'>
      <div className='containerVehiclesPMADashboard'>
        <div className='vehiclesPMADashboardTitle'>Dashboard</div>
        <hr className='vehiclesPMADashboardTitleHR' />
        <div className='containerVehiclesPMADashboardCharts'>
          {/* Falta renderizar os gráficos */}
        </div>
      </div>
      <div className='containerVehiclesPMAYourVehicles'>
        <div className='vehiclesPMAYourVehiclesTitle'>
          Your Vehicles
          <button
            className='vehiclesPMAAddVehicles'
            onClick={handleShowAddVehicles}
          >
            ADD
          </button>
        </div>
        <hr className='vehiclesPMAYourVehiclesTitleHR' />
        <div className='containerVehiclesPMAYourVehiclesVehicles'>
          {/* Falta renderizar os veículos */}
        </div>
      </div>
      {modal && <div className='modalPMA'></div>}
      {showAddVehicles && (
        <div className='AddVehicles'>
          <AddVehicles handleShowAddVehicles={handleShowAddVehicles} />
        </div>
      )}
    </div>
  );
}
