import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../assets/UserContext";
import "./OrdersAO.css";
import OrdersAOListItem from "./OrdersAOListItem/OrdersAOListItem";

export default function OrdersAO(props) {
  const { myUserVariable, setMyUserVariable } = useContext(UserContext);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [viewDetailsModalItems, setViewDetailsModalItems] = useState({});
  const [orders, setOrders] = useState([]);

  function toggleViewDetailsModal(id) {
    props.toggleModal();
    setViewDetailsModal(!viewDetailsModal);
    setViewDetailsModalItems({
      ...viewDetailsModalItems,
      [id]: !viewDetailsModalItems[id],
    });
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
            key={order.id}
            viewDetailsModal={viewDetailsModal}
            toggleViewDetailsModal={toggleViewDetailsModal}
            order_id={order.id}
            order_date={order.order_date}
            order_price={order.price}
            order_status={order.status}
            isViewDetailsModalItemVisible={viewDetailsModalItems[order.id]}
            order_cart_lines={order.cart_lines}
          />
        ))}
      </div>
    </>
  );
}
