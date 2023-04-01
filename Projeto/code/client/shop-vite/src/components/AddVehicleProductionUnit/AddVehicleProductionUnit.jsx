import { NoBackpackSharp } from "@mui/icons-material";
import React from "react";
import "./AddVehicleProductionUnit.css";
import VehicleCard from "./VehicleCard";

export default function AddVehicleProductionUnit(props) {
  let vehicleList = [
    {
      license_plate: "AA-00-00",
      capacity: 100,
    },
    {
      license_plate: "AA-00-01",
      capacity: 100,
    },
    {
      license_plate: "AA-00-02",
      capacity: 100,
    },
  ];

  return (
    <div className='AddVehicleProductionUnit'>
      <form className='addVehicleForm'>
        <h1>Add Vehicle to Production Unit: {props.productionUnitId}</h1>
        <input
          type='text'
          id='vehicleLicensePlate'
          placeholder='License Plate'
        />
        <input type='number' id='vehicleCapacity' placeholder='Capacity' />
        <hr />
        <button>Add</button>
      </form>
      <hr />
      <div className='vehicleList'>
        <h1>Vehicle List</h1>
        <div className='vehicleListContainer'>
          {vehicleList.map((vehicle) => (
            <VehicleCard
              key={vehicle.license_plate}
              license_plate={vehicle.license_plate}
              capacity={vehicle.capacity}
            />
          ))}
        </div>
      </div>
      <div className='saveBackButtons'>
        <button>Back</button>
        <button>Save</button>
      </div>
    </div>
  );
}
