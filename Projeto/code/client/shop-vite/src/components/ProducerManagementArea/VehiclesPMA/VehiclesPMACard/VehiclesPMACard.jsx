import axios from "axios";
import { React, useEffect, useState } from "react";
import "./VehiclesPMACard.css";

export default function VehiclesPMACard(props) {
  const [selectDisabled, setSelectDisabled] = useState(false);

  function handleOnChangeProductionUnit(event) {
    setSelectDisabled(true);
    const { name, value } = event.target;
    if (value === "default") return;
    axios.put(
      "http://localhost:3000/api/v1/vehicles/" + props.vehicle.id,
      {
        productionUnit: value,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
  }

  return (
    <div className='vehiclesPMACard__vehicle'>
      <div className='vehiclesPMACard__vehicle__licensePlate'>
        License-Plate: {props.vehicle.license_plate}
      </div>
      <div className='vehiclesPMACard__vehicle__capacity'>
        Capacity: {props.vehicle.capacity}
      </div>
      <div className='vehiclesPMACard_vehicle_productionUnits'>
        <label htmlFor=''>Production Unit:</label>
        <select
          name='productionUnit'
          id=''
          disabled={selectDisabled}
          onChange={handleOnChangeProductionUnit}
        >
          <option value='default'>None</option>
          {props.productionUnits.map((productionUnit) => {
            return (
              <option value={productionUnit.id}>
                {productionUnit.address.street}
              </option>
            );
          })}
        </select>
      </div>
      {props.vehicle.available ? null : (
        <div className='vehiclesPMACard__vehicle__availability'>
          Availability: {props.vehicle.available ? "Available" : "Unavailable"}
        </div>
      )}
    </div>
  );
}
