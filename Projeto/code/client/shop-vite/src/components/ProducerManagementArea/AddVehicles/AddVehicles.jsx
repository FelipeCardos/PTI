import axios from "axios";
import React, { useState } from "react";
import "./AddVehicles.css";

export default function AddVehicles(props) {
  const [formData, setFormData] = useState({
    license_plate: "",
    capacity: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("productionUnit: " + JSON.stringify(formData));
    axios
      .post("http://localhost:5000/productionUnit/", formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log("Servidor: " + JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='containerAddVehicles'>
      <div className='containerAddVehiclesTitle'>New Vehicle</div>
      <hr className='containerAddVehiclesTitleHR' />
      <form onSubmit={handleSubmit} className='containerAddVehiclesForm'>
        <div>
          <input
            type='text'
            placeholder='License Plate'
            onChange={handleChange}
            name='license_plate'
            value={formData.license_plate}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Capacity'
            onChange={handleChange}
            name='capacity'
            value={formData.capacity}
          />
        </div>
        <div className='buttonsAddVehicles'>
          <button
            className='submitAddVehicle'
            disabled={Object.values(formData).some((value) => value === "")}
            type='submit'
          >
            ADD
          </button>
          <button
            className='cancelAddVehicle'
            onClick={props.handleShowAddVehicles}
            type='button'
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}
