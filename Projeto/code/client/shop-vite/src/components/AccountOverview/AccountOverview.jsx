import { React, useEffect, useState } from "react";
import "./AccountOverview.css";
import InfoAO from "./InfoAO/InfoAO";
import OrdersAO from "./OrdersAO/OrdersAO";

export default function AccountOverview(props) {
  const [modal, setModal] = useState(false);
  function toggleModal() {
    setModal(!modal);
  }
  return (
    <>
      <div className='containerAccountOverview'>
        <div className='containerAccountOverviewInfo'>
          <InfoAO toggleModal={toggleModal} />
        </div>
        <div className='containerAccountOverviewOrders'>
          <OrdersAO toggleModal={toggleModal} />
        </div>
      </div>
      {modal && <div className='modalAO'></div>}
    </>
  );
}
