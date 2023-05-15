import { React, useEffect, useState } from "react";
import "./VehiclesPMACard.css";

export default function VehiclesPMACard(props) {
  return (
    <div className='vehiclesPMACard'>
      <div className='vehiclesPMACard__title'>Vehicles</div>
      <div className='vehiclesPMACard__vehicles'>
        <div className='vehiclesPMACard__vehicle'>
          <div className='vehiclesPMACard__vehicle__licensePlate'>
            License-Plate: {props.licensePlate}
          </div>
          <div className='vehiclesPMACard__vehicle__capacity'>
            Capacity: {props.capacity}
          </div>
          <div className='vehiclesPMACard__vehicle__availability'>
            Availability: {props.availability ? "Available" : "Unavailable"}
          </div>
        </div>
      </div>
    </div>
  );
}
