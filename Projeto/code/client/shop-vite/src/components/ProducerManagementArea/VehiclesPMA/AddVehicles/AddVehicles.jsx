import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../assets/UserContext";
import "./AddVehicles.css";

export default function AddVehicles(props) {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  const [formData, setFormData] = useState({
    license_plate: "",
    capacity: "",
    productionUnit: null,
  });
  const [productionUnits, setProductionUnits] = useState([]);
  console.log("productionUnits: " + JSON.stringify(productionUnits));

  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/v1/users/" +
          myUserVariable.id +
          "/productionUnits",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        setProductionUnits(res.data.productionUnits);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value === "default" ? "" : value,
    });
  };

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
            placeholder='License Plate 6-8 characters'
            onChange={handleChange}
            name='license_plate'
            value={formData.license_plate}
            minLength={6}
            maxLength={8}
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Capacity'
            onChange={handleChange}
            name='capacity'
            value={formData.capacity}
            min={0}
          />
        </div>
        <div>
          <label htmlFor=''>Production Unit:</label>
          <select name='productionUnit' onChange={handleSelectChange}>
            <option value='default'>None</option>
            {productionUnits &&
              productionUnits.map((productionUnit) => {
                return (
                  <option value={productionUnit.id}>
                    Production Unit in {productionUnit.address.street}
                  </option>
                );
              })}
          </select>
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
