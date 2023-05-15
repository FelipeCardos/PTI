import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../assets/UserContext";
import "./VehiclesPMACard.css";

export default function VehiclesPMACard(props) {
  const [selectDisabled, setSelectDisabled] = useState(false);
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);

  async function handleOnChangeProductionUnit(event) {
    setSelectDisabled(true);
    const { name, value } = event.target;
    if (value === "default") {
      setSelectDisabled(false);
      return;
    }
    console.log("ola");
    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/users/" +
          myUserVariable.id +
          "/vehicles/" +
          props.vehicle.id,
        {
          productionUnit: value,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      console.log("response: " + JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
    setSelectDisabled(false);
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
              <option
                value={productionUnit.id}
                key={productionUnit.id}
                selected={
                  props.vehicle.production_unit_id === productionUnit.id
                }
              >
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
