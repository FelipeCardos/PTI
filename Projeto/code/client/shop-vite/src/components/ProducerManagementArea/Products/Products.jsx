import React from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

export default function Products() {
  let navigate = useNavigate();
  return (
    <>
      <div className='producsTitleProducerManagementArea'>Products</div>
      <hr className='producsTitleProducerManagementAreaHR' />
      <div className='containerProductsChartsProducerManagementArea'></div>
      <button
        className='viewAllProductsButtonProducerManagementArea'
        onClick={() => {
          return navigate("/management-area/products");
        }}
      >
        View All
      </button>
    </>
  );
}
