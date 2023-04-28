import React from "react";
import "./ProductsPMA.css";

export default function ProductsPMA() {
  return (
    <div className='containerProductsPMA'>
      <div className='containerProductsPMADashboard'>
        <div className='productsPMADashboardTitle'>Dashboard</div>
        <hr className='productsPMADashboardTitleHR' />
        <div className='containerProductsPMADashboardCharts'>
          {/* Falta renderizar os gráficos */}
        </div>
      </div>
      <div className='containerProductsPMAYourProducts'>
        <div className='productsPMAYourProductsTitle'>
          Your Products
          <button className='productsPMAAddProducts'>ADD</button>
        </div>
        <hr className='productsPMAYourProductsTitleHR' />
        <div className='containerProductsPMAYourProductsProducts'>
          {/* Falta renderizar os produtos */}
        </div>
      </div>
    </div>
  );
}
