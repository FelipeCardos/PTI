import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./Cartline.css";

export default function Cartline({ cartline }) {
  console.log(cartline);
  return (
    <div className='containerCartline'>
      <div className='containerCartlineProductName'>{cartline.productName}</div>
      <div className='containerCartlineProductImage'>
        {cartline.productImage}
      </div>
      <div className='containerCartlineProductDescription'>
        {cartline.productDescription}
      </div>
      <div className='containerCartlineProductPrice'>
        {cartline.productPrice
          .toString()
          .padStart(3, "0")
          .slice(
            0,
            cartline.productPrice.toString().padStart(3, "0").length - 2
          ) +
          "," +
          cartline.productPrice
            .toString()
            .slice(cartline.productPrice.toString().length - 2) +
          "€"}
      </div>
      <div className='containerCartlineProducerName'>
        {cartline.producerName}
      </div>
      <div className='containerCartlineAmount'>{cartline.amount}</div>
    </div>
  );
}
