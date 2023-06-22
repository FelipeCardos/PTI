import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../assets/UserContext";
import "./ProductionUnitsPMACard.css";

export default function ProductionUnitsPMACard(props) {
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
        "http://yourlocalshop.pt:3000/api/v1/users/" +
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
    <div className='productionUnitsPMACard__productionUnit'>
      <div className='productionUnitsPMACard__productionUnit__country'>
        Country: {props.productionUnit.address.country}
      </div>
      <div className='productionUnitsPMACard__productionUnit__state'>
        State: {props.productionUnit.address.state}
      </div>
      <div className='productionUnitsPMACard__productionUnit__street'>
        Street: {props.productionUnit.address.street}
      </div>
      <div className='productionUnitsPMACard__productionUnit__postalCode'>
        Postal Code: {props.productionUnit.address.postal_code}
      </div>
      <div className='productionUnitsPMACard__productionUnit__capacity'>
        Capacity: {props.productionUnit.capacity}
      </div>
    </div>
  );
}
