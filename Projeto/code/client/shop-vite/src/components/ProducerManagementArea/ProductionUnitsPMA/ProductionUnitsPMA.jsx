import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
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
      .then((response) => {
        setProductionUnits(response.data.productionUnits);
      });
  }, []);
  return (
    <div className='containerProductionUnitsPMA'>
      <div className='containerProductionUnitsPMADashboard'>
        <div className='productionUnitsPMADashboardTitle'>Dashboard</div>
        <hr className='productionUnitsPMADashboardTitleHR' />
        <div className='containerProductionUnitsPMADashboardCharts'>
          {/* Falta renderizar os gráficos */}
        </div>
      </div>
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
          <AddProductionUnits handleShowAddPUs={handleShowAddPUs} />
        </div>
      )}
    </div>
  );
}
