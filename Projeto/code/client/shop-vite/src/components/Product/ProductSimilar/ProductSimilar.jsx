import { React, useEffect, useState } from "react";
import "./ProductSimilar.css";

export default function ProductSimilar(props) {
  return (
    <div
      className='containerProductSimilarProduct'
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className='containerProductSimilarProductTitle'>
        <span className='containerProductSimilarProductTitleTitle'>
          Product Name
        </span>
        <div className='containerProductSimilarProductTitleRating'>
          <span className='fa fa-star checked'></span>
          <span className='fa fa-star checked'></span>
          <span className='fa fa-star checked'></span>
          <span className='fa fa-star'></span>
          <span className='fa fa-star'></span>
        </div>
        <span className='containerProductSimilarProductTitlePrice'>100€</span>
      </div>
    </div>
  );
}
