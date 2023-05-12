import { React, useContext, useEffect, useState } from "react";
import "../../../OrdersAO.css";

export default function OrdersAOModalItemListItem(props) {
  return (
    <div className='containerOrdersAOViewDetailsModalListItem'>
      <div className='containerOrdersAOViewDetailsModalListItemProduct'>
        {props.cart_line.product_id}
      </div>
      <div className='containerOrdersAOViewDetailsModalListItemProductQuantity'>
        {props.cart_line.amount}
      </div>
      <div className='containerOrdersAOViewDetailsModalListItemProductPrice'>
        {props.order_status}
      </div>
      <div className='containerOrdersAOViewDetailsModalListItemProducer'>
        {props.order_status}
      </div>
    </div>
  );
}
