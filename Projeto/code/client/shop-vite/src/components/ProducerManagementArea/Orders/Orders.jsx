import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../assets/UserContext";
import OrderExample from "./OrderExample/OrderExample";
import "./Orders.css";

export default function Orders() {
  const { myUserVariable } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      const allowedStatus = [
        "AWAITING_TRANSPORT",
        "TRANSPORT_IMMINENT",
        "IN_TRANSIT",
        "LAST_KM",
      ];
      const productsOfProducer = await axios.get(
        `http://localhost:3000/api/v1/users/${myUserVariable.user_id}/products`
      );
      let productsIds = [];
      for (const product of productsOfProducer.data) {
        productsIds.push(product.id);
      }
      const cartlines = await axios.get(
        "http://localhost:3000/api/v1/cartLines"
      );
      const cartlinesOfProducer = cartlines.data.filter((cartline) => {
        return (
          productsIds.includes(cartline.product_id) &&
          allowedStatus.includes(cartline.status)
        );
      });
      return cartlinesOfProducer;
    }

    async function fetchData() {
      const orders = await getOrders();
      setOrders(orders);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className='ordersTitle'>Orders</div>
      <hr className='ordersTitleHR' />
      <div className='containerOrdersExamples'>
        {orders.map((order) => (
          <OrderExample key={order.cart_id} order={order} />
        ))}
      </div>
    </>
  );
}
