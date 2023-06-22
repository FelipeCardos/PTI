import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../assets/UserContext";
import "./ProductsPMACard.css";

export default function ProductsPMACard({ product, setCheckApi, handleToast }) {
  const { myUserVariable } = useContext(UserContext);

  async function handleDeleteProduct() {
    await axios.delete(
      `http://yourlocalshop.pt:3000/api/v1/users/${myUserVariable.user_id}/products/${product.id}`
    );
    handleToast("Product deleted successfully!");
    setCheckApi(true);
  }

  return (
    <div
      className='productsPMACard__product'
      style={{
        background: `url(${
          product.image || `https://i.imgur.com/1TYeM7X.png`
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className='productsPMACard__product__info'>
        <div className='productsPMACard__product__name'>
          Name: {product.name}
        </div>
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
        <div className='productsPMACard__product__edit'>
          <i className='fas fa-edit'></i>
        </div>
        <div
          className='productPMACard__product__remove'
          onClick={handleDeleteProduct}
        >
          <i className='fas fa-trash-alt'></i>
        </div>
      </div>
    </div>
  );
}
