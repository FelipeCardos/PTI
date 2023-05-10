import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../../assets/UserContext";
import "./AccountOverview.css";
import InfoAO from "./InfoAO/InfoAO";
import OrdersAO from "./OrdersAO/OrdersAO";

export default function AccountOverview(props) {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
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
