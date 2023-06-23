import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../../assets/UserContext";
import AddProductionUnits from "./AddProductionUnits/AddProductionUnits";
import "./ProductionUnitsPMA.css";
import ProductionUnitsPMACard from "./ProductionUnitsPMACard/ProductionUnitsPMACard";

export default function ProductionUnitsPMA() {
  const [modal, setModal] = useState(false);
  const [showAddPUs, setShowAddPUs] = useState(false);
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  const [productionUnits, setProductionUnits] = useState([]);
  const handleShowAddPUs = () => {
    event.preventDefault();
    setShowAddPUs(!showAddPUs);
    setModal(!modal);
  };

  function updateProductionUnits() {
    axios
      .get(
        "https://yourlocalshop.pt:3000/api/v1/users/" +
          myUserVariable.user_id +
          "/productionUnits",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        setProductionUnits(response.data.productionUnits);
      });
  }

  useEffect(() => {
    updateProductionUnits();
  }, []);

  function handleToast() {
    toast.success("Production Unit added successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  }

  return (
    <div className='containerProductionUnitsPMA'>
      <ToastContainer />
      <div className='containerProductionUnitsPMAYourProductionUnits'>
        <div className='productionUnitsPMAYourProductionUnitsTitle'>
          Your Production Units{" "}
          <button
            className='productionUnitsPMAAddProductionUnits'
            onClick={handleShowAddPUs}
          >
            ADD
          </button>
        </div>
        <hr className='productionUnitsPMAYourProductionUnitsTitleHR' />
        <div className='containerProductionUnitsPMAYourProductionUnitsProductionUnits'>
          {productionUnits &&
            productionUnits.map((productionUnit) => (
              <ProductionUnitsPMACard
                key={productionUnit.id}
                productionUnit={productionUnit}
              />
            ))}
          {/* Falta renderizar as unidades de produção */}
        </div>
      </div>
      {modal && <div className='modalPMA'></div>}
      {showAddPUs && (
        <div className='AddPUs'>
          <AddProductionUnits
            handleShowAddPUs={handleShowAddPUs}
            updateProductionUnits={updateProductionUnits}
            handleToast={handleToast}
          />
        </div>
      )}
    </div>
  );
}
