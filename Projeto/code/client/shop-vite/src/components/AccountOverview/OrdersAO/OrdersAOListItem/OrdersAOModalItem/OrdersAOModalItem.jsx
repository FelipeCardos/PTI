import { React, useContext, useEffect, useState } from "react";
import "../../OrdersAO.css";
import OrdersAOModalItemListItem from "./OrdersAOModalItemListItem/OrdersAOModalItemListItem";

export default function OrdersAOModalItem(props) {
  console.log(props);
  return (
    <div className='containerOrdersAOViewDetailsModal'>
      <div className='containerOrdersAOViewDetailsModalCloseButton'>
        <button onClick={() => props.toggleViewDetailsModal(props.order_id)}>
          <i className='fa fa-times'></i>
        </button>
      </div>
      <div className='containerOrdersAOViewDetailsModalTitle'>
        Order Details
        <button className='containerOrdersAOViewDetailsModalExportJSON'>
          Export to JSON
        </button>
      </div>
      <hr className='containerOrdersAOViewDetailsModalHr' />
      <div className='containerOrdersAOViewDetailsModalList'>
        {props.order_cart_lines.map((cartLine) => (
          <OrdersAOModalItemListItem
            key={(cartLine.cart_id, cartLine.product_id)}
            toggleViewDetailsModal={props.toggleViewDetailsModal}
            cart_line={cartLine}
          />
        ))}
      </div>
    </div>
  );
}
