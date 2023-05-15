import { React, useEffect, useState } from "react";
import "./VehiclesPMACard.css";

export default function VehiclesPMACard(props) {
  return (
    <div className='vehiclesPMACard'>
      <div className='vehiclesPMACard__title'>Vehicles</div>
      <div className='vehiclesPMACard__vehicles'>
        <div className='vehiclesPMACard__vehicle'>
          <div className='vehiclesPMACard__vehicle__licensePlate'>
            License-Plate: {props.vehicle.licensePlate}
          </div>
          <div className='vehiclesPMACard__vehicle__capacity'>
            Capacity: {props.vehicle.capacity}
          </div>
          <div className='vehiclesPMACard__vehicle__availability'>
            Availability:{" "}
            {props.vehicle.availability ? "Available" : "Unavailable"}
          </div>
        </div>
      </div>
    </div>
  );
}
