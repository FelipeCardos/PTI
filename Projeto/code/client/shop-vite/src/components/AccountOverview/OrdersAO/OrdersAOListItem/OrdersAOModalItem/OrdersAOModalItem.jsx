import { React, useContext, useEffect, useState } from "react";
import "../../OrdersAO.css";

export default function OrdersAOModalItem(props) {
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
      </div>
    </div>
  );
}
