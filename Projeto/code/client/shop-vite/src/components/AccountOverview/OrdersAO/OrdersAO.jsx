import { React, useEffect, useState } from "react";
import "./OrdersAO.css";

export default function OrdersAO(props) {
  return (
    <div className='containerOrdersAOHeader'>
      <div className='containerOrdersAOHeaderTitle'>Orders</div>
      <div className='containerOrdersAOHeaderButtons'>
        <button className='containerOrdersAOHeaderLocalImpactReport'>
          View Local Impact Report
        </button>
        <button className='containerOrdersAOHeaderExportJSON'>
          Export to JSON
        </button>
      </div>
    </div>
  );
}
