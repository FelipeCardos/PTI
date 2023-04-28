import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductionUnits.css";

export default function ProductionUnits() {
  let navigate = useNavigate();
  return (
    <>
      <div className='productionUnitsTitleProducerManagementArea'>
        Production Units
      </div>
      <hr className='productionUnitsTitleHRProducerManagementArea' />
      <div className='containerProductionUnitsChartsProducerManagementArea'></div>
      <button
        className='viewAllProductionUnitsButtonProducerManagementArea'
        onClick={() => {
          navigate("/management-area/production-units");
        }}
      >
        View All
      </button>
    </>
  );
}
