import { React, useEffect, useState } from "react";
import "./ProductSimilar.css";

export default function ProductSimilar(props) {
  const product = getProduct();
  function getProduct(){
    let product = props.product;
    return product;
  };

  return (
    <div
      className='containerProductSimilarProduct'
      style={{
        backgroundImage: `url(${product.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className='containerProductSimilarProductTitle'>
        <span className='containerProductSimilarProductTitleTitle'>
          {product.name}
        </span>
        <div className='containerProductSimilarProductTitleRating'>
          <span className='fa fa-star checked'></span>
          <span className='fa fa-star checked'></span>
          <span className='fa fa-star checked'></span>
          <span className='fa fa-star'></span>
          <span className='fa fa-star'></span>
        </div>
        <span className='containerProductSimilarProductTitlePrice'>{product.price}€</span>
      </div>
    </div>
  );
}
