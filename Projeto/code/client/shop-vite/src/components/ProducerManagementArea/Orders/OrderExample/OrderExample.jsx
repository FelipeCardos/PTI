import axios from "axios";
import { useEffect, useState } from "react";
import "./OrderExample.css";

export default function OrderExample({ order }) {
  console.log(order);
  function handleNotificationClick() {}

  return (
    <div className='orderExample' onClick={handleNotificationClick}>
      <div className='orderExampleCartId'>Order ID: {order.cart_id}</div>
      <div></div>
    </div>
  );
}
