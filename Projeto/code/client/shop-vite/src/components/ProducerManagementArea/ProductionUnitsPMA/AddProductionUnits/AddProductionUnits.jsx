import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../../assets/UserContext";
import "./AddProductionUnits.css";

export default function AddProductionUnits(props) {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    street: "",
    postal_code: "",
    capacity: "",
  });
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);

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
    axios
      .post(
        "http://yourlocalshop.pt:3000/api/v1/users/" +
          myUserVariable.user_id +
          "/productionUnits",
        formData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        props.handleShowAddPUs();
        props.updateProductionUnits();
        props.handleToast();
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
            name='country'
            value={formData.country}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='State'
            onChange={handleChange}
            name='state'
            value={formData.state}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Street'
            onChange={handleChange}
            name='street'
            value={formData.street}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Postal Code'
            onChange={handleChange}
            name='postal_code'
            value={formData.postal_code}
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
