import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import "../../../OrdersAO.css";

export default function OrdersAOModalItemListItem(props) {
  async function cancelOrder() {
    await axios.put(
      "http://localhost:3000/api/v1/carts/" +
        props.cart_line.cart_id +
        "/cartLines",
      {
        productId: props.cart_line.product_id,
        status: "CANCELLED",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      }
    );
    props.handleToast("Order cancelled successfully!");
    props.toggleViewDetailsModal(props.cart_line.cart_id);
  }

  return (
    <div className='containerOrdersAOViewDetailsModalListItem'>
      <div className='containerOrdersAOViewDetailsModalListItemProduct'>
        Product: {props.cart_line.product.name}
      </div>
      <div className='containerOrdersAOViewDetailsModalListItemProductQuantity'>
        Quantity: {props.cart_line.amount}
      </div>
      <div className='containerOrdersAOViewDetailsModalListItemProductPrice'>
        Price:{" "}
        {props.cart_line.product.price
          .toString()
          .padStart(3, "0")
          .slice(
            0,
            props.cart_line.product.price.toString().padStart(3, "0").length - 2
          ) +
          "," +
          props.cart_line.product.price
            .toString()
            .slice(
              props.cart_line.product.price.toString().length - 2,
              props.cart_line.product.price.toString().length
            ) +
          "€"}
      </div>
      <div className='containerOrdersAOViewDetailsModalListItemProducer'>
        Producer: {props.cart_line.product.producer.name}
      </div>
      <div className='containerOrdersAOViewDetailsModalListItemButtonCancel'>
        <button
          className='ordersAOViewDetailsModalListItemButtonCancel'
          onClick={() => cancelOrder()}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}
