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
    props.setCheckApi(true);
  }

  return (
    <div className='containerOrdersAOViewDetailsModalListItem'>
      <div className='containerOrdersAOViewDetailsModalListItemProduct'>
        <strong>Product:</strong> {props.cart_line.product.name}
      </div>
      <div className='containerOrdersAOViewDetailsModalListItemProductQuantity'>
        <strong>Quantity:</strong> {props.cart_line.amount}
      </div>
      <div className='containerOrdersAOViewDetailsModalListItemProductPrice'>
        <strong>Price: </strong>
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
        <strong>Producer: </strong>
        {props.cart_line.product.producer.name}
      </div>
      <div className='containerOrdersAOViewDetailsModalListItemStatus'>
        <strong>Status: </strong>
        {props.cart_line.status}
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
