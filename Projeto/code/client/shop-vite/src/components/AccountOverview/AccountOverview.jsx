import { React, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  function handleToast(message) {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
    });
  }

  return (
    <>
      <div className='containerAccountOverview'>
        <div className='containerAccountOverviewInfo'>
          <InfoAO toggleModal={toggleModal} handleToast={handleToast} />
        </div>
        <div className='containerAccountOverviewOrders'>
          <OrdersAO toggleModal={toggleModal} handleToast={handleToast} />
        </div>
      </div>
      {modal && <div className='modalAO'></div>}
      <ToastContainer />
    </>
  );
}
