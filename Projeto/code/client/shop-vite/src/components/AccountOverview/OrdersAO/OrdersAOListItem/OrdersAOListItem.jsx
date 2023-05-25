import { React, useContext, useEffect, useState } from "react";
import "../OrdersAO.css";
import OrdersAOModalItem from "./OrdersAOModalItem/OrdersAOModalItem";

export default function OrdersAOListItem(props) {
  return (
    <>
      <div className='containerOrdersAOListItem'>
        <div className='containerOrdersAOListItemOrderID'>
          OrderID: {props.order_id}
        </div>
        <div className='containerOrdersAOListItemDate'>
          Date: {props.order_date}
        </div>
        <div className='containerOrdersAOListItemPrice'>
          Price:{" "}
          {props.order_price
            .toString()
            .padStart(3, "0")
            .slice(
              0,
              props.order_price.toString().padStart(3, "0").length - 2
            ) +
            "," +
            props.order_price
              .toString()
              .slice(
                props.order_price.toString().length - 2,
                props.order_price.toString().length
              ) +
            "€"}
        </div>
        <div className='containerOrdersAOListItemStatus'>
          Status: {props.order_status}
        </div>
        <div className='containerOrdersAOListItemButton'>
          <button
            className='ordersAOViewDetails'
            onClick={() => props.toggleViewDetailsModal(props.order_id)}
          >
            View Details
          </button>
        </div>
      </div>
      {props.isViewDetailsModalItemVisible && (
        <OrdersAOModalItem
          key={props.order_id}
          order_id={props.order_id}
          toggleViewDetailsModal={props.toggleViewDetailsModal}
          order_status={props.order_status}
          order_cart_lines={props.order_cart_lines}
        />
      )}
    </>
  );
}
