import { React, useContext, useEffect, useState } from "react";
import "../OrdersAO.css";

export default function OrdersAOListItem(props) {
  return (
    <div className='containerOrdersAOListItem'>
      <div className='containerOrdersAOListItemOrderID'>
        OrderID: {props.order_id}
      </div>
      <div className='containerOrdersAOListItemDate'>
        Date: {props.order_date}
      </div>
      <div className='containerOrdersAOListItemPrice'>
        Price: {props.order_price}
      </div>
      <div className='containerOrdersAOListItemStatus'>
        Status: {props.order_status}
      </div>
      <div className='containerOrdersAOListItemButton'>
        <button
          className='ordersAOViewDetails'
          onClick={props.toggleViewDetailsModal}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
