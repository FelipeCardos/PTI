import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../assets/UserContext";
import AddVehicles from "./AddVehicles/AddVehicles";
import "./VehiclesPMA.css";
import VehiclesPMACard from "./VehiclesPMACard/VehiclesPMACard";

export default function VehiclesPMA() {
  const [modal, setModal] = useState(false);
  const [showAddVehicles, setShowAddVehicles] = useState(false);
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  const [vehicles, setVehicles] = useState([]);
  const [productionUnits, setProductionUnits] = useState([]);
  const handleShowAddVehicles = () => {
    event.preventDefault();
    setShowAddVehicles(!showAddVehicles);
    setModal(!modal);
  };
  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/v1/users/" + myUserVariable.id + "/vehicles",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        setVehicles(response.data.vehicles);
      });
    axios
      .get(
        "http://localhost:3000/api/v1/users/" +
          myUserVariable.id +
          "/productionUnits",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        setProductionUnits(response.data.productionUnits);
      });
  }, []);
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
          {vehicles.map((vehicle) => (
            <VehiclesPMACard
              key={vehicle.id}
              vehicle={vehicle}
              productionUnits={productionUnits}
            />
          ))}
        </div>
      </div>
      {modal && <div className='modalPMA'></div>}
      {showAddVehicles && (
        <div className='AddVehicles'>
          <AddVehicles
            handleShowAddVehicles={handleShowAddVehicles}
            productionUnits={productionUnits}
          />
        </div>
      )}
    </div>
  );
}
