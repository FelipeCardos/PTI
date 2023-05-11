import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../assets/UserContext";
import "./OrdersAO.css";
import OrdersAOListItem from "./OrdersAOListItem/OrdersAOListItem";

export default function OrdersAO(props) {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [orders, setOrders] = useState([]);
  function toggleViewDetailsModal() {
    props.toggleModal();
    setViewDetailsModal(!viewDetailsModal);
    // Refresh div containerOrdersAOViewDetailsModal with the proper data
  }

  useEffect(() => {
    // GET REQUEST TO GET ALL ORDERS FROM THE USER
    axios
      .get("http://localhost:3000/api/v1/users/" + myUserVariable.id + "/carts")
      .then((response) => {
        setOrders(response.data);
      });
  }, []);
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
        {orders.map((order) => (
          <OrdersAOListItem
            toggleViewDetailsModal={toggleViewDetailsModal}
            order_id={order.id}
            order_date={order.order_date}
            order_price={order.price}
            order_status={order.status}
          />
        ))}
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
            <button className='containerOrdersAOViewDetailsModalExportJSON'>
              Export to JSON
            </button>
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
