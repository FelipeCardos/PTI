import { React, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationOrder from "./NotificationOrder/NotificationOrder";
import Orders from "./Orders/Orders";
import "./ProducerManagementArea.css";
import ProductionUnits from "./ProductionUnits/ProductionUnits";
import Products from "./Products/Products";
import Vehicles from "./Vehicles/Vehicles";

export default function ProducerManagementArea() {
  const [modal, setModal] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [order, setOrder] = useState({});

  function handleShowOrder(order) {
    setOrder(order);
    setShowOrder(!showOrder);
    setModal(!modal);
  }

  function handleToast(message) {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
    });
  }

  return (
    <div className='containerProducerManagementArea'>
      <div className='containerOrdersProducerManagementArea'>
        <Orders
          handleShowOrder={handleShowOrder}
          showOrder={showOrder}
          handleToast={handleToast}
        />
      </div>
      <div className='containerProductsProducerManagementArea'>
        <Products />
      </div>
      <div className='containerProductionUnitsProducerManagementArea'>
        <ProductionUnits />
      </div>
      <div className='containerVehiclesProducerManagementArea'>
        <Vehicles />
      </div>
      {modal && <div className='modalProducerManagementArea'></div>}
      {showOrder && (
        <NotificationOrder
          order={order}
          handleShowOrder={handleShowOrder}
          handleToast={handleToast}
        />
      )}
      <ToastContainer />
    </div>
  );
}
