import { React, useState } from "react";
import NotificationOrder from "./NotificationOrder/NotificationOrder";
import Notifications from "./Notifications/Notifications";
import "./ProducerManagementArea.css";
import ProductionUnits from "./ProductionUnits/ProductionUnits";
import Products from "./Products/Products";
import Vehicles from "./Vehicles/Vehicles";

export default function ProducerManagementArea() {
  const [modal, setModal] = useState(false);
  const [showNotificationOrder, setShowNotificationOrder] = useState(false);
  const [order, setOrder] = useState({});

  function handleShowNotificationOrder() {
    setShowNotificationOrder(!showNotificationOrder);
    setModal(!modal);
  }

  function handleClickInNotificationOrder(
    cart_id,
    product_id,
    production_unit_id
  ) {
    handleShowNotificationOrder();
    setOrder({ cart_id, product_id, production_unit_id });
  }

  window.handleClickInNotificationOrder = handleClickInNotificationOrder;

  return (
    <div className='containerProducerManagementArea'>
      <div className='containerNotificationsProducerManagementArea'>
        <Notifications />
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
      {showNotificationOrder && (
        <NotificationOrder
          order={order}
          handleShowNotificationOrder={handleShowNotificationOrder}
        />
      )}
    </div>
  );
}
