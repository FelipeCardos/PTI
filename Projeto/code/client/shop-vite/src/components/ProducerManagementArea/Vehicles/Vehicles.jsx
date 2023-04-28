import React from "react";
import { useNavigate } from "react-router-dom";
import "./Vehicles.css";

export default function Vehicles() {
  let navigate = useNavigate();
  return (
    <>
      <div className='vehiclesTitleProducerManagementArea'>Vehicles</div>
      <hr className='vehiclesTitleHRProducerManagementArea' />
      <div className='containerVehiclesChartsProducerManagementArea'></div>
      <button
        className='viewAllVehiclesButtonProducerManagementArea'
        onClick={() => {
          return navigate("/management-area/vehicles");
        }}
      >
        View All
      </button>
    </>
  );
}
