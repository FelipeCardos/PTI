import { React, useContext, useEffect, useState } from "react";
import "../../OrdersAO.css";
import OrdersAOModalItemListItem from "./OrdersAOModalItemListItem/OrdersAOModalItemListItem";

export default function OrdersAOModalItem(props) {
  function downloadObjectAsJson(exportObj, exportName) {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  return (
    <div className='containerOrdersAOViewDetailsModal'>
      <div className='containerOrdersAOViewDetailsModalCloseButton'>
        <button onClick={() => props.toggleViewDetailsModal(props.order_id)}>
          <i className='fa fa-times'></i>
        </button>
      </div>
      <div className='containerOrdersAOViewDetailsModalTitle'>
        Order Details
        <button
          className='containerOrdersAOViewDetailsModalExportJSON'
          onClick={() =>
            downloadObjectAsJson(
              props.order_cart_lines,
              "order_" + props.order_id + "_" + Date.now()
            )
          }
        >
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
            handleToast={props.handleToast}
          />
        ))}
      </div>
    </div>
  );
}
