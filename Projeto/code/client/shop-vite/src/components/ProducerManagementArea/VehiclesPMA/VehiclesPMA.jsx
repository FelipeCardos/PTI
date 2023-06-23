import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  function handleToast(message) {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
    });
  }

  function updateVehicles() {
    axios
      .get(
        "https://yourlocalshop.pt:3000/api/v1/users/" +
          myUserVariable.user_id +
          "/vehicles",
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
  }
  useEffect(() => {
    updateVehicles();
    axios
      .get(
        "https://yourlocalshop.pt:3000/api/v1/users/" +
          myUserVariable.user_id +
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
      <ToastContainer />
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
              handleToast={handleToast}
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
            setProductionUnits={setProductionUnits}
            updateVehicles={updateVehicles}
            handleToast={handleToast}
          />
        </div>
      )}
    </div>
  );
}
