import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../assets/UserContext";
import "./ProductsPMACard.css";

export default function ProductsPMACard({ product }) {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  return (
    <div className='productsPMACard__product'>
      <div className='productsPMACard__product__name'>Name: {product.name}</div>
      <div className='productsPMACard__product__price'>
        Price:{" "}
        {product.price
          .toString()
          .padStart(3, "0")
          .slice(0, product.price.toString().padStart(3, "0").length - 2) +
          "," +
          product.price
            .toString()
            .slice(
              product.price.toString().length - 2,
              product.price.toString().length
            ) +
          "€"}
      </div>
      <div className='productPMACard__product_stock'>
        Stock: {product.stock} units
      </div>
    </div>
  );
}
