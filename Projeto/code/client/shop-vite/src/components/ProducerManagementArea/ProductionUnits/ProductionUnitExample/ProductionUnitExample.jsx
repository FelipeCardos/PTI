import React from "react";
import "./ProductionUnitExample.css";

export default function ProductionUnitExample(props) {
  return (
    <div className='productionUnitExample'>
      <div className='productionUnitExample__address'>
        Address: {props.address}
      </div>
      <div className='productionUnitExample__capacity'>
        Capacity: {props.capacity}
      </div>
    </div>
  );
}
