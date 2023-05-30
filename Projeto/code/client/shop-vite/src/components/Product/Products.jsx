import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductSimilar from "./ProductSimilar/ProductSimilar";
import './Products.css';
import axios from "axios";

export default function Products() {
  let location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get('category');
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    loadProductsList();
  }, []);

  function loadProductsList() {
    axios.get("http://localhost:3000/api/v1/categories/" + categoryId + "/products")
      .then((response) => {
        setProductsList(response.data);            
      });
  }

  return (
    <div className="container-products">
      {productsList.map((product) => (
        <div key={product}>
          <ProductSimilar product={product}/>
        </div>
      ))}
    </div>
  );
}
