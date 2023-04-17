import React from "react";
import "./VehicleExample.css";

export default function VehicleExample(props) {
  return (
    <div className='vehicleExample'>
      <div className='vehicleExample__licensePlate'>
        License-Plate: {props.licensePlate}
      </div>
      <div className='vehicleExample__capacity'>Capacity: {props.capacity}</div>
      <div className='vehicleExample__availability'>
        Availability: {props.availability ? "Available" : "Unavailable"}
      </div>
    </div>
  );
}
