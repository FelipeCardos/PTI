import { React, useState } from "react";
import AddProductionUnits from "./AddProductionUnits/AddProductionUnits";
import "./ProductionUnitsPMA.css";

export default function ProductionUnitsPMA() {
  const [modal, setModal] = useState(false);
  const [showAddPUs, setShowAddPUs] = useState(false);
  const handleShowAddPUs = () => {
    event.preventDefault();
    setShowAddPUs(!showAddPUs);
    setModal(!modal);
    console.log("handleShowAddPUs");
  };
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
