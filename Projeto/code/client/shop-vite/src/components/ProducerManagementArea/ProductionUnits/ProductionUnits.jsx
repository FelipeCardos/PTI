import React from "react";
import ProductionUnitExample from "./ProductionUnitExample/ProductionUnitExample";
import "./ProductionUnits.css";

export default function ProductionUnits() {
  let productionUnits = [
    {
      id: 1,
      address: "Rua 1",
      capacity: "20/100",
    },
    {
      id: 2,
      address: "Rua 2",
      capacity: "30/100",
    },
  ];
  return (
    <>
      <div className='productionUnitsTitle'>Production Units</div>
      <hr className='productionUnitsTitleHR' />
      <div className='containerProductionUnitsExamples'>
        {productionUnits.map((productionUnit) => (
          <ProductionUnitExample
            key={productionUnit.id}
            address={productionUnit.address}
            capacity={productionUnit.capacity}
          />
        ))}
      </div>
      <div className='containerProductionUnitsButtons'>
        <button className='addProductionUnitButton'>ADD</button>
        <button className='viewAllProductionUnitsButton'>View All</button>
      </div>
    </>
  );
}
