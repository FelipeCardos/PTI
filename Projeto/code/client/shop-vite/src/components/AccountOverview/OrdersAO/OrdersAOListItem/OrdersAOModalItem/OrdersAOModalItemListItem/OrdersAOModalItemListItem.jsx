import { React, useContext, useEffect, useState } from "react";
import "../../../OrdersAO.css";

export default function OrdersAOModalItemListItem(props) {
  return (
    <div className='containerOrdersAOViewDetailsModalListItem'>
      <div className='containerOrdersAOViewDetailsModalListItemProduct'>
        {props.order_status}
      </div>
      <div className='containerOrdersAOViewDetailsModalListItemProductQuantity'>
        {props.order_status}
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
