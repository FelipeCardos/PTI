import axios from "axios";
import React, { useState } from "react";
import "./AddProductionUnits.css";

export default function AddProductionUnits(props) {
  const [formData, setFormData] = useState({
    Country: "",
    State: "",
    Street: "",
    PostalCode: "",
    Capacity: "",
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
    <div className='containerAddProductionUnits'>
      <div className='containerAddProductionUnitsTitle'>
        New Production Unit
      </div>
      <hr className='containerAddProductionUnitsTitleHR' />
      <form onSubmit={handleSubmit} className='containerAddProductionUnitsForm'>
        <div>
          <input
            type='text'
            placeholder='Country'
            onChange={handleChange}
            name='Country'
            value={formData.Country}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='State'
            onChange={handleChange}
            name='State'
            value={formData.State}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Street'
            onChange={handleChange}
            name='Street'
            value={formData.Street}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Postal Code'
            onChange={handleChange}
            name='PostalCode'
            value={formData.PostalCode}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Capacity'
            onChange={handleChange}
            name='Capacity'
            value={formData.Capacity}
          />
        </div>
        <div className='buttonsAddProductionUnits'>
          <button
            className='submitAddProductionUnit'
            disabled={Object.values(formData).some((value) => value === "")}
            type='submit'
          >
            ADD
          </button>
          <button
            className='cancelAddProductionUnit'
            onClick={props.handleShowAddPUs}
            type='button'
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}
