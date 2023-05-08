import { React, useEffect, useState } from "react";
import "./OrdersAO.css";

export default function OrdersAO(props) {
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  function toggleViewDetailsModal() {
    props.toggleModal();
    setViewDetailsModal(!viewDetailsModal);
    // Refresh div containerOrdersAOViewDetailsModal with the proper data
  }
  return (
    <>
      <div className='containerOrdersAOHeader'>
        <div className='containerOrdersAOHeaderTitle'>Orders</div>
        <div className='containerOrdersAOHeaderButtons'>
          <button className='containerOrdersAOHeaderLocalImpactReport'>
            View Local Impact Report
          </button>
          <button className='containerOrdersAOHeaderExportJSON'>
            Export to JSON
          </button>
        </div>
      </div>
      <hr className='containerOrdersAOHr' />
      <div className='containerOrdersAOList'>
        <div className='containerOrdersAOListItem'>
          <div className='containerOrdersAOListItemOrderID'>
            OrderID: 123456789
          </div>
          <div className='containerOrdersAOListItemDate'>Date: 01/01/2021</div>
          <div className='containerOrdersAOListItemPrice'>Price: 1000€</div>
          <div className='containerOrdersAOListItemStatus'>
            Status: Delivered
          </div>
          <div className='containerOrdersAOListItemButton'>
            <button
              className='ordersAOViewDetails'
              onClick={toggleViewDetailsModal}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      {viewDetailsModal && (
        <div className='containerOrdersAOViewDetailsModal'>
          <div className='containerOrdersAOViewDetailsModalCloseButton'>
            <button onClick={toggleViewDetailsModal}>
              <i className='fa fa-times'></i>
            </button>
          </div>
          <div className='containerOrdersAOViewDetailsModalTitle'>
            Order Details
          </div>
          <hr className='containerOrdersAOViewDetailsModalHr' />
          <div className='containerOrdersAOViewDetailsModalList'>
            <div className='containerOrdersAOViewDetailsModalListItem'>
              <div className='containerOrdersAOViewDetailsModalListItemProduct'>
                Product: Product 1
              </div>
              <div className='containerOrdersAOViewDetailsModalListItemProductQuantity'>
                Quantity: 1
              </div>
              <div className='containerOrdersAOViewDetailsModalListItemProductPrice'>
                Price: 1000€
              </div>
              <div className='containerOrdersAOViewDetailsModalListItemProducer'>
                Producer: Producer 1
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
