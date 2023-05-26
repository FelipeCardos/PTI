import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./Cartline.css";

export default function Cartline({ cartline, setCheckApi }) {
  const [selectDisabled, setSelectDisabled] = useState(false);
  const disabledStyles = {
    opacity: "0.5",
    pointerEvents: "none",
    userSelect: "none",
    cursor: "not-allowed",
  };
  function handleControlAmount(operation) {
    setSelectDisabled(true);
    async function updateCartLineAmount() {
      const response = await axios.put(
        "http://localhost:3000/api/v1/carts/" + cartline.cartId + "/cartLines",
        {
          productId: cartline.productId,
          amount: operation === "+" ? cartline.amount + 1 : cartline.amount - 1,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      return response.data;
    }
    updateCartLineAmount()
      .then(() => {
        setCheckApi(true);
      })
      .then(() => {
        setSelectDisabled(false);
      });
  }
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
          <a href={`product/${cartline.productId}`}>{cartline.productName}</a>
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
        <div
          className='containerCartlineControlAmount'
          style={selectDisabled ? disabledStyles : {}}
        >
          <div
            className='containerCartlineSubtractAmount'
            onClick={() => {
              handleControlAmount("-");
            }}
          >
            <i className='fa fa-minus'></i>
          </div>
          <div className='containerCartlineAmount'>{cartline.amount}</div>
          <div
            className='containerCartlineAddAmount'
            onClick={() => {
              handleControlAmount("+");
            }}
          >
            <i className='fa fa-plus'></i>
          </div>
        </div>
      </div>
    </div>
  );
}
