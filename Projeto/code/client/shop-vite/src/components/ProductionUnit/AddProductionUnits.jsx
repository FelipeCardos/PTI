import axios from "axios";
import React, { useState } from "react";
import "./AddProductionUnit.css";

export default function ProductionUnitsAdd(props) {
  const signupType = props.tipo;
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    Country: "",
    State: "",
    Street: signupType,
    PostalCode: "",
    Capacity: "",
  });

  function handleChange(event) {
    setInputValue(event.target.value);
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
      .post("http://yourlocalshop.pt:5000/productionUnit/", formData, {
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
    <div>
      <div>
        <form onSubmit={handleSubmit} className='addProductionUnitForm'>
          <h1 className='SignUpTitle'>Add Production Unit</h1>
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
          <div>
            <input
              disabled={Object.values(formData).some((value) => value === "")}
              type='submit'
              className='nextButton'
              value='NEXT'
            />
          </div>
        </form>
        <br />
      </div>
    </div>
  );
}
