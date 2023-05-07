import { React, useState } from "react";
import AddProducts from "./AddProducts/AddProducts";
import "./ProductsPMA.css";

export default function ProductsPMA() {
  const [modal, setModal] = useState(false);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const handleShowAddProducts = () => {
    event.preventDefault();
    setShowAddProducts(!showAddProducts);
    setModal(!modal);
    console.log("handleShowAddProducts");
  };
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
          <button
            className='productsPMAAddProducts'
            onClick={handleShowAddProducts}
          >
            ADD
          </button>
        </div>
        <hr className='productsPMAYourProductsTitleHR' />
        <div className='containerProductsPMAYourProductsProducts'>
          {/* Falta renderizar os produtos */}
        </div>
      </div>
      {modal && <div className='modalPMA'></div>}
      {showAddProducts && (
        <div className='AddProducts'>
          <AddProducts handleShowAddProducts={handleShowAddProducts} />
        </div>
      )}
    </div>
  );
}
