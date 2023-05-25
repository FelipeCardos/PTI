import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./Cartline.css";

export default function Cartline({ cartline }) {
  console.log(cartline);
  return (
    <div className='containerCartline'>
      <div className='containerCartlineImage'>
        <div
          className='containerCartlineProductImage'
          style={{
            backgroundImage: `url(${
              cartline.productImage ||
              "https://images.freeimages.com/images/large-previews/218/my-dog-cutter-1499799.jpg"
            })`,
          }}
        ></div>
      </div>
      <div className='containerCartlineProductInfo'>
        <div className='containerCartlineProductName'>
          {cartline.productName}
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
          Sold by:{" "}
          <a href={`/producer/${cartline.producerId}`}>
            {cartline.producerName}
          </a>
        </div>
      </div>
      <div className='containerCartlineActions'>
        <button className='containerCartlineRemoveProduct'>REMOVE</button>
        <div className='containerCartlineControlAmount'>
          <div className='containerCartlineSubtractAmount'>
            <i className='fa fa-minus'></i>
          </div>
          <div className='containerCartlineAmount'>{cartline.amount}</div>
          <div className='containerCartlineAddAmount'>
            <i className='fa fa-plus'></i>
          </div>
        </div>
      </div>
    </div>
  );
}
