import React, { lazy } from "react";
import "./VehicleCard.css";

const DeleteIcon = lazy(() => import("@mui/icons-material/Delete"));

export default function VehicleCard(props) {
  return (
    <div className='vehicleCard'>
      <div className='vehicleInfo'>
        <div className='vehicleLicensePlate'>
          License: {props.license_plate}
        </div>
        <div className='vehicleCapacity'>Capacity: {props.capacity}</div>
      </div>
      <div className='vehicleDelete'>
        <DeleteIcon />
      </div>
    </div>
  );
}
