import React from "react";
import VehicleExample from "./VehicleExample/VehicleExample";
import "./Vehicles.css";

export default function Vehicles() {
  let vehicles = [
    {
      id: 1,
      licensePlate: "11-AA-11",
      capacity: 100,
      availability: true,
    },
    {
      id: 2,
      licensePlate: "22-BB-22",
      capacity: 100,
      availability: false,
    },
  ];
  return (
    <>
      <div className='vehiclesTitle'>Vehicles</div>
      <hr className='vehiclesTitleHR' />
      <div className='containerVehiclesExamples'>
        {vehicles.map((vehicle) => (
          <VehicleExample
            key={vehicle.id}
            licensePlate={vehicle.address}
            capacity={vehicle.capacity}
            availability={vehicle.availability}
          />
        ))}
      </div>
      <div className='containerVehiclesButtons'>
        <button className='addVehicleButton'>ADD</button>
        <button className='viewAllVehiclesButton'>View All</button>
      </div>
    </>
  );
}
